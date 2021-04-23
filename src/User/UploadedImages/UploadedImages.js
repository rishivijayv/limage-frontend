import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { userUploadedImages } from '../../TempData/TempData';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridList: {
        height: '100%',
        width: '100%'
    },
    image: {
        maxWidth: '100%',
        height: '450px',
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

function UploadedImages({ toSearch }){
    const { username } = useParams();
    const match = useRouteMatch();

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2}>
                {userUploadedImages
                .filter(image => image.label.startsWith(toSearch))
                .map((image, index) => {
                    const lineBreak = (index % 3 == 0) ? <br /> : null;
                    return (
                        <Grid item xs={4} key={index}>
                            <Card className={classes.imageCard}>
                                <CardActionArea>
                                    <CardMedia 
                                        className={classes.image}
                                        image={image.img}
                                    />
                                </CardActionArea>
                                <CardActions className={classes.imageActions}>
                                    <b>~{image.label}~</b>
                                    <IconButton className={classes.imageActionButton} color="inherit">
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