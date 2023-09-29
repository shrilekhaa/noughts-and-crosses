import React, { useEffect, useState } from 'react';
import './ticTacToe.css';
import circleImg from '../images/circle.png';
import crossImg from '../images/cross.png';

const TicTacToe = () => {
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState('');
  const [data, setData] = useState(Array(9).fill(''))

  const checkforEntries = (i, j, k) => {
    if (data[i] && data[j] && data[k] && data[i] === data[j] && data[j] === data[k] && data[k] !== '') {
      return true;
    }
    return false;
  }

  const checkForWin = () => {
    if (checkforEntries(0,1,2)) {
      setLock(true);
      setWinner(data[0]);
      return;
    }
    if (checkforEntries(3,4,5)) {
      setLock(true);
      setWinner(data[3]);
      return;
    }
    if (checkforEntries(6,7,8)) {
      setLock(true);
      setWinner(data[6]);
      return;
    }
    if (checkforEntries(0,3,6)) {
      setLock(true);
      setWinner(data[0]);
      return;
    }
    if (checkforEntries(1,4,7)) {
      setLock(true);
      setWinner(data[1]);
      return;
    }
    if (checkforEntries(2,5,8)) {
      setLock(true);
      setWinner(data[2]);
      return;
    }
    if (checkforEntries(0,4,8)) {
      setLock(true);
      setWinner(data[0]);
      return;
    }
    if (checkforEntries(2,4,6)) {
      setLock(true);
      setWinner(data[2]);
      return;
    }
    if (count === 9 && !lock)
      setWinner("tie");
  }

  const toggle = (e, box) => {
    if (lock) {
      return;
    }
    let b_id = +box[box.length - 1];
    let newData = Object.assign([], data);
    if (count %2 === 0) {
      e.target.innerHTML = `<img src='${circleImg}'></img>`;
      newData[b_id] = 'o';
      setData(newData);
    } else {
      e.target.innerHTML = `<img src='${crossImg}'></img>`;
      newData[b_id] = 'x';
      setData(newData);
    }
    setCount(() => count + 1);
  }

  useEffect(() => {
    checkForWin();
  }, [data]);
  
  useEffect(() => {
      let titleEl = document.querySelector('.title');
      if (titleEl) {
        if (!winner) {
          titleEl.innerHTML = `Let's play TicTacToe developed in <span class="react-text">React</span>`;
        } else if (winner === 'x') {
          titleEl.innerHTML = `Congratulations X!`;
        } else if (winner === 'o') {
          titleEl.innerHTML = `Congratulations O!`
        } else {
          titleEl.innerHTML = `Uh..oh!, It's a Tie`;
        }
      }
  }, [winner])

  const handleReset = () => {
    setLock(false);
    setWinner('');
    setCount(0);
    let nodeList = document.querySelectorAll('.box');
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].innerHTML = '';
    }
    setData(Array(9).fill(''));
  }

  return (
        <div className="container">
          <h1 className="title">Let's play TicTacToe developed in <span>React</span></h1>
          <div className="board">
            <div className="row row0">
              <div className="box box0" onClick={(e) => toggle(e, 'box0')}></div>
              <div className="box box1" onClick={(e) => toggle(e, 'box1')}></div>
              <div className="box box2" onClick={(e) => toggle(e, 'box2')}></div>
            </div>
            <div className="row row1">
              <div className="box box3" onClick={(e) => toggle(e, 'box3')}></div>
              <div className="box box4" onClick={(e) => toggle(e, 'box4')}></div>
              <div className="box box5" onClick={(e) => toggle(e, 'box5')}></div>
            </div>
            <div className="row row2">
              <div className="box box6" onClick={(e) => toggle(e, 'box6')}></div>
              <div className="box box7" onClick={(e) => toggle(e, 'box7')}></div>
              <div className="box box8" onClick={(e) => toggle(e, 'box8')}></div>
            </div>
          </div>
          <button className="reset" onClick={() => handleReset()}>Reset</button>
        </div>
  )
}

export default TicTacToe