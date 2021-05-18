import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing/Landing';
import User from './User/User';
import Discover from './Discover/Discover';
import Settings from './Settings/Settings';
import Navigation from './Navigation/Navigation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    fontFamily: theme.typography.fontFamily,
  },
}));



function App() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Router>
        <Switch>
          <Route path="/discover">
              <Navigation />
              <Discover />
          </Route>
          <Route path="/settings">
              <Navigation />
              <Settings />
          </Route>
          <Route path="/profile">
            <Navigation />
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
