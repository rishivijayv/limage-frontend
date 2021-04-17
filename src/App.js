import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Landing from './Landing/Landing';
import User from './User/User';
import Discover from './Discover/Discover';



function App() {
  return (
    <Router>
      <Switch>
      <Route path="/discover">
          <Discover />
        </Route>
        <Route path="/:username">
          <User />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
