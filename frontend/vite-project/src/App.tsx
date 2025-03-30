import "./App.css";
import { GuessRow } from "./components/GuessRow";
import logoUrl from "./assets/guess-word.svg";


function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <img src={logoUrl} alt="Guess Word logo" className="app-logo" />
          <h1>Guess Word</h1>
        </div>        
        <p>Let’s build something awesome 🧠</p>
      </header>
      <main className ="game-area">
        <GuessRow />
      </main>
    </div>
  );
}

export default App;
