import { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import RestoreIcon from '@material-ui/icons/Restore';
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
    },
    progress: {
        color: theme.palette.common.black
    },
    successfulSubmit: {
        fontWeight: 'bold',
        color: theme.custom.success.color
    },
    errorSubmit: {
        fontWeight: 'bold',
        color: theme.custom.error.color
    }
}));

const initResponse = {
    data: null,
    error: null
};

function Upload(){
    const classes = useStyles();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLabel, setImageLabel] = useState("");
    const [labelInvalid, setLabelInvalid] = useState(false);
    const [imageSubmitted, setImageSubmitted] = useState(false);
    const [response, setResponse] = useState(initResponse);


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

    // TODO: Remove when API implemented
    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };
    const uploadUserImage = async () => {
        await timeout(2000);
        return {
            data: 'sample response',
            error: null
        };
    };

    const submitImageOnCheck = async () => {
        if(imageLabel === ""){
            setLabelInvalid(true);
            return;
        }else if(labelInvalid){
            setLabelInvalid(false);
        }

        setImageSubmitted(true);

        const uploadResponse = await uploadUserImage();
        setResponse({
            data: uploadResponse.data,
            error: uploadResponse.error
        });

    }

    const resetForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setImageLabel("");
        setLabelInvalid(false);
        setImageSubmitted(false);
        setResponse(initResponse);
    }


    const waitingResponse = imageSubmitted && (response.data == null) && (response.error == null);
    const successResponse = response.data != null && response.error == null;
    const errorResponse = response.data == null && response.error != null;
    const responseNotRecieved = !successResponse && !errorResponse;

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
            {waitingResponse ? <CircularProgress className={classes.progress}/> : null}
            {successResponse ? <div className={classes.successfulSubmit}>Image Submitted</div> : null}
            {errorResponse ? <div className={classes.errorSubmit}>Something went wrong, please try again.</div> : null}
            {imagePreview != null ? 
            <div className={classes.previewContainer}>
                <img src={imagePreview} className={classes.previewImage}/> 
            </div> 
            : 
            null}
            <Box>
                {responseNotRecieved ? 
                <Button variant="contained" className={classes.button} startIcon={<PhotoCamera />} component="label" key="image-upload-button">
                    {imagePreview != null ? "Change" : "Select"}
                    <input accept="image/*" type="file" onChange={handleImageChange} hidden />
                </Button>
                :
                null}
                {responseNotRecieved && imagePreview != null ? 
                <Button variant="contained" className={classes.button} startIcon={<PublishIcon />} component="label" key="image-submit-button" onClick={submitImageOnCheck}>
                    Submit
                </Button>
                :
                null}
                {!responseNotRecieved ? 
                <Button variant="contained" className={classes.button} startIcon={<RestoreIcon />} component="label" key="image-restore-button" onClick={resetForm}>
                    Submit Another
                </Button>
                :
                null}
            </Box>

            <br />

            
        </form>
    );
}

export default Upload;