import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import { useUserUploadedImagesQuery } from '../../generated/graphql';
import SearchField from '../../Utilities/SearchField';
import Images from '../../Utilities/Images';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
    gridList: {
        height: '100%',
        width: '100%'
    },
    backdrop: theme.custom.backdrop,
    button: theme.custom.button,
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px'
    }
}));

type Response = {
    data: string | null,
    error: string | null
}

const initResponse: Response = {
    data: null,
    error: null
}


function UploadedImages(){
    const [imageDeleteRequested, setImageDeleteRequested] = useState(false);
    const [imageDeleteResponse, setImageDeleteResponse] = useState(initResponse);
    const [labelFilter, setLabelFilter] = useState("");
    const { data, error, loading, fetchMore } = useUserUploadedImagesQuery({
        variables: {
            limit: 3,
            cursor: null
        },
        notifyOnNetworkStatusChange: true,
    });
    const classes = useStyles();

    if(error){
        return <h3>Could not retrieve your images. Please try again later.</h3>
    }

    if(loading && !data){
        return <h3>Loading...</h3>
    }

    const requestImageDeletion = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number): Promise<void> => {
        e.preventDefault();
        
    };

    const resetDeletion = () => {
        setImageDeleteRequested(false);
        setImageDeleteResponse(initResponse);
    };


    const imageList = data?.uploadedImages.images.filter(image => image.label.startsWith(labelFilter)).map(filteredImage => ({ 
        id: filteredImage.id,
        img: filteredImage.location, 
        displayLabel: `~${filteredImage.label}~`, 
    }));

    const fetchMoreImages = async () => {

        fetchMore({
            variables: {
                limit: 3,
                cursor: data?.uploadedImages.images[data.uploadedImages.images.length - 1].createdAt
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if(!fetchMoreResult) return prev;

                fetchMoreResult.uploadedImages.images = [
                    ...prev.uploadedImages.images,
                    ...fetchMoreResult.uploadedImages.images
                ];

                return fetchMoreResult
            }
        })
        
    };

    return (
        <div>
            <SearchField label="Search by Label" onChange={(e) => setLabelFilter(e.target.value)}/>
            <br />
            <Images imageList={imageList!} onImageButtonClick={requestImageDeletion} actionIcon={DeleteIcon}/>
            {data && data.uploadedImages.hasMore ? 
            <div className={classes.loadMoreContainer}>
                <Button variant="contained" className={classes.button} component="label" key="load-more-images-button" onClick={fetchMoreImages}>
                    { loading ? "Loading..." : "Load More" }
                </Button>
            </div>

            :
            null}
            <Backdrop open={imageDeleteRequested} onClick={() => resetDeletion()} className={classes.backdrop}>
                {imageDeleteResponse.data == null && imageDeleteResponse.error == null ? <CircularProgress color="inherit"/> : null} 
                {imageDeleteResponse.data != null ? <h1>Image Successfully Deleted.</h1> : null}
                {imageDeleteResponse.error != null ? <h1>There was an error in deleting the image. Please try again</h1> : null}
            </Backdrop>
        </div>
    );
}


export default UploadedImages;