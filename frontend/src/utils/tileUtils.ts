// LetterStatus type is used for scoring only - game logic
export type LetterStatus = "correct" | "present" | "absent" | "pending";
// Added a Tile type that can be used for game logic and in progress input
export type Tile = {
  letter: string;
  status: LetterStatus | "empty";
};

export function scoreGuess(guess: string, correctWord: string): { letter: string; status: string }[] {
  const correctLetters = correctWord.split("");
  // Keeping track of which letters have been matched - to be marked null when matched
  const usedLetters: (string | null)[] = correctLetters.slice();

  const attempts = getCorrectMatches(guess, correctLetters, usedLetters);
  return getPresentMatches(attempts, usedLetters);
}

function getCorrectMatches(guess: string, correctLetters: string[], usedLetters: (string | null)[]): {
    letter: string; status: string }[] {
  const attempts: { letter: string; status: string }[] = [];

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];

    if (letter === correctLetters[i]) {
      attempts.push({ letter, status: "correct" });
      usedLetters[i] = null; // Mark that this correct letter has been used
    } else {
      attempts.push({ letter, status: "pending" });
    }
  }

  return attempts;
}

function getPresentMatches(
  attempts: { letter: string; status: string }[], //array from getCorrectMatches(), with "correct" and "pending" statuses
  usedLetters: (string | null)[] //updated array of "correct word" where matched letters are nulled
): { letter: string; status: string }[] {
  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i].status === "pending") { // Only check letters that aren't matched yet
      const guessedLetter = attempts[i].letter;
      const foundIndex = usedLetters.indexOf(guessedLetter);

      if (foundIndex !== -1) {
        attempts[i].status = "present";
        usedLetters[foundIndex] = null;
      } else {
        attempts[i].status = "absent";
      }
    }
  }

  return attempts;
}

// Returns an array of tile objects for the current input
export function buildInputTiles(input: string): Tile[] {
  // padEnd pads the string to 5 chars with spaces with all status empty so letters
  // typed show up in tiles and empty slots are blank
  return input.padEnd(5)
  .split("")
  .map(letter => ({
    letter,
    status: "empty"
  }));
}

export function buildEmptyTiles(): Tile[] {
  // creates 5 blank tiles - an array of 5 nulls
  // map trransforms to a blank tile object 
  return Array(5).fill(null).map(() => ({
    letter: "",
    status: "empty"
  }));
}

