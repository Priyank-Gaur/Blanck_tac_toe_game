import React,{ useState, useEffect } from 'react';
import styles from './game.module.css';

export default function BlinkTacToe({ player1Category, player2Category, player1Name, player2Name }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    const [player1Moves, setPlayer1Moves] = useState([]);
    const [player2Moves, setPlayer2Moves] = useState([]);
    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
  
    const currentCategory = isPlayer1Turn ? player1Category : player2Category;
    const currentMoves = isPlayer1Turn ? player1Moves : player2Moves;
    const setCurrentMoves = isPlayer1Turn ? setPlayer1Moves : setPlayer2Moves;
  
    const getRandomEmoji = () => {
      return currentCategory[Math.floor(Math.random() * currentCategory.length)];
    };
  
    const handleClick = (index) => {
      if (board[index] || winner) return;
  
      const emoji = getRandomEmoji();
      const updatedMoves = [...currentMoves];
  
      if (updatedMoves.length === 3) {
        const removed = updatedMoves.shift();
        board[removed.index] = null;
      }
  
      updatedMoves.push({ index, emoji });
      const newBoard = [...board];
      newBoard[index] = emoji;
      setBoard(newBoard);
      setCurrentMoves(updatedMoves);
  
      if (checkWinner(newBoard, currentCategory)) {
        const winName = isPlayer1Turn ? player1Name : player2Name;
        setWinner(winName);
        setScore((prev) => ({
          player1: winName === player1Name ? prev.player1 + 1 : prev.player1,
          player2: winName === player2Name ? prev.player2 + 1 : prev.player2,
        }));
      } else {
        setIsPlayer1Turn(!isPlayer1Turn);
      }
    };
     
    const checkWinner = (squares, category) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
  
      for (let [a, b, c] of lines) {
        if (
          squares[a] && squares[b] && squares[c] &&
          category.includes(squares[a]) &&
          category.includes(squares[b]) &&
          category.includes(squares[c])
        ) {
          return true;
        }
      }
      return false;
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setPlayer1Moves([]);
      setPlayer2Moves([]);
      setIsPlayer1Turn(true);
      setWinner(null);
    };
  
    const goToHome = () => {
      window.location.reload(); // This resets the scores too since component unmounts
    };
  
    const status = winner
      ? `🎉 ${winner} Wins!`
      : `Next Turn: ${isPlayer1Turn ? player1Name : player2Name}`;
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Blink Tac Toe</h2>
        <div className={styles.scoreboard}>
          <span>{player1Name}: {score.player1}</span>
          <span>{player2Name}: {score.player2}</span>
        </div>
        <div className={styles.status}>{status}</div>
        <div className={styles.board}>
          {board.map((val, idx) => (
            <div
              key={idx}
              className={styles.cell}
              onClick={() => handleClick(idx)}
            >
              {val}
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            className={winner ? styles.playAgain : styles.reset}
            onClick={resetGame}
          >
            {winner ? 'Play Again' : 'Reset Game'}
          </button>
          <button className={styles.homeBtn} onClick={goToHome}>🏠 Back to Home</button>
        </div>
      </div>
    );
  }