import './style.scss';
import ProfileWelcomeMsg from './components/profile/welcome'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fitte Frietjes FRONTEND!!
        </p>

        <ProfileWelcomeMsg />

      </header>
    </div>
  );
}

export default App;