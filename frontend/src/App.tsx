import { useState, useRef, useEffect } from "react";

// Logic & helpers
import { scoreGuess, buildInputTiles, buildEmptyTiles } from "./utils/tileUtils";

// Components
import { GuessRow } from "./components/GuessRow";
import { Keyboard } from "./components/Keyboard";


// Assets
import logoUrl from "./assets/guess-word.svg";

// Styles
import "./styles/App.css";
import "./styles/GameOver.css";

const MAX_GUESSES = 6;

function App() {
  // {}[][]Type annotation for an array of arrays of objects,
  // where each object has letter and status properties
  // Starting state is an empty array
  // Stores all previous guesses as arrays of tiles (e.g. [[{letter: "T", status: "present"}, ...]])
  const [guesses, setGuesses] = useState<{ letter: string; status: string }[][]>([]);

  // useState<..>(..) = <what it will store>(what the initial value is)
  // Tracks the current game status: whether the player is still playing, has won, or has lost 
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  // Stores the user's current input
  const [currentInput, setCurrentInput] = useState("");

  // Stores the correct word to guess - to be randomised
  const [correctWord] = useState("BRAIN");

  // A reference to the input element, used for managing focus
  const inputRef = useRef<HTMLInputElement>(null);

  // On first render (component mount), focus the input field so the player can start typing right away
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  let gameOverMessage = "";

  if (gameStatus === "won") {
    gameOverMessage = `🎉 You guessed the word in ${guesses.length} guesses!`;
  } else if (gameStatus === "lost") {
    gameOverMessage = `😢 You lost. The word was ${correctWord}.`;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <img src={logoUrl} alt="Guess Word logo" className="app-logo" />
          <h1>Guess Word</h1>
        </div>
      </header>

      {gameStatus !== "playing" && (
        <div className="game-over-message">
          {gameOverMessage}
        </div>
      )}

      <main className="game-area">
        {Array.from({ length: MAX_GUESSES }, (_, i) => {
          if (i < guesses.length) {
            return <GuessRow guess={guesses[i]} key={i} />;
          } else if (i === guesses.length && gameStatus === "playing") {
            return <GuessRow guess={buildInputTiles(currentInput)} key={i} />;
          } else {
            return <GuessRow guess={buildEmptyTiles()} />;
          }
        })}
      </main>


      <Keyboard onKeyPress={handleKeyPress} />



      <section className="input-area">
        <input
          ref={inputRef}
          type="text"
          maxLength={5}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
          placeholder="Enter a 5-letter word"
          disabled={gameStatus !== "playing"}
        />
        <button onClick={handleSubmit} disabled={gameStatus !== "playing"}>
          Submit
        </button>
      </section>
    </div>
  );

  function handleKeyPress(key: string) {
    console.log("Pressed: ", key);
  }

  function handleSubmit() {

    if (guesses.length >= 6) {
      alert("No more guesses left!");
      return;
    }

    const guess = currentInput.toUpperCase();

    if (currentInput.length !== 5) {
      alert("Guess must be exactly 5 letters!");
      return;
    }

    const scored = scoreGuess(guess, correctWord);
    setGuesses([...guesses, scored]); // spread operator takes the list of guesses and adds "scored" to this list
    setCurrentInput(""); // Clear the input box

    if (winningWordCheck(scored)) {
      setGameStatus("won");
    } else if (guesses.length + 1 === MAX_GUESSES) { //  React does not immediately update the state, so guesses.length does not get added to until handleSubmit() finishes,
      // hence why this logic works.
      setGameStatus("lost");
    }

  }

  function winningWordCheck(scoredGuess: { letter: string, status: string }[]) {
    return scoredGuess.every(tile => tile.status === "correct")
  }

}
export default App;
