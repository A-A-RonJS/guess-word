export type LetterStatus = "correct" | "present" | "absent" | "pending";

export function scoreGuess(guess: string, correctWord: string
): {
  letter: string; status: string
}[] {
  const correctLetters = correctWord.split("");
  // Keeping track of which latters have been matched - to be marked null when matched
  const usedLetters: (string | null)[] = correctLetters.slice();

  const attempts = getCorrectMatches(guess, correctLetters, usedLetters);
  return getPresentMatches(attempts, usedLetters);
}

function getCorrectMatches(
  guess: string, correctLetters: string[], usedLetters: (string | null)[]): {
    letter: string; status: string
  }[] {
  const attempts: { letter: string; status: string }[] = [];

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];

    if (letter === correctLetters[i]) {
      attempts.push({ letter, status: "correct" });
      usedLetters[i] = null;
    } else {
      attempts.push({ letter, status: "pending" });
    }
  }

  return attempts;
}

function getPresentMatches(
  attempts: { letter: string; status: string }[],
  usedLetters: (string | null)[]
): { letter: string; status: string }[] {
  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i].status === "pending") {
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

