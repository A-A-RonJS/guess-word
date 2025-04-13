import { useState } from "react";
import { scoreGuess } from "./utils/scoreGuess";
import "./styles/GuessRow.css";
import { GuessRow } from "./components/GuessRow";
import logoUrl from "./assets/guess-word.svg";

function App() {
  const [guesses, setGuesses] = useState<
    // Type annotation for an array of arrays, where each inner array contains objects with a letter and status
    { letter: string; status: string }[][]
  >([]); // Initial value - zero guesses

  const [currentInput, setCurrentInput] = useState("");

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <img src={logoUrl} alt="Guess Word logo" className="app-logo" />
          <h1>Guess Word</h1>
        </div>
        <p>Hello World!</p>
      </header>

      <main className="game-area">
        {guesses.map((guess, index) => (
          <GuessRow guess={guess} key={index} />
        ))}
      </main>

      <section className="input-area">
        <input
          type="text"
          maxLength={5}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
          placeholder="Enter a 5-letter word"
        />
        <button onClick={handleSubmit}>Submit</button>
      </section>
    </div>
  );

  function handleSubmit() {
    const guess = currentInput.toUpperCase();
    const correctWord = "GUESS";

    if (currentInput.length !== 5) {
      alert("Guess must be exactly 5 letters!");
      return;
    }

    const scored = scoreGuess(guess, correctWord);
    setGuesses([...guesses, scored]); // spread operator takes the list of guesses and adds "scored" to this list
    setCurrentInput(""); // Clear the input box
  }
}

export default App;
