import {
    Route,
    Switch,
    Router,
    useRouteMatch
} from 'react-router-dom';
import Heading from '../Utilities/Heading';
import Login from './Login/Login'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: theme.custom.centerContainer
}))

function Landing(props){
    const classes = useStyles();
    const title = "~Limage~";
    const match = useRouteMatch();
    
    const landingLinks = [
        {
            url: `${match.url}`,
            display: "Login"
        },
        {
            url: `${match.url}/signup`,
            display: "Signup"
        }
    ];

    return (
        <div className={classes.container}>
            <Heading title={title} links={landingLinks}/>


            <Switch>
                <Route path={`${match.path}/signup`}>
                    <h2>Signup coming soon!</h2>
                </Route>
                <Route path={`${match.path}`}>
                    <Login />
                </Route>
            </Switch>


        </div>


    );
}

export default Landing;