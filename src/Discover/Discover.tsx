import { useHistory } from 'react-router';
import { useState } from 'react';
import Images from '../Utilities/Images';
import Heading from '../Utilities/Heading';
import TextField from '@material-ui/core/TextField';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Navigation from '../Navigation/Navigation';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Image } from '../GlobalTypes';
import { useDiscoverImagesLazyQuery, useMeQuery, useSaveImageMutation, SaveImageResponse, LabelsForUserDocument } from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
    discoverRoot: {
        textAlign: 'center',
        margin: '40px'
    },
    actionArea: {
        marginTop: '15px'
    },
    button: {
        ...theme.custom.button,
        marginLeft: '10px'
    },    
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px'
    },
    backdrop: theme.custom.backdrop

}));

const initSaveImageResponse: SaveImageResponse = {
    saveSuccessful: false,
    descrtiption: ""
}

function Discover(){
    const classes = useStyles();
    const [labelToDiscover, setLabelToDiscover] = useState("");
    const [oneSearchSubmitted, setOneSearchSubmitted] = useState(false);
    const [getPlatformImages, { loading, error, data, fetchMore }] = useDiscoverImagesLazyQuery();
    const { loading: meQueryLoading, data: meQueryData } = useMeQuery();
    const [saveImageResponse, setSaveImageResponse] = useState<SaveImageResponse>(initSaveImageResponse);
    const [saveImage, { loading: saveImageLoading }] = useSaveImageMutation({
        onError: (_) => {
            setSaveImageResponse({ saveSuccessful: false, descrtiption: "Something went wrong. Please try again later." });
        },
        onCompleted: (data) => {
            setSaveImageResponse({ saveSuccessful: data.saveImage.saveSuccessful, descrtiption: data.saveImage.descrtiption });
        }
    });
    const [backdrop, setBackdrop] = useState(false);
    const history = useHistory();


    let userLoggedIn = false;

    if(meQueryLoading){
        return <></>
    }else if(meQueryData && meQueryData.me){
        userLoggedIn = true;
    }

    let imageList: Image[] = [];
    if(data){
        imageList = data.discoverImages.entities.map(image => ({ 
            id: image.id,
            img: image.location, 
            displayLabel: `~${image.label}~`, 
        }));
    }

    const discoverImagesForLabel = async () => {

        getPlatformImages({
            variables: {
                search: labelToDiscover,
                paginatedInput: {
                    limit: 3,
                    cursor: null
                }
            },
        });

        if(!oneSearchSubmitted){
            setOneSearchSubmitted(true);
        }
        
    };

    const saveImageToLabel = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number): Promise<void> => {
        e.preventDefault();
        setBackdrop(true);

        const imageToSave = imageList.find(image => image.id === imageId);

        await saveImage({
            variables: {
                imageInfo: {
                    imageId,
                    labelName: imageToSave!.displayLabel.substring(1, imageToSave!.displayLabel.length - 1)
                }
            },
            refetchQueries: [{
                query: LabelsForUserDocument,
                variables: {
                    paginatedInput: {
                        limit: 3,
                        cursor: null
                    }
                }
            }]
        });
    };

    const redirectToLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        history.push("/");
    }

    
    const fetchMoreImages = async (limit: number, cursor: string | null | undefined) => {

        let nextCursor = cursor;

        if(!nextCursor){
            nextCursor = data?.discoverImages.entities[data.discoverImages.entities.length - 1].createdAt;
        }
        fetchMore!({
            variables: {
                search: labelToDiscover,
                paginatedInput: {
                    limit,
                    cursor: nextCursor
                }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if(!fetchMoreResult) return prev;

                fetchMoreResult.discoverImages.entities = [
                    ...prev.discoverImages.entities,
                    ...fetchMoreResult.discoverImages.entities
                ];

                return fetchMoreResult
            },
        });
    };

    const resetSave = () => {
        setBackdrop(false);
        setSaveImageResponse(initSaveImageResponse);
    }

    return (
        <div>
            <Navigation />
            <div className={classes.discoverRoot}>
                <Heading title="Discover" subtitle="Explore images for a label of your choice"/>
                <div className={classes.actionArea}>
                    <TextField size="small" variant="outlined" label="Search for Labels" onChange={(e) => setLabelToDiscover(e.target.value)}/>
                    <Button variant="contained" 
                            className={classes.button} 
                            startIcon={<KeyboardArrowRightIcon />} 
                            component="label" 
                            key="discover-label-button"
                            onClick={() => discoverImagesForLabel()}>
                        { loading ? "Discovering..." : "Go" }
                    </Button>
                </div>
                <br />
                {error ? <h3>Seems like something went wrong. Please try again later</h3> : null}
                {data && oneSearchSubmitted && imageList?.length === 0 ? <h3>Seems like there are no images for this label</h3> : null}
                {data && imageList.length > 0 ? <Images imageList={imageList!} onImageButtonClick={userLoggedIn ? saveImageToLabel : redirectToLogin} actionIcon={SaveAltIcon}/> : null}
                {data && data.discoverImages.hasMore ? 
                <div className={classes.loadMoreContainer}>
                    <Button variant="contained" className={classes.button} component="label" key="load-more-images-button" onClick={() => fetchMoreImages(3, null)}>
                        { loading ? "Loading..." : "Load More" }
                    </Button>
                </div>
                :
                null}
            <Backdrop open={backdrop} onClick={() => resetSave()} className={classes.backdrop}>
                {saveImageLoading ? <CircularProgress color="inherit"/> : null}
                {!saveImageResponse.saveSuccessful ? <h1>{saveImageResponse.descrtiption}</h1> : null}
                {saveImageResponse.saveSuccessful ? <h1>Image Successfully Saved.</h1> : null}
            </Backdrop>
            </div>

        </div>
    );
}

export default Discover;