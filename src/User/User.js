import {
    Link,
    Switch,
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Labels from './Labels/Labels';
import Settings from './Settings/Settings';
import UploadedImages from './UploadedImages/UploadedImages';
import SavedImages from './SavedImages/SavedImages';
import Navigation from '../Navigation/Navigation';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        margin: '20px',
        fontFamily: theme.typography.fontFamily,
    },
    username: {
        fontSize: '60px',
        fontWeight: '800',
        marginTop: '20px'
    },
    profileOptions: {
        listStyleType: 'none',
        padding: '0',
        marginLeft: '6px',
        '& a': {
            textDecoration: 'none',
            fontWeight: '900',
            fontSize: '22px'
        },
        '& li': {
            display: 'inline-block',
            marginRight: '20px'
        }
    }
}));

function User(){
    const classes = useStyles();
    
    const { username } = useParams();
    const match = useRouteMatch();
    return (
        <div>            
            <Navigation />
                <div className={classes.mainContainer}>
                    <div className={classes.username}>{username}</div>

                    <ul className={classes.profileOptions}>
                        <li>
                            <Link to={match.url}>Images</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/labels`}> Labels </Link>
                        </li>
                        {/* <li>
                            <Link to={`${match.url}/settings`}> Settings </Link>
                        </li> */}
                    </ul> 

                    <TextField label="Search by Label" variant="outlined" />

                    <Switch>
                        <Route exact path={match.path}>
                            <UploadedImages />
                        </Route>
                        <Route path={`${match.path}/labels/:labelName`}>
                            <SavedImages />
                        </Route>
                        <Route path={`${match.path}/labels`}>
                            <Labels />
                        </Route>
                        <Route path={`${match.path}/settings`}>
                            <Settings />
                        </Route>
                    </Switch>
            </div>
        </div>
    );
}

export default User;