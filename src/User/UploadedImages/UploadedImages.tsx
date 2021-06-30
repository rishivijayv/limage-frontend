import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import { 
    useUserUploadedImagesQuery, 
    useDeleteUploadedImageMutation, 
    DeleteUploadedImageMutation,
    UserUploadedImagesDocument,
    UserUploadedImagesQuery } from '../../generated/graphql';
import SearchField from '../../Utilities/SearchField';
import Images from '../../Utilities/Images';
import Button from '@material-ui/core/Button';
import { ApolloError } from '@apollo/client';
import { fetchMoreEntities } from '../../Utilities/HelperFunctions';


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

type ImageDeleteResponse = {
    data: DeleteUploadedImageMutation | null | undefined,
    error: ApolloError | undefined
}

const initImageDeleteResponse: ImageDeleteResponse = {
    data: undefined,
    error: undefined
}


function UploadedImages(){
    const [labelFilter, setLabelFilter] = useState("");
    const { data, error, loading, fetchMore } = useUserUploadedImagesQuery({
        variables: {
            paginatedInput: {
                limit: 3,
                cursor: null
            }
        },
        notifyOnNetworkStatusChange: true,
    });
    const [imageDeleteResponse, setImageDeleteResponse] = useState<ImageDeleteResponse>(initImageDeleteResponse)
    const [deleteImage, { loading: imageDeleteLoading }] = useDeleteUploadedImageMutation({
        onError: (error) => {
            setImageDeleteResponse({ ...imageDeleteResponse, ['error']: error });
        },
        onCompleted: (data) => {
            setImageDeleteResponse({ ...imageDeleteResponse, ['data']: data })
        }
    });
    const [backdrop, setBackdrop] = useState(false);
    const classes = useStyles();

    if(error){
        return <h3>Could not retrieve your images. Please try again later.</h3>
    }

    if(loading && !data){
        return <h3>Loading...</h3>
    }

    const requestImageDeletion = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number): Promise<void> => {
        e.preventDefault();
        setBackdrop(true);

        await deleteImage({
            variables: {
                imageId
            },
            update: (cache) => {
                cache.evict({ id: "Image:" + imageId });

                // Fetch the next image. Same cache key used for fetchMore as well
                const lastResults = cache.readQuery<UserUploadedImagesQuery>({
                    query: UserUploadedImagesDocument,
                    variables: {
                        paginatedInput: {
                            limit: 3,
                            cursor: null
                        }
                    }
                });
                if(!lastResults || !lastResults.uploadedImages.hasMore || lastResults.uploadedImages.entities.length === 0) return;

                const lastCursor = lastResults.uploadedImages.entities[lastResults.uploadedImages.entities.length - 1].createdAt;

                // Fetch the next image
                fetchMoreEntities(fetchMore, 'uploadedImages', data!, 1, lastCursor)
                console.log(lastResults);
            }
        });
        console.log("IMage deleted");
    };

    const resetDeletion = () => {
        setBackdrop(false);
        setImageDeleteResponse(initImageDeleteResponse);
    };


    const imageList = data?.uploadedImages.entities.filter(entity => entity.label.startsWith(labelFilter)).map(filteredImage => ({ 
        id: filteredImage.id,
        img: filteredImage.location, 
        displayLabel: `~${filteredImage.label}~`, 
    }));


    return (
        <div>
            {data && data.uploadedImages.entities.length > 0 ? <SearchField label="Search by Label" onChange={(e) => setLabelFilter(e.target.value)}/>: null}
            <br />
            <Images imageList={imageList!} onImageButtonClick={requestImageDeletion} actionIcon={DeleteIcon}/>
            {data && data.uploadedImages.hasMore ? 
            <div className={classes.loadMoreContainer}>
                <Button variant="contained" className={classes.button} component="label" key="load-more-images-button" onClick={() => fetchMoreEntities(fetchMore, 'uploadedImages', data, 3, null)}>
                    { loading ? "Loading..." : "Load More" }
                </Button>
            </div>

            :
            null}
            <Backdrop open={backdrop} onClick={() => resetDeletion()} className={classes.backdrop}>
                {imageDeleteLoading ? <CircularProgress color="inherit"/> : null}
                {imageDeleteResponse.error || (imageDeleteResponse.data && !imageDeleteResponse.data.deleteUploadedImage) ? <h1>There was an error in deleting the image. Please try again</h1> : null}
                {imageDeleteResponse.data?.deleteUploadedImage ? <h1>Image Successfully Deleted.</h1> : null}
            </Backdrop>
        </div>
    );
}


export default UploadedImages;