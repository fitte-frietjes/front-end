import './style.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavLink as Link } from 'react-router-dom'
import profileView from './components/profile/profileView'
import welcomePage from './components/welcomePage'

function App() {



  return (
    <Router>
      <div className="App">
        <header className="header">
          <span>FITTE FRIETJES</span>
        </header>

        <div className="menu">
          <Link to="/">
            <div className="btn">Home</div>
          </Link>
          <Link to="/profile/1">
            <div className="btn">Profile</div>
          </Link>
        </div>
        <div className="content-wrapper">
          <Switch>
            <Route path="/profile/:id" component={profileView} />
            <Route exact path="/" component={welcomePage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;