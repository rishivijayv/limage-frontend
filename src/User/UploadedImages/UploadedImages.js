import { makeStyles, fade } from '@material-ui/core/styles';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { userUploadedImages } from '../../TempData/TempData';
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
    }
    
}));

function UploadedImages(){
    const [images, setImages] = useState(userUploadedImages);

    const classes = useStyles();

    const filterImages = (label) => {
        setImages(userUploadedImages.filter(image => image.label.startsWith(label)));
    };

    const deleteImage = (e, index) => {
        e.preventDefault();
        userUploadedImages.splice(index, 1);
        
        // Use shallow copy of array so React renders element again
        setImages(userUploadedImages.slice());
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
                                <CardActionArea>
                                    <CardMedia 
                                        className={classes.image}
                                        image={image.img}
                                    />
                                </CardActionArea>
                                <CardActions className={classes.imageActions}>
                                    <b>~{image.label}~</b>
                                    <IconButton className={classes.imageActionButton} color="inherit" onClick={(e, index) => deleteImage(e, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}


export default UploadedImages;