import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
    }
}));

function UploadedImages(){
    const { username } = useParams();
    const match = useRouteMatch();

    const classes = useStyles();

    return (
        <div>
            <ul className={classes.imageList}>
                {tempData.map(imgData => {
                    return (
                        <li>
                            <img src={imgData.img} />
                        </li>
                    );
                })}
            </ul>    
        </div>
    );
}

const tempData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
      },
]

export default UploadedImages;