import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function Timer() {
  const startTime = useSelector((state) => state.testDescription?.startTime);
  const [timer, setTimer] = useState(new Date() - new Date(startTime));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(() => new Date() - new Date(startTime));
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [startTime]);
  if (!startTime) {
    return <></>;
  }
  return <div>Test time: {Math.floor(timer / 1000)}s</div>;
}

export default Timer;
