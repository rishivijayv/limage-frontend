import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing/Landing';
import User from './User/User';
import Settings from './User/Settings/Settings';
import Discover from './Discover/Discover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    fontFamily: theme.typography.fontFamily,
},
}));

// Key is the path to which to redirect to, and value is what is text/icon that will be displayed
const unauthenticatedNavButtons = [
  {
    path: '/login',
    display: "Login"
  }, 
  {
    path: '/signup',
    display: "Signup"
  }
]

function App() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Router>
        <Switch>
          <Route path="/discover">
              <Discover navButtons={unauthenticatedNavButtons}/>
          </Route>
          <Route path={`/profile/settings`}>
            <Settings />
          </Route>
          <Route path="/:username">
            <User />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>


  );
}

export default App;
