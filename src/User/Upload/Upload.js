import { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    uploadForm: {
        textAlign: 'center'
    },
    buttonBox: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: theme.palette.common.black
        },
        marginRight: '10px'
    },
    label: {
        marginBottom: '10px'
    },
    previewContainer: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px'
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
    const [imageLabel, setImageLabel] = useState("");
    const [labelInvalid, setLabelInvalid] = useState(false);

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

    const submitImageOnCheck = () => {
        if(imageLabel === ""){
            setLabelInvalid(true);
        }else if(labelInvalid){
            setLabelInvalid(false);
        }
    }

    return (
        <form className={classes.uploadForm}>
            <TextField error={labelInvalid} 
                    className={classes.label} 
                    label="Image Label" 
                    variant="outlined" 
                    value={imageLabel} 
                    helperText={labelInvalid ? "A label is mandatory for an image" : ""}
                    onChange={(e) => setImageLabel(e.target.value)}/>
            <br />
            {imagePreview != null ?
            <div className={classes.previewContainer}>
                <img src={imagePreview} className={classes.previewImage}/> 
            </div> 
            : 
            null}
            <Box>
                <Button variant="contained" className={classes.button} startIcon={<PhotoCamera />} component="label" key="image-upload-button">
                    {imagePreview != null ? "Change" : "Select"}
                    <input accept="image/*" type="file" onChange={handleImageChange} hidden />
                </Button> 
                {imagePreview != null ? 
                <Button variant="contained" className={classes.button} startIcon={<PublishIcon />} component="label" key="image-submit-button" onClick={submitImageOnCheck}>
                    Submit
                </Button>
                :
                null}
            </Box>

            <br />

            
        </form>
    );
}

export default Upload;