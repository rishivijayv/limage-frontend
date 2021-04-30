import {
    Route,
    Switch
} from 'react-router-dom';
import Heading from '../Utilities/Heading';
import Login from './Login/Login'
import Signup from './Signup/Signup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: theme.custom.centerContainer,
}))

function Landing(){
    const classes = useStyles();
    const title = "~Limage~";

    const landingLinks = [
        {
            url: '/',
            display: "Login"
        },
        {
            url: '/signup',
            display: "Signup"
        }
    ];

    return (
        <div className={classes.container}>
            <Heading title={title} links={landingLinks}/>


            <Switch>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>


        </div>


    );
}

export default Landing;