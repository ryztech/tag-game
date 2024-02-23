import React, { useState, useEffect } from 'react';

function GameBoard() {
    const initialGrid = Array.from({length: 15}, () => Array(15).fill('.'));
    
    const [player, setPlayer] = useState({x: 7, y: 7});
    const [computer, setComputer] = useState({x: 0, y: 0});
    const [isPlayerIt, setIsPlayerIt] = useState(true);
    const [toggle, setToggle] = useState(false);
    
    initialGrid[player.y][player.x] = 'P'; // Player
    initialGrid[computer.y][computer.x] = 'C'; // Computer
    const [grid, setGrid] = useState(initialGrid);

    const movePlayer = (dx, dy) => {
            const newGrid = grid.map(row => [...row]);
            newGrid[player.y][player.x] = '.';
            const newX = player.x + dx;
            const newY = player.y + dy;
            if (newGrid[newY] && newGrid[newY][newX]) {
                newGrid[newY][newX] = 'P';
                setGrid(newGrid);
                setPlayer({x: newX, y: newY});
            }
    };

    const moveComputer = () => {
            const newGrid = grid.map(row => [...row]);

            let dx = 0;
            let dy = 0;

            const movementValue = isPlayerIt ? -1 : 1;

            if (toggle){
                dx = player.x > computer.x ? movementValue : player.x < computer.x ? -movementValue : 0;
            } else {
                dy = player.y > computer.y ? movementValue : player.y < computer.y ? -movementValue : 0;
            }
            setToggle(!toggle);
            
            const newComputerX = computer.x + dx;
            const newComputerY = computer.y + dy;

            if (newGrid[newComputerY] && newGrid[newComputerY][newComputerX]) {
                if (newGrid[newComputerY][newComputerX] === 'P') {
                    setIsPlayerIt(!isPlayerIt); // Update who is "it"
                  } 
                newGrid[computer.y][computer.x] = '.';
                newGrid[newComputerY][newComputerX] = 'C';
                setComputer({x: newComputerX, y: newComputerY});
                setGrid(newGrid);
            }
    };

    useEffect(() => {
            moveComputer();
    }, [player.x, player.y]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    // moveComputer();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid]);

  return (
    <div>
        <h1>{isPlayerIt ? "Player is it" : "Computer is it"}</h1>
      <pre>{grid.map(row => row.join(' ')).join('\n')}</pre>
      <div className="controls">
             <button className="control-button" onClick={() => movePlayer(0, -1)}>Up</button>
             <div className="horizontal-controls">
                 <button className="control-button" onClick={() => movePlayer(-1, 0)}>Left</button>
                 <button className="control-button" onClick={() => movePlayer(1, 0)}>Right</button>
             </div>
            <button className="control-button" onClick={() => movePlayer(0, 1)}>Down</button>
        </div>
    </div>
  );
}

export default GameBoard;