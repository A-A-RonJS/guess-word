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
import "./styles/GameFeedback.css";

const MAX_GUESSES = 6;

type FeedbackType = "tooFewChars" | "noGuessesLeft" | "none";

function App() {
  // {}[][]Type annotation for an array of arrays of objects,
  // where each object has letter and status properties
  // Starting state is an empty array
  // Stores all previous guesses as arrays of tiles (e.g. [[{letter: "T", status: "present"}, ...]])
  const [guesses, setGuesses] = useState<{ letter: string; status: string }[][]>([]);

  // useState<..>(..) = <what it will store>(what the initial value is)
  // Tracks the current game status: whether the player is still playing, has won, or has lost 
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  const [letterStatuses, setLetterStatuses] = useState<Record<string, string>>({});

  const statusPriority: Record<string, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    pending: 0,
  };

  function aggregateLetterStatuses(
    guesses: { letter: string; status: string }[][]
  ) {
    const aggregated: Record<string, string> = {};

    for (const guess of guesses) {
      for (const tile of guess) {
        const letter = tile.letter.toUpperCase();
        const status = tile.status;

        if (!aggregated[letter]) {
          aggregated[letter] = status;
        } else {
          if (statusPriority[status] > statusPriority[aggregated[letter]]) {
            aggregated[letter] = status;
          }
        }
      }
    }
    return aggregated;
  }

  // Stores the user's current input
  const [currentInput, setCurrentInput] = useState("");

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  // Determines which feedback message will be displayed
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackType>("none");

  function showFeedback(message: FeedbackType) {
    setFeedbackMessage(message);
    setIsFeedbackVisible(true);

    setTimeout(() => {
      setIsFeedbackVisible(false);

      // Give fade-out time to complete before clearing message
      setTimeout(() => setFeedbackMessage("none"), 600);
    }, 3000);
  }

  // Stores the correct word to guess - to be randomised
  const [correctWord] = useState("BRAIN");

  // Core key processing logic.
  // Note: This function closes over currentInput,
  // so useEffect re-registers listener when currentInput changes.
  const processKey = (key: string) => {
    const isLetter = /^[a-z]$/i.test(key);

    if (isLetter && currentInput.length < 5) {
      setCurrentInput(currentInput + key);
    } else if (key === "⌫" && currentInput.length > 0) {
      setCurrentInput(currentInput.slice(0, -1));
    } else if (key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    // This event listener uses the latest processKey and currentInput because
    // useEffect depends on them and re-runs on every change.
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/^[a-zA-Z]$/.test(key)) {
        processKey(key.toUpperCase());
      } else if (key === "Backspace") {
        processKey("⌫");
      } else if (key === "Enter") {
        processKey("Enter");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [processKey, currentInput]);

  // Stable function to pass to on-screen keyboard.
  // Calls same processKey to keep behavior consistent.
  const handleOnScreenKeyPress = (key: string) => {
    processKey(key);
  };

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

      <div className={`feedback-banner ${feedbackMessage !== "none" ? "visible" : "hidden"}`}>
        {feedbackMessage === "tooFewChars" && "⚠️ Guess must be exactly 5 letters!"}
        {feedbackMessage === "noGuessesLeft" && "❌ No more guesses left!"}
      </div>

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
      <Keyboard onKeyPress={handleOnScreenKeyPress} letterStatuses={letterStatuses} />
    </div>
  );

  function handleSubmit() {

    if (guesses.length >= 6) {
      showFeedback("noGuessesLeft");
      return;
    }

    const guess = currentInput.toUpperCase();

    if (currentInput.length !== 5) {
      showFeedback("tooFewChars");
      return;
    }

    const scored = scoreGuess(guess, correctWord);

    const newGuesses = [...guesses, scored];

    setGuesses([...guesses, scored]); // spread operator takes the list of guesses and adds "scored" to this list

    // Update letter statuses state using the aggregator function with new guesses
    const newLetterStatuses = aggregateLetterStatuses(newGuesses);
    setLetterStatuses(newLetterStatuses);

    setCurrentInput(""); // Clear the input

    // Check if guess was correct
    if (winningWordCheck(scored)) {
      setGameStatus("won");
    } else if (guesses.length + 1 === MAX_GUESSES) { //  React does not immediately update the state, so guesses.length does not get added to until handleSubmit() finishes,
      // hence why this logic works.
      // In other words, React state updates are async, so using guesses.length + 1 is correct here
      setGameStatus("lost");
    }

  }

  function winningWordCheck(scoredGuess: { letter: string, status: string }[]) {
    return scoredGuess.every(tile => tile.status === "correct")
  }

}
export default App;
