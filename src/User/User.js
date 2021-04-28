
import {
    Switch,
    Route,
    useRouteMatch,
    useParams
} from 'react-router-dom';import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Navigation from '../Navigation/Navigation';
import Labels from './Labels/Labels';
import SavedImages from './SavedImages/SavedImages';
import Upload from './Upload/Upload';
import UploadedImages from './UploadedImages/UploadedImages';
import Heading from './Utilities/Heading';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    userContainer: {
        margin: '20px'
    },
});

function User(){
    const classes = useStyles();
    const match = useRouteMatch();
    const { username } = useParams();

    
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
            path: '/settings', 
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
            url: `${match.url}/upload`,
            display: "Upload"
        }
    ];

    return (           
        <div>
            <Navigation pathsWithButtons={authenticatedNavButtons} />
            <div className={classes.userContainer}>
                <Heading title={username} links={userHeadingLinks} />
                <Switch>
                    <Route path={`${match.path}/labels`}>
                        <Labels />
                    </Route>
                    <Route path={`${match.path}/labels/:labelName`}>
                        <SavedImages />
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