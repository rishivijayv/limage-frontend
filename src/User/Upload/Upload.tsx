import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import RestoreIcon from '@material-ui/icons/Restore';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Nullable } from '../../GlobalTypes';
import { useUploadImageMutation } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
    uploadForm: {
        textAlign: 'center'
    },
    buttonBox: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: theme.custom.button,
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


function Upload(){
    const classes = useStyles();
    const [imageFile, setImageFile] = useState<Nullable<File>>(null);
    const [imagePreview, setImagePreview] = useState<Nullable<string>>(null);
    const [imageLabel, setImageLabel] = useState("");
    const [labelInvalid, setLabelInvalid] = useState(false);
    const [upload, { data, loading, error }] = useUploadImageMutation();


    // Using effect to revoke object URL after component unmounts, as per https://stackoverflow.com/a/57781164
    useEffect(() => {
        if(!(imageFile instanceof File)){
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);

    }, [imageFile]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target){
            return;
        }
        const image = e.target!.files![0];
        setImageFile(image);
    };


    const submitImageOnCheck = async () => {
        if(imageLabel === ""){
            setLabelInvalid(true);
            return;
        }else if(labelInvalid){
            setLabelInvalid(false);
        }

        await upload({
            variables: {
                image: {
                    file: imageFile,
                    label: imageLabel
                }
            }
        });

    }

    const resetForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setImageLabel("");
        setLabelInvalid(false);
    }


    const responseNotRecieved = !data && !error;

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
            {loading ? <CircularProgress className={classes.progress}/> : null}
            {data?.upload ? <div className={classes.successfulSubmit}>Image Submitted</div> : null}
            {error || (data && !data.upload) ? <div className={classes.errorSubmit}>Something went wrong, please try again.</div> : null}
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