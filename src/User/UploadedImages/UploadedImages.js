import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Backdrop from '@material-ui/core/Backdrop';
import { userImages } from '../../TempData/TempData';

import SearchField from '../SearchField/SearchField';
import Images from '../../Utilities/Images';

const useStyles = makeStyles((theme) => ({
    gridList: {
        height: '100%',
        width: '100%'
    },
    backdrop: theme.custom.backdrop
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
    const [labelFilter, setLabelFilter] = useState("");

    const classes = useStyles();

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

    const resetDeletion = () => {
        setImageDeleteRequested(false);
        setImageDeleteResponse(initResponse);
    };

    const imageList = images.filter(image => image.label.startsWith(labelFilter)).map(filteredImage => ({ 
        id: filteredImage.id,
        img: filteredImage.img, 
        displayLabel: `~${filteredImage.label}~`, 
    }));

    return (
        <div>
            <SearchField label="Search by Label" onChange={(e) => setLabelFilter(e.target.value)}/>
            <br />
            <Images imageList={imageList} onImageButtonClick={requestImageDeletion} actionIcon={DeleteIcon}/>
            <Backdrop open={imageDeleteRequested} onClick={() => resetDeletion()} className={classes.backdrop}>
                {imageDeleteResponse.data == null && imageDeleteResponse.error == null ? <CircularProgress color="inherit"/> : null} 
                {imageDeleteResponse.data != null ? <h1>Image Successfully Deleted.</h1> : null}
                {imageDeleteResponse.error != null ? <h1>There was an error in deleting the image. Please try again</h1> : null}
            </Backdrop>
        </div>
    );
}


export default UploadedImages;