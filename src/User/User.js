import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Labels from './Labels/Labels';
import UploadedImages from './UploadedImages/UploadedImages';
import SavedImages from './SavedImages/SavedImages';
import Upload from './Upload/Upload';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Navigation from '../Navigation/Navigation';
import Heading from './Utilities/Heading';
import Settings from './Settings/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    userContainer: {
        margin: '20px'
    },
});

const username = "rishivijayv"

function User(){
    const classes = useStyles();
    const match = useRouteMatch();

    
    const authenticatedNavButtons = [
        { 
            path: `${match.url}`, 
            display: HomeIcon 
        },
        { 
            path: '/discover', 
            display: SearchIcon 
        },
        { 
            path: `${match.url}/settings`, 
            display: SettingsIcon 
        },
        { 
            path: '/', 
            display: ExitToAppIcon 
        }
    ]

    const userHeadingLinks= [
        {
            url: match.url,
            display: "Images"
        },
        {
            url: `${match.url}/labels`,
            display: "Labels"
        },
        {
            url: `/profile/upload`,
            display: "Upload"
        }
    ];

    return (           
        <div>
            <Navigation pathsWithButtons={authenticatedNavButtons} />
            <div className={classes.userContainer}>
                <Heading title={username} links={userHeadingLinks} />
                <Switch>
                    <Route path={`${match.path}/labels/:labelName`}>
                        <SavedImages />
                    </Route>
                    <Route path={`${match.path}/labels`}>
                        <Labels />
                    </Route>
                    <Route path={`${match.path}/upload`}>
                        <Upload />
                    </Route>
                    <Route path={`${match.path}/settings`}>
                        <Settings />
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