
import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import Labels from './Labels/Labels';
import SavedImages from './SavedImages/SavedImages';
import Upload from './Upload/Upload';
import UploadedImages from './UploadedImages/UploadedImages';
import Heading from '../Utilities/Heading';
import Navigation from '../Navigation/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { ProtectedComponentProps } from '../GlobalTypes';

const useStyles = makeStyles({
    userContainer: {
        margin: '40px'
    },
});

function User({ user }: ProtectedComponentProps){
    const classes = useStyles();
    const match = useRouteMatch();

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
            <Navigation />
            <div className={classes.userContainer}>
                <Heading title={user!.username} links={userHeadingLinks} />
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
                    <Route exact path={match.path}>
                        <UploadedImages/>
                    </Route>
                </Switch>
            </div>
        </div>

    );
}

export default User;