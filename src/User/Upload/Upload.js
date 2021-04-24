import { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: theme.palette.common.black
        }
    },
    label: {
        marginBottom: '10px'
    },
    previewContainer: {
        maxWidth: '300px',
        maxHeight: '450px',
    },
    previewImage: {
        maxWidth: '300px',
        maxHeight: '450px',
        marginTop: '10px',
        border: '1px solid black',
        borderRadius: '10px'
    },
    imageCloseButton: {
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: '50%'
    },
    buttonContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
}));



function Upload(){
    const classes = useStyles();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Using effect to revoke object URL after component unmounts, as per https://stackoverflow.com/a/57781164
    useEffect(() => {
        if(!(imageFile instanceof File)){
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);

    }, [imageFile]);


    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <form>
            <TextField className={classes.label} label="Image Label" variant="outlined"/>
            <br />
            {imagePreview != null ?
            <div className={classes.previewContainer}>
                <img src={imagePreview} className={classes.previewImage}/> 
            </div> 
            : 
            null}
            <Button variant="contained" className={classes.button} startIcon={<PhotoCamera />} component="label" key="image-upload-button">
                {imagePreview != null ? "Chnage" : "Select"}
                <input accept="image/*" type="file" onChange={handleImageChange} hidden />
            </Button> 
            <br />

            
        </form>
    );
}

export default Upload;