import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    backdrop: theme.custom.backdrop,
    enlargedImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        border: `1px solid ${theme.palette.common.white}`
    }
}));


function Images({ imageList, onImageButtonClick, actionIcon }){
    const [enlargeImage, setEnlargeImage] = useState(null);
    // Uppaer case to make sure it is rendered as a component
    const ActionIcon = actionIcon;
    const classes = useStyles();

    const showEnlargedImage = (e, imageSource) => {
        e.preventDefault();
        setEnlargeImage(imageSource);
    };

    return (
        <div>
            <Grid container spacing={2}>
                {imageList
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
                                    <b>{image.displayLabel}</b>
                                    <IconButton className={classes.imageActionButton} color="inherit" onClick={(e) => onImageButtonClick(e, image.id)}>
                                        <ActionIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Backdrop open={enlargeImage != null} onClick={() => setEnlargeImage(null)} className={classes.backdrop}>
                <img src={enlargeImage} className={classes.enlargedImage} />
            </Backdrop>
        </div>

    );
}

export default Images;