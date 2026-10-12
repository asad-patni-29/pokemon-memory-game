import { useState } from "react";

const totalPairs = 8;

const getRandomPockemonids = (count: number) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 800) + 1);
  }
  return [...ids];
};

const createDeck = () => {
  const ids = getRandomPockemonids(totalPairs);
  const deck = [...ids, ...ids];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
function App() {
  console.log(createDeck(), "createDeck");

  const [deck, setDeck] = useState(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [lockBoard, setLockBoard] = useState<boolean>(false);
  console.log(deck, "deck");
  console.log(flipped, "flipped");
  console.log(matched, "matched");
  console.log(attempts, "attempts");
  console.log(lockBoard, "lockBoard");

  const handleCardClick = (index: number) => {
    console.log(index, "index");

    if (lockBoard) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    console.log(newFlipped, "newFlipped");

    if (newFlipped.length === 2) {
      setAttempts((a) => a + 1);
      const [i, j] = newFlipped;

      if (deck[i] === deck[j]) {
        setMatched((m) => [...m, i, j]);
        setFlipped([]);
      } else {
        setLockBoard(true);
        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
        }, 800);
      }
    }
  };

  const handleReset = () => {
    setDeck(createDeck);
    setFlipped([]);
    setMatched([]);
    setLockBoard(false);
    setAttempts(0);
  };

  const won = matched.length === deck.length;

  return (
    <div className="app">
      <h1>Pokemon Memory Game</h1>
      <div className="stats">
        <span>Attempts : {attempts}</span>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {won && <div className="congrats"> Congratulations you won </div>}

      <div className="grid">
        {deck.map((id, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          console.log(isFlipped, "isFlipped");

          return (
            <div
              key={index}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div className="card-face card-back">?</div>
                <div className="card-face card-front">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={`Pockemon ${id}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
