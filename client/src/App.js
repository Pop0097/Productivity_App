import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import Team from './pages/team/Team';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/home" component={Home} />
          <Route path="/team" component={Team} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
