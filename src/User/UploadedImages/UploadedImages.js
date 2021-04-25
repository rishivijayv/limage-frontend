import { makeStyles, fade } from '@material-ui/core/styles';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import { userImages } from '../../TempData/TempData';
import { CardActions } from '@material-ui/core';

import SearchField from '../SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
    gridList: {
        height: '100%',
        width: '100%'
    },
    image: {
        maxWidth: '100%',
        height: '300px',
    },
    imageCard: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    imageActions: {
        justifyContent: 'space-between',
        '& b':{
            marginLeft: '10px'
        }
    },
    imageActionButton: {
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20)
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.common.white,
    },
    enlargedImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        border: `1px solid ${theme.palette.common.white}`
    }
}));

const initResponse = {
    data: null,
    error: null
};

let userUploadedImages = userImages;

function UploadedImages(){
    const [images, setImages] = useState(userUploadedImages);
    const [imageDeleteRequested, setImageDeleteRequested] = useState(false);
    const [imageDeleteResponse, setImageDeleteResponse] = useState(initResponse);
    const [enlargeImage, setEnlargeImage] = useState(null);

    const classes = useStyles();

    const filterImages = (label) => {
        setImages(userUploadedImages.filter(image => image.label.startsWith(label)));
    };

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const deleteImage = async (imageId) => {
        await timeout(3000);
        return {
            data: `image ${imageId} deleted`,
            error: null
        };
    };

    const requestImageDeletion = async (e, imageId) => {
        e.preventDefault();
        
        setImageDeleteRequested(true);
        const response = await deleteImage(imageId);
        setImageDeleteResponse(response);

        // Use shallow copy of array so React renders element again
        if(response.data != null){
            userUploadedImages = userUploadedImages.filter(image => image.id !== imageId);
            setImages(userUploadedImages.slice());
        }
    };

    const showEnlargedImage = (e, imageSource) => {
        e.preventDefault();
        setEnlargeImage(imageSource);
    };

    const resetDeletion = () => {
        setImageDeleteRequested(false);
        setImageDeleteResponse(initResponse);
    };

    return (
        <div>
            <SearchField label="Search by Label" onChange={(e) => filterImages(e.target.value)}/>
            <br />
            <Grid container spacing={2}>
                {images
                .map((image, index) => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={index}>
                            <Card className={classes.imageCard}>
                                <CardActionArea onClick={(e) => showEnlargedImage(e, image.img)}>
                                    <CardMedia 
                                        className={classes.image}
                                        image={image.img}
                                    />
                                </CardActionArea>
                                <CardActions className={classes.imageActions}>
                                    <b>~{image.label}~</b>
                                    <IconButton className={classes.imageActionButton} color="inherit" onClick={(e) => requestImageDeletion(e, image.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Backdrop open={imageDeleteRequested} onClick={() => resetDeletion()} className={classes.backdrop}>
                {imageDeleteResponse.data == null && imageDeleteResponse.error == null ? <CircularProgress color="inherit"/> : null} 
                {imageDeleteResponse.data != null ? <h1>Image Successfully Deleted.</h1> : null}
                {imageDeleteResponse.error != null ? <h1>There was an error in deleting the image. Please try again</h1> : null}
            </Backdrop>
            <Backdrop open={enlargeImage != null} onClick={() => setEnlargeImage(null)} className={classes.backdrop}>
                <img src={enlargeImage} className={classes.enlargedImage} />
            </Backdrop>
        </div>
    );
}


export default UploadedImages;