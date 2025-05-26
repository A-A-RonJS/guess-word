import "../styles/Keyboard.css";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "←"],
];

export function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <section className="keyboard-area">
      {keyboardRows.map((row, rowIndex) => {
        return (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key) => {
              return (
                <div
                  className="key"
                  key={key}
                  onClick={() => onKeyPress(key)}
                  style={{
                    flexGrow: key === "Enter" || key === "←" ? 1.5 : 1,
                    fontSize: key === "Enter" ? "0.6rem" : "1rem",
                  }}
                >
                  {key}
                </div>
              )
            })}
          </div>
        );
      })
      }
    </section>
  );
}