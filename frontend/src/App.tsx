import { useState } from "react";
import "./GuessRow.css";
import { GuessRow } from "./components/GuessRow";
import logoUrl from "./assets/guess-word.svg";


function App() {
  // const guesses = [
  //   [
  //     { letter: "G", status: "correct" },
  //     { letter: "U", status: "absent" },
  //     { letter: "E", status: "absent" },
  //     { letter: "S", status: "absent" },
  //     { letter: "S", status: "present" },
  //   ],
  //   [
  //     { letter: "T", status: "absent" },
  //     { letter: "R", status: "present" },
  //     { letter: "A", status: "absent" },
  //     { letter: "I", status: "present" },
  //     { letter: "N", status: "absent" },
  //   ],
  //   [], [], []
  // ];

  const [guesses, setGuesses] = useState
  < 
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
        <p>Let’s build something awesome 🧠</p>
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
    if (currentInput.length !== 5) {
      alert("Guess must be exactly 5 letters!");
      return;
    }
  
    const newGuess = currentInput.split("").map((letter) => ({
      letter, //Same as letter: letter
      status: "absent", // Temp placeholder while building
    }));
  
    setGuesses([...guesses, newGuess]); // spread operator takes the list of guesses and adds newGuess to this list
    setCurrentInput(""); // Clear the input box
  }
}

export default App;
