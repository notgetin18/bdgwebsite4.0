// timerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  timeLeft: number;
  timerRunning: boolean;
}

const initialState: TimerState = {
  timeLeft: 300, // 5 minutes in seconds
  timerRunning: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state) {
      state.timerRunning = true;
      state.timeLeft = 10; // Reset to 5 minutes whenever we start the timer
    },
    tick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetTimer(state) {
      state.timeLeft = initialState.timeLeft;
      state.timerRunning = true; // Optionally, restart the timer automatically
    },
    timeUp(state) {
      state.timerRunning = false;
    },
  },
});

// Export the action creators
export const { startTimer, tick, resetTimer, timeUp } = timerSlice.actions;

// Export the reducer
export default timerSlice.reducer;
