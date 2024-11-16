import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

function App() {
  const [player, setPlayer] = useState('X');
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill(''));

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]             
    ];

    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameover(true);
        setWin(true);
        triggerConfetti();
        return;
      }
    }

    if (board.every((box) => box !== '')) {
      setGameover(true);
      setWin(false); // This indicates a draw
    }
  };

  const handleClick = (index) => {
    if (boxes[index] === '' && !gameover) {
      const newBoxes = [...boxes];
      newBoxes[index] = player;
      setBoxes(newBoxes);
      checkWinner(newBoxes);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 180,
    });
  };

  return (
    <div>
      <div className='game'>
        <h1>Tic Tac Toe</h1>
        <p style={{
    color: !gameover 
      ? 'gray' 
      : win 
        ? 'lightgreen' 
        : 'darkred',
  }}>{!gameover ? `Player - ${player}` : win ? `Winner - ${player === 'X' ? 'O' : 'X'}` : 'Draw Match'}</p>
        <div className='board'>
          {boxes.map((box, index) => (
            <button key={index} onClick={() => handleClick(index)}>{box}</button>
          ))}
        </div>
        <div className='play'>
        {gameover && <div onClick={() => {setGameover(false);setBoxes(Array(9).fill(''));setPlayer('X')}} className='playagain'>Play Again</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
