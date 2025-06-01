import "../styles/Keyboard.css";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  letterStatuses: Record<string, string>;
};

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export function Keyboard({ onKeyPress, letterStatuses }: KeyboardProps) {
  return (
    <section className="keyboard-area">
      {keyboardRows.map((row, rowIndex) => {
        return (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key) => {
              const status = letterStatuses[key] || "";
              return (
                <div
                  className={`key ${status}`}
                  key={key}
                  onClick={() => onKeyPress(key)}
                  tabIndex={0}
                  style={{
                    flexGrow: key === "Enter" || key === "⌫" ? 1.5 : 1,
                    fontSize: key === "Enter" ? "0.6rem" : key === "⌫"
                      ? "0.7rem"
                      : "1rem",

                  }}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                      onKeyPress(key);
                    }
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