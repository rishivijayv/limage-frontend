import {
    Switch,
    Route,
    NavLink,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Labels from './Labels/Labels';
import Settings from './Settings/Settings';
import UploadedImages from './UploadedImages/UploadedImages';
import SavedImages from './SavedImages/SavedImages';
import Navigation from '../Navigation/Navigation';
import Upload from './Upload/Upload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        margin: '20px',
        fontFamily: theme.typography.fontFamily,
    },
    profileHeader: {
        textAlign: 'center'
    },
    username: {
        fontSize: '60px',
        fontWeight: '800',
        marginTop: '20px'
    },
    profileOptions: {
        listStyleType: 'none',
        padding: '0',
        marginLeft: '12px',
        '& li': {
            display: 'inline-block',
            marginRight: '20px',
            color: theme.palette.common.black
        }
    },
    divider: {
        marginTop: '12px',
        width: '300px',
    },
    selectedOption: {
        fontWeight: '800'
    },
    optionUrl: {
        textDecoration: 'none',
        fontSize: '22px',
        color: 'black',
    }
}));

function User(){
    const classes = useStyles();

    const { username } = useParams();
    const match = useRouteMatch();

    const getProfileOption = (optionUrl, optionName) => {
        return <NavLink exact 
                        className={classes.optionUrl} 
                        activeClassName={classes.selectedOption} 
                        to={optionUrl}> 
                    {optionName} 
                </NavLink>
    };

    return (
        <div>            
            <Navigation />
                <div className={classes.mainContainer}>
                    <div className={classes.profileHeader}>
                        <div className={classes.username}>{username}</div>

                        <ul className={classes.profileOptions}>
                            <li>
                                {getProfileOption(match.url, "Images")}
                            </li>
                            <li>
                                {getProfileOption(`${match.url}/labels`, "Labels")}
                            </li>
                            <li>
                                {getProfileOption(`${match.url}/upload`, "Upload")}
                            </li>
                        </ul> 
                        
                        <hr className={classes.divider}/>
                    </div>


                    <Switch>
                        <Route path={`${match.path}/labels/:labelName`}>
                            <SavedImages />
                        </Route>
                        <Route path={`${match.path}/labels`}>
                            <Labels />
                        </Route>
                        <Route path={`${match.path}/settings`}>
                            <Settings />
                        </Route>
                        <Route path={`${match.path}/upload`}>
                            <Upload />
                        </Route>
                        <Route exact path={match.path}>
                            <UploadedImages/>
                        </Route>
                    </Switch>
            </div>
        </div>
    );
}

export default User;