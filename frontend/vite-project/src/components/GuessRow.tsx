export function GuessRow() {
    const guess = ["G", "U", "E", "S", "S"];
    return (
        <div>
            {/* Stuff will be added here later */}
            {guess.map((letter, index) => (
                <div className="tile" key={index}>
                  {letter}
                </div>
            ))}
        </div>
    )
}