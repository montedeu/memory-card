import '../styles/ScoreBoard.css';

export function ScoreBoard({ score, bestScore }) {
    return (
        <div className="score-board">
            <div className="score-item">
                <span className="score-label">Score</span>
                <span className="score-value">{score}</span>
            </div>
            <div className="score-item">
                <span className="score-label">Best</span>
                <span className="score-value">{bestScore}</span>
            </div>
        </div>
    )
}