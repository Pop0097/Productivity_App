import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Authentication} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
