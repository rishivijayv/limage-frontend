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

function User(){
    const { username } = useParams();
    const match = useRouteMatch();
    return (
        <div>            
            <Navigation />
            <h1>Home for {username}</h1>
            <ul>
                <li>
                    <Link to={match.url}>Images</Link>
                </li>
                <li>
                    <Link to={`${match.url}/labels`}> Labels </Link>
                </li>
                <li>
                    <Link to={`${match.url}/settings`}> Settings </Link>
                </li>
            </ul>  

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
    );
}

export default User;