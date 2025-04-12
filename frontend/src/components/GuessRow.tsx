type GuessRowProps = {
  guess: { letter: string; status: string; }[];
};

export function GuessRow( { guess }: GuessRowProps) {
  const filled = guess.length > 0 
  ? guess
  : Array.from({ length: 5 }, () => ({ letter: "", status: "empty" }));

  return (
    <div className="guess-row">
      {filled.map((tile, index) => (
        <div className={`tile ${tile.status}`} key={index}>
          {tile.letter}
        </div>
      ))}
    </div>
  )
}