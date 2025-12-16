import { useState } from "react";
import { PokemonGrid } from "./components/PokemonGrid";
import { Modal } from "./components/Modal";
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

  // New state for modals
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  function handleCardClick(id) {
    if (gameStatus !== 'playing') return;

    setClickedIds((prev) => {
      if (prev.has(id)) {
        // Game Over - Loss
        if (score >= bestScore) {
          setBestScore(score);
        }
        setGameStatus('lost');
        return prev; // Don't reset yet, let the modal do it
      }

      const newClicked = new Set(prev);
      newClicked.add(id);

      // Check for Win
      if (newClicked.size === 18) {
        setScore(score + 1); // Update score to show max
        if (score + 1 >= bestScore) {
          setBestScore(score + 1);
        }
        setGameStatus('won');
        return newClicked;
      }

      setScore(score + 1);
      setRandomIds(shuffle(randomIds));
      return newClicked;
    });
  }

  function reroll() {
    setRandomIds(getRandomPokemonIds(18));
    setScore(0);
    // Best score is already updated if needed during game over/win check? 
    // Actually standard behavior is to keep best score persistent.
    // The previous logic updated bestScore here too, which is safe.
    if (score >= bestScore) {
      setBestScore(score);
    }
    setClickedIds(new Set());
    setGameStatus('playing');
  }

  function handleRestart() {
    reroll();
  }

  return (
    <div className="app-container">
      <div className="game-header">
        <ScoreBoard score={score} bestScore={bestScore} />
        <div className="header-actions">
          <button
            className="info-button"
            onClick={() => setShowInstructions(true)}
            aria-label="How to play"
          >
            ?
          </button>
          <button className="reset-button" onClick={reroll}>New Game</button>
        </div>
      </div>
      <PokemonGrid
        idsOrNames={randomIds}
        onCardClick={handleCardClick}
      />

      {/* Instructions Modal */}
      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="How to Play"
      >
        <p>Get points by clicking on an image but don't click on any more than once!</p>
        <p>Try to remember which Pokemon you have already clicked.</p>
        <p>Goal: Click all 18 unique Pokemon to win!</p>
      </Modal>

      {/* Game Over / Win Modal */}
      <Modal
        isOpen={gameStatus !== 'playing'}
        onClose={handleRestart}
        title={gameStatus === 'won' ? "You Won!" : "Game Over"}
        showCloseButton={false}
      >
        <p>
          {gameStatus === 'won'
            ? "Congratulations! You remembered all the Pokemon!"
            : "Oops! You already clicked that one."}
        </p>
        <p className="final-score">Final Score: {score}</p>
        <button className="modal-action-button" onClick={handleRestart}>
          Play Again
        </button>
      </Modal>
    </div>
  );
}

export default App;