import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import Team from './pages/team/Team';
import Task from './pages/task/Task';
import CreateTask from './pages/task/create/CreateTask';
import CreateTeam from './pages/team/create/CreateTeam';
import EditTeamMembers from './pages/team/members/EditTeamMembers';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/home" component={Home} />
          <Route path="/team" component={Team} />
          <Route path="/task" component={Task} />
          <Route path="/create-task" component={CreateTask} />
          <Route path="/create-team" component={CreateTeam} />
          <Route path="/edit-team-members" component={EditTeamMembers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
