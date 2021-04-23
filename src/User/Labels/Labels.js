import { 
    Link, 
    Switch,
    Route,
    useRouteMatch, 
    useParams 
} from 'react-router-dom';
import { labels } from '../../TempData/TempData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    labelCard: {
        minWidth: '400px',
        minHeight: '340px',
        border: '1px solid black'
    },
    centerContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    breadcrumb: {
        marginBottom: '5px',
        '& a': theme.custom.basicLink
    }
}));

function viewImagesForLabel(labelText){
    const labelName = labelText.substring(1, labelText.length-1);

}

function Labels({ toSearch }){
    const { username } = useParams();
    const match = useRouteMatch();
    const classes = useStyles();
    const [labelName, setLabelName] = useState(null);

    const viewImagesForLabel = (labelText) => {
        setLabelName(labelText.substring(1, labelText.length - 1));
    };


    return (
        <div>
            {labelName != null ? 
                <Breadcrumbs separator=">" className={classes.breadcrumb}>
                    <Link to={match.url}> Labels  </Link>
                    <Link to={`${match.url}/${labelName}`}> {labelName}  </Link>
                </Breadcrumbs>
                :
                null
            }

            <GridList cellHeight={350} cellWidth={400} cols={3}>
                {labels
                .filter(label => label.startsWith(toSearch))
                .map((label) => {
                    return <GridListTile>
                        <Card variant="outlined" className={classes.labelCard}>
                            <CardActionArea onClick={(e) => viewImagesForLabel(e.target.innerText)} className={classes.centerContent}>
                                <CardContent className={classes.centerContent}>
                                    <Typography variant="h2">
                                        ~{label}~
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </GridListTile>
                })}
            </GridList>
        </div>
        
    );
}

export default Labels;