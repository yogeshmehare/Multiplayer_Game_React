import { useState,useEffect, useRef } from "react";
import Square from "./Square";
import { VscDebugRestart } from 'react-icons/vsc';

export default function Board({notify}) {
  const [squareList, setSquareList] = useState(Array(9).fill('\u2060'));
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
  var winnerPlayerSign = '';
  const winnerPlayerSignRef = useRef(winnerPlayerSign)
  const [playButtonText, setPlayButtonText] = useState("Play")
  const [gameStarted, setGameStarted] = useState(false)
  const [showRestartButton, setShowRestartButton] = useState(false)
  const [playerWon, setPlayerWon] = useState(false)

  useEffect(() => {
    function calculateWinner(list) {
      for (let item = 0; item < winPositionList.length; item++) {
        const [a,b,c] = winPositionList[item];
        if(list[a]!=='\u2060' && list[a]===list[b] && list[b]===list[c]){
          winnerPlayerSignRef.current = list[a];
            return true;
        }
      }
    }

    if(calculateWinner(squareList)){
      notify(winnerPlayerSignRef.current);
      setPlayerWon(true)
      setPlayButtonText("Play Again")
      setShowRestartButton(true)
    }
  }, [squareList]);


  function handleClick(pos) {
    if(winnerPlayerSignRef.current!=='' || !gameStarted)
      return
    const list = squareList.slice()
    if (['x','o'].includes(list[pos])) {
      return
    } 
    if (firstPlayerTurn) {
      list[pos] = 'x';
    }else{
      list[pos] = 'o';
    } 
    setFirstPlayerTurn(!firstPlayerTurn)
    setSquareList(list);  
  }

  function handlePlayButtonClick() {
    if(!gameStarted){
      setGameStarted(true);
      setPlayButtonText("Game is on")
    }else{
      setFirstPlayerTurn(true);
      setGameStarted(true);
      setSquareList(Array(9).fill('\u2060'));
      setPlayerWon(false)
      setPlayButtonText("Game is on")
      setShowRestartButton(false)
      winnerPlayerSignRef.current = ''
    }
  }
  
  return (
    <>
      <div className="board_text_fields">
      {playerWon && !firstPlayerTurn && <p>!! First Player with x Wins !!</p>}
      {playerWon && firstPlayerTurn && <p>!! Second Player with o Wins !!</p>}
      {firstPlayerTurn && gameStarted && !playerWon &&  <p>First Player Turn : x</p>}
      {!firstPlayerTurn && gameStarted && !playerWon && <p>Second Player Turn : o</p>}
      </div>
      <div className="board_row_container">
        <div className="board_row">
          <Square value={squareList[0]} squareClick={()=>handleClick(0)} />
          <Square value={squareList[1]} squareClick={()=>handleClick(1)} />
          <Square value={squareList[2]} squareClick={()=>handleClick(2)} />
        </div>
        <div className="board_row">
          <Square value={squareList[3]} squareClick={()=>handleClick(3)} />
          <Square value={squareList[4]} squareClick={()=>handleClick(4)} />
          <Square value={squareList[5]} squareClick={()=>handleClick(5)} />
        </div>
        <div className="board_row">
          <Square value={squareList[6]} squareClick={()=>handleClick(6)} />
          <Square value={squareList[7]} squareClick={()=>handleClick(7)} />
          <Square value={squareList[8]} squareClick={()=>handleClick(8)} />
        </div>
      </div>
      <div className="divInOneColumn">
        <div>
        {<button className="playAgainButton" onClick={()=>{handlePlayButtonClick()}}>{playButtonText}{showRestartButton && <VscDebugRestart className="restartIcon"/>}</button>}
        </div>
        {playerWon && <img className="dance-gif" src={images[getRndInteger(0,4)]} alt="dance_gif"/>}
      </div>
    </>
  );
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const winPositionList = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
] 

const images = [
  require("../res/windance_gifs/dance1.gif"),
  require("../res/windance_gifs/dance2.gif"),
  require("../res/windance_gifs/dance3.gif"),
  require("../res/windance_gifs/dance4.gif"),
  require("../res/windance_gifs/dance5.gif")
]