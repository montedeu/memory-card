import { useState } from "react";
import { PokemonGrid } from "./components/PokemonGrid";
import { getRandomPokemonIds } from "./utils/randomPokemon";
import { ScoreBoard } from "./components/ScoreBoard";
import { shuffle } from "./utils/shuffle";

import "./styles/App.css";

function App() {
  const [randomIds, setRandomIds] = useState(() =>
    getRandomPokemonIds(18)
  );

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(() => new Set());

  function handleCardClick(id) {
    setClickedIds((prev) => {
      if (prev.has(id)) {
        if (score >= bestScore) {
          setBestScore(score);
        }
        setScore(0);
        return new Set();
      }
      const newClicked = new Set(prev);
      newClicked.add(id);
      setScore(score + 1);
      setRandomIds(shuffle(randomIds));
      return newClicked;
    });
  }

  function reroll() {
    setRandomIds(getRandomPokemonIds(18));
    setScore(0);
    if (score >= bestScore) {
      setBestScore(score);
    }
    setClickedIds(new Set());
  }

  return (
    <div className="app-container">
      <div className="game-header">
        <ScoreBoard score={score} bestScore={bestScore} />
        <button className="reset-button" onClick={reroll}>New Game</button>
      </div>
      <PokemonGrid
        idsOrNames={randomIds}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;