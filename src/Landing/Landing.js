import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Heading from '../Utilities/Heading';
import Login from './Login/Login'
import Signup from './Signup/Signup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: theme.custom.centerContainer,
    discoverPrompt: {
        marginTop: '35px',
        '& a': {
            color: theme.palette.common.black
        },
        '& a:visited': {
            color: theme.palette.common.black
        }

    }
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

            <h4 className={classes.discoverPrompt}>Want to discover without an account? Click <Link to="/discover">here</Link></h4>


        </div>


    );
}

export default Landing;