# Blink Tac Toe Game

A fun and unique twist on the classic Tic Tac Toe game built with React.

---

## Tech Stack

- **React** (functional components with hooks)
- CSS Modules for styling
- HTML5 Audio API for sounds

---

## Emoji Categories

Players choose emojis from different categories to represent their moves.  
Example categories used:

- Animals 🐶🐱🦊
- Fruits 🍎🍌🍉
- Faces 😀😂😍
- Custom emoji sets passed as props to the game

---

## Vanishing Feature Implementation

Each player can only have **3 emojis on the board at once**. When a player places a 4th emoji, the oldest emoji they placed **vanishes** (is removed) from the board to keep only the latest 3 moves visible. This is managed by:

- Tracking each player's moves as an array of objects `{ index, emoji }`.
- When a new move is added and the array length exceeds 3, the oldest move is removed from the board by setting that board cell to `null`.
- This creates a dynamic "vanishing" effect where emojis disappear as players continue placing new ones.

---

## Future Improvements

With more time, I would:

- Add animations for emoji disappearance to enhance the visual effect.
- Implement sound effects for the vanishing action.
- Improve accessibility and mobile responsiveness.
- Add multiplayer support over a network.
- Provide more emoji categories or let users customize their own.

---

Feel free to check the game live or clone the repo to try it yourself!

