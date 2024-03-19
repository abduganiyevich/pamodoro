import React, { useState, useEffect } from 'react';
import './App.css'
const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      setIsActive(false);
      setIsBreakTime(prevState => !prevState);
      setTimeLeft(isBreakTime ? 5 * 60 : 25 * 60); 
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreakTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreakTime(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="App">
      <h1>{isBreakTime ? 'Break Time' : 'Work Time'}</h1>
      <div className="timer">{formatTime(timeLeft)}</div>
      <button className='start' onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button className='reset' onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default App;
