import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { userUploadedImages } from '../../TempData/TempData';

const useStyles = makeStyles((theme) => ({
    imageList: {
        listStyleType: 'none',
        padding: '0',
        justifyContent: 'space-between',
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
    }
}));

function UploadedImages({ toSearch }){
    const { username } = useParams();
    const match = useRouteMatch();

    const classes = useStyles();

    return (
        <div>
            <GridList cellHeight={350} cellWidth={400} cols={3}>
                {userUploadedImages.filter(image => image.label.startsWith(toSearch)).map((image) => {
                    return <GridListTile>
                        <img src={image.img} />
                        <GridListTileBar 
                            title={image.title}
                            subtitle={<span><b>~{image.label}~</b></span>}
                        />
                    </GridListTile>
                })}
            </GridList>
        </div>
    );
}


export default UploadedImages;