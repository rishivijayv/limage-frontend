import { useParams, useHistory } from 'react-router-dom';
import { useState } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSavedImagesQuery, SavedImagesQuery, SavedImagesDocument, useDeleteSavedImageMutation, DeleteLabelImageResponse, LabelsForUserDocument } from '../../generated/graphql';
import { Image } from "../../GlobalTypes";
import { fetchMoreEntities } from "../../Utilities/HelperFunctions";
import DeleteIcon from '@material-ui/icons/Delete';
import Images from "../../Utilities/Images";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: theme.custom.backdrop,
    button: theme.custom.button,
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px'
    }
}));

type RouteParams = {
    labelId: string
}

const initDeleteResponse: DeleteLabelImageResponse = {
    deleteSuccessful: false,
    imagesLeftInLabel: -1
}

function SavedImages(){
    const routeParams = useParams<RouteParams>();
    const labelId = parseInt(routeParams.labelId)
    const { loading, data, error, fetchMore } = useSavedImagesQuery({
        variables: {
            paginatedInput: {
                limit: 3,
                cursor: null
            },
            labelId
        }
    });
    const history = useHistory();
    const [imageDeleteResponse, setImageDeleteResponse] = useState<DeleteLabelImageResponse>(initDeleteResponse)
    const [deleteSavedImage, { loading: imageDeleteLoading }] = useDeleteSavedImageMutation({
        onError: (_) => {
            setImageDeleteResponse(initDeleteResponse);
        },
        onCompleted: (data) => {
            setImageDeleteResponse(data.deleteSavedImage)
        }
    });
    const classes = useStyles();
    const [backdrop, setBackdrop] = useState(false);

    let savedImages: Image[]  = [];

    if(loading && !data){
        return <></>
    }else if(error){
        return <h3>Something went wrong. Please try again later</h3>
    }else if(data){
        savedImages = data.savedImages.entities.map(image => ({
            id: image.id,
            img: image.location,
            displayLabel: `~${image.label}~`
        }));
    }

    const requestImageDeletion = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number): Promise<void> => {
        e.preventDefault();
        setBackdrop(true);

        await deleteSavedImage({
            variables: {
                imageInfo: {
                    imageId,
                    labelId
                }
            },
            update: (cache) => {
                cache.evict({ id: "Image:" + imageId });

                // Fetch the next image. Same cache key used for fetchMore as well
                const lastResults = cache.readQuery<SavedImagesQuery>({
                    query: SavedImagesDocument,
                    variables: {
                        paginatedInput: {
                            limit: 3,
                            cursor: null
                        }
                    }
                });
                if(!lastResults || !lastResults.savedImages.hasMore || lastResults.savedImages.entities.length === 0) return;

                const lastCursor = lastResults.savedImages.entities[lastResults.savedImages.entities.length - 1].createdAt;

                // Fetch the next image
                fetchMoreEntities(fetchMore, "savedImages", data!, 1, lastCursor)
                console.log(lastResults);
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


    const resetDeletion = () => {
        setBackdrop(false);
        if(imageDeleteResponse.imagesLeftInLabel === 0){
            history.push("/profile/labels");
        }
        setImageDeleteResponse(initDeleteResponse);

        
    };

    return (
        <div>
            <Images imageList={savedImages} onImageButtonClick={requestImageDeletion} actionIcon={DeleteIcon}/>
            {data && data.savedImages.hasMore ? 
            <div className={classes.loadMoreContainer}>
                <Button variant="contained" className={classes.button} component="label" key="load-more-images-button" onClick={() => fetchMoreEntities(fetchMore, "savedImages", data, 3, null)}>
                    { loading ? "Loading..." : "Load More" }
                </Button>
            </div>
            :
            null}
            <Backdrop open={backdrop} onClick={() => resetDeletion()} className={classes.backdrop}>
                {imageDeleteLoading ? <CircularProgress color="inherit"/> : null}
                {!imageDeleteResponse.deleteSuccessful ? <h1>There was an issue in deleting this image. Please try again later</h1> : null}
                {imageDeleteResponse.deleteSuccessful ? <h1>Image Successfully Deleted.</h1> : null}
            </Backdrop>
        </div>
    );
}

export default SavedImages;