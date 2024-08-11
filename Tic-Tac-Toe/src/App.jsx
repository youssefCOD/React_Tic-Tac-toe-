import { useState } from 'react'
import './App.css'



function Square({value , onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
let count=0;


export default function App() {
  const [squares , setsquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (count % 2 == 0) {
      nextSquares[i] = "X";
      count++;
    }
    else{
      nextSquares[i] = "O";
      count++;
    }
    setsquares(nextSquares);
  }

  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}


