import React,{ useState,useEffect,useRef } from 'react';
import BlinkTacToe from "./components/game.jsx"
import styles from './home.module.css';


const categories = {
  Animals: ['🐶', '🐱', '🐵', '🐰'],
  Food: ['🍕', '🍟', '🍔', '🍩'],
  Sports: ['⚽', '🏀', '🏈', '🎾'],
  Faces: ['😀', '😂', '😍', '😎'],
};

export default function Home() {
  const [player1Cat, setPlayer1Cat] = useState('');
  const [player2Cat, setPlayer2Cat] = useState('');
  const [error, setError] = useState('');
  const [start, setStart] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const musicRef = useRef(null);

  useEffect(() => {
    const audio = musicRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.pause();
    }
  }, []);

  const toggleMute = () => {
    if (musicRef.current) {
      if (isMuted) {
        musicRef.current.play().catch(() => {});
      } else {
        musicRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleStart = () => {
    if (player1Cat === '' || player2Cat === '') {
      setError('Please select a category for both players.');
    } else if (player1Cat === player2Cat) {
      setError('Players cannot choose the same category!');
    } else {
      setError('');
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
      setStart(true);
    }
  };

  if (start) {
    return (
      <BlinkTacToe
        player1Category={categories[player1Cat]}
        player2Category={categories[player2Cat]}
        player1Name={player1Cat}
        player2Name={player2Cat}
      />
    );
  }

  return (
    <div className={styles.landing}>
      <audio ref={musicRef} src="/background.mp3" loop />
      <button onClick={toggleMute} className={styles.soundToggle}>
        {isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
      </button>
      <h1 className={styles.title}>✨ Blink Tac Toe ✨</h1>
      <p className={styles.subtitle}>Choose your emojis and challenge your friend in a tactical twist on Tic Tac Toe!</p>

      <div className={styles.aboutBox}>
        <h3>🧠 How to Play</h3>
        <ul className={styles.rulesList}>
          <li><strong>Step 1:</strong> Each player picks a unique emoji category (like Animals or Food).</li>
          <li><strong>Step 2:</strong> On your turn, a random emoji from your category is assigned to you.</li>
          <li><strong>Step 3:</strong> Place your emoji on any empty cell in the 3x3 grid.</li>
          <li><strong>Vanishing Rule:</strong> Only 3 emojis per player are allowed on the board. The oldest disappears when placing a 4th.</li>
          <li><strong>Winning:</strong> Line up 3 of your emojis to win!</li>
          <li><strong>Bonus:</strong> There are no draws — you can play forever!</li>
        </ul>
      </div>

      <div className={styles.selectionPanel}>
        <div className={styles.selector}>
          <label>Player 1 Category:</label>
          <select value={player1Cat} onChange={(e) => setPlayer1Cat(e.target.value)}>
            <option value="">-- Select Category --</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.selector}>
          <label>Player 2 Category:</label>
          <select value={player2Cat} onChange={(e) => setPlayer2Cat(e.target.value)}>
            <option value="">-- Select Category --</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.playBtn} onClick={handleStart}>🎮 Start Game</button>
      </div>
    </div>
  );
}