import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing/Landing';
import User from './User/User';
import Discover from './Discover/Discover';
import Settings from './Settings/Settings';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    fontFamily: theme.typography.fontFamily,
  },
}));

// TODO: Replaced with proper protected routes once backend is up and running
const unauthenticatedNavButtons = [
  {
    path: '/',
    display: "Login"
  }, 
  {
    path: '/signup',
    display: "Signup"
  }
]

const authenticatedNavButtons = [
  { 
      path: '/profile', 
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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Router>
        <Switch>
          <Route path="/discover">
              <Discover navButtons={unauthenticatedNavButtons} />
          </Route>
          <Route path={`/settings`}>
              <Settings navButtons={authenticatedNavButtons} />
          </Route>
          <Route path="/profile">
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
