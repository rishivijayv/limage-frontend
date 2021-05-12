import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, fade, Theme } from '@material-ui/core/styles';
import { Image } from '../GlobalTypes';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

const useStyles = makeStyles((theme: Theme) => ({
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

type ImagesProps = {
    imageList: Image[],
    onImageButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number) => Promise<void>,
    actionIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
};

/* 
    imageList is a prop of the following structure:
    {
        id: ID of the image recieved in response from backend,
        img: source of the image as obtained from backend,
        displayLabel: label that is displayed on the image card
    }
*/
function Images({ imageList, onImageButtonClick, actionIcon }: ImagesProps){
    const [enlargeImage, setEnlargeImage] = useState<string | undefined>(undefined);
    // Uppaer case to make sure it is rendered as a component
    const ActionIcon = actionIcon;
    const classes = useStyles();

    const showEnlargedImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageSource: string) => {
        e.preventDefault();
        setEnlargeImage(imageSource);
    };

    return (
        <div>
            <Grid container spacing={2}>
                {imageList
                .map((image: Image, index: number) => {
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

            <Backdrop open={enlargeImage != undefined} onClick={() => setEnlargeImage(undefined)} className={classes.backdrop}>
                <img src={enlargeImage} className={classes.enlargedImage} />
            </Backdrop>
        </div>

    );
}

export default Images;