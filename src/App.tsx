import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing/Landing';
import User from './User/User';
import Discover from './Discover/Discover';
import Settings from './Settings/Settings';
import Protected from './Utilities/Protected';
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
              <Discover />
          </Route>
          <Route path="/settings">
              <Protected Component={Settings} />
          </Route>
          <Route path="/profile">
            <Protected Component={User} />
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
