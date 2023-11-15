import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementTimer, resetTimer } from '@/redux/actionTypes';
import { RootState } from '@/redux/store';

const Timer: React.FC = () => {
  const time = useSelector((state: RootState) => state.time.time);
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If there's an existing timer, clear it first
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    // Then set a new timer
    intervalRef.current = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    // Clear interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time, dispatch]); // Add `time` to the dependency array

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div>Timer: {formatTime(time)}</div>
      {/* <button onClick={handleReset}>Reset Timer</button> */}
    </div>
  );
};

export default Timer;
