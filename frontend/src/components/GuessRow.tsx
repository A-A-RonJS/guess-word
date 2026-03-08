type GuessRowProps = {
  guess: { letter: string; status: string }[];
};

// more concise version of function GuessRow(props: GuessRowProps) {
//  const guess = props.guess;
export function GuessRow({ guess }: GuessRowProps) {
  return (
    <div className="guess-row">
      {guess.map((tile, index) => (
        <div className={`tile ${tile.status}`} key={index}>
          {tile.letter}
        </div>
      ))}
    </div>
  );
}
