import { useState } from 'react'
import './App.css'

// eslint-disable-next-line react/prop-types
function Square({value , onSquareClick , winner}) {
  return <button style={{backgroundColor: winner ? 'red' : null}} className="square" onClick={onSquareClick}>{value}</button>;
}

// eslint-disable-next-line react/prop-types
function Board({ xIsNext , squares , onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    // eslint-disable-next-line react/prop-types
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : [];
  const winningLine = winnerInfo ? winnerInfo.line : [];


  let status;
  if (winner) {
    status ="winner : " + winner;

  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square winner={winningLine.includes(0)} value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square winner={winningLine.includes(1)} value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square winner={winningLine.includes(2)} value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square winner={winningLine.includes(3)} value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square winner={winningLine.includes(4)} value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square winner={winningLine.includes(5)} value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square winner={winningLine.includes(6)} value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square winner={winningLine.includes(7)} value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square winner={winningLine.includes(8)} value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

export default function App() {

  // const [xIsNext , setXIsNext] = useState(true);
  const [history , setHistory] = useState([Array(9).fill(null)]);
  const [currentMove , setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove +1),  nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
    // setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares , move) => {
    let description;
    if (move > 0 ){
      description = 'Go to move ' + move; 
    } else {
      description = 'Go to Game start ';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares}  onPlay={handlePlay}/>
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}