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

const useStyles = makeStyles((theme) => ({
    labelCard: {
        minWidth: '400px',
        minHeight: '340px',
        border: '1px solid black'
    },
    labelContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

function Labels({ toSearch }){
    const { username } = useParams();
    const match = useRouteMatch();
    const classes = useStyles();

    return (
        <div>
            <GridList cellHeight={350} cellWidth={400} cols={3}>
                {labels
                .filter(label => label.startsWith(toSearch))
                .map((label) => {
                    return <GridListTile>
                        <Card variant="outlined" className={classes.labelCard}>
                            <CardContent className={classes.labelContent}>
                                <Typography variant="h2">
                                    ~{label}~
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>
                })}
            </GridList>
        </div>
        
    );
}

export default Labels;