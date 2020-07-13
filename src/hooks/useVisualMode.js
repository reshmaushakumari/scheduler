import React, { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    replace ? setMode(history[history.length-1]) : setHistory(prevArray =>[...prevArray, mode])
    setMode(mode);
  }
  console.log(history)

  function back() {
    if(history.length > 1){
      history.pop()
      setMode(history[history.length-1])
    }
  }
  console.log(history)
  return { mode, transition, back, history};
}
