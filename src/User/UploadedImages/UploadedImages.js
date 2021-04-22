import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { userUploadedImages } from '../../TempData/TempData';

const useStyles = makeStyles((theme) => ({
    imageList: {
        listStyleType: 'none',
        padding: '0',
        justifyContent: 'space-between',
        display: 'table',
        '& li': {
            display: 'inline-block',
            marginRight: '20px',
            marginLeft: '20px',
            marginTop: '30px'
        },
        '& img': {
            maxWidth: '350px',
            height: '350px'
        }
    },
    gridList: {
        height: '100%',
        width: '100%'
    },
    image: {
        maxWidth: '100%',
        height: '350px'
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
                            <Card>
                                <CardActionArea>
                                    <CardMedia 
                                        className={classes.image}
                                        image={image.img}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}


export default UploadedImages;