import React, { useState } from 'react';

import styles from './tictac.module.css';

const lines: [number, number,number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type setValue = "X" | "O" | null

function TicTac() {
  const [arr, setArr] = useState<setValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X"| "O" >("X");

  function checkWinner(passArray: setValue[]):setValue{
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (passArray[a] && passArray[a] === passArray[b] && passArray[a] === passArray[c]) {
        return passArray[a];
      }
    }
  
    return null;
  
  }


  function handleClick(id:number):void {
    // Below is to prevent the again clicking on same box
    if(arr[id] !== null) return

    // ye wala part imp h, ishme hi state update se pehle ek copy bna k check kia h
    const newArray = [...arr];
    newArray[id] = currentPlayer;
    
    const winInfo = checkWinner(newArray)
    if (winInfo) {
      alert(`winner is ${winInfo}`)
    }

    setArr(newArray);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div onClick={() => handleClick(0)} className={styles.col}>{arr[0]}</div>
            <div onClick={() => handleClick(1)} className={styles.col}>{arr[1]}</div>
            <div onClick={() => handleClick(2)} className={styles.col}>{arr[2]}</div>
          </div>
          <div className={styles.row}>
            <div onClick={() => handleClick(3)} className={styles.col}>{arr[3]}</div>
            <div onClick={() => handleClick(4)} className={styles.col}>{arr[4]}</div>
            <div onClick={() => handleClick(5)} className={styles.col}>{arr[5]}</div>
          </div>
          <div className={styles.row}>
            <div onClick={() => handleClick(6)} className={styles.col}>{arr[6]}</div>
            <div onClick={() => handleClick(7)} className={styles.col}>{arr[7]}</div>
            <div onClick={() => handleClick(8)} className={styles.col}>{arr[8]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTac;