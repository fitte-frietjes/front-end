import './style.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavLink as Link } from 'react-router-dom'
import welcomePage from './components/welcomePage'
import profileView from './components/profile/profileView'
import ProfileWorkoutView from './components/workout/profileWorkoutView'
import ProfileWorkoutAdd from './components/workout/ProfileWorkoutAdd'

function App() {

  return (
    <Router>
      <div className="App">
        <header className="header">
          <span>FITTE FRIETJES</span>
        </header>

        <div className="menu">
          <Link exact={true} activeClassName="active" to="/">
            <div className="btn">Home</div>
          </Link>
          <Link activeClassName="active" to="/profile/1">
            <div className="btn">Profile</div>
          </Link>
          <Link activeClassName="active" to="/workouts/1">
            <div className="btn">Workouts</div>
          </Link>
        </div>
        <div className="content-wrapper">
          <Switch>
            <Route path="/profile/:id" component={profileView} />
            <Route exact path="/workouts/:id" component={ProfileWorkoutView} />
            <Route exact path="/workouts/add/:id" component={ProfileWorkoutAdd} />
            <Route exact path="" component={welcomePage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;