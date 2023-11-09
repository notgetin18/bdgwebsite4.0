// TimerComponent.tsx
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, tick, resetTimer, timeUp } from '../redux/timerSlice';
import { metalPrice } from '@/api/DashboardServices';
import { setGoldData, setSilverData } from '@/redux/goldSlice';

interface RootState {
  timer: {
    timeLeft: number;
    timerRunning: boolean;
  };
}

const TimerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state: RootState) => state.timer.timeLeft);
  const timerRunning = useSelector((state: RootState) => state.timer.timerRunning);

  const fetchData = useCallback(async () => {
    try {
      const response: any = await metalPrice();
      const metalPriceOfGoldSilver = await JSON.parse(response);
      dispatch(setGoldData(metalPriceOfGoldSilver.data.gold[0]));
      dispatch(setSilverData(metalPriceOfGoldSilver.data.silver[0]));
    } catch (error) {
      console.error('Error fetching metal data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData();
    dispatch(startTimer());
  }, [dispatch, fetchData]);

  useEffect(() => {
    if (timerRunning) {
      const timerID = setInterval(() => {
        dispatch(tick());
      }, 1000);

      return () => {
        clearInterval(timerID);
      };
    }
  }, [timerRunning, dispatch]);

  useEffect(() => {
    if (timeLeft === 0 && timerRunning) {
      dispatch(timeUp());
      fetchData(); // Call fetchData when the timer reaches 0
      console.log('function called!!!')
      // Uncomment the line below if you want the timer to restart automatically
      dispatch(resetTimer());
    }
  }, [timeLeft, timerRunning, dispatch, fetchData]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div>
      <p>{formatTime(timeLeft)}</p>
      {/* You might want to render start/stop/reset buttons here */}
    </div>
  );
};

export default TimerComponent;
