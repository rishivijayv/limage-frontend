import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Labels from './Labels/Labels';
import Settings from './Settings/Settings';
import Home from './Home/Home';

function User(){
    // const { username } = useParams();
    const match = useRouteMatch();
    return (
        <div>            
            <Switch>
                <Route exact path={match.path}>
                    <Home />
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