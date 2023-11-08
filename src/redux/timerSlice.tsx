// timerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    minutes: 5, // Initial timer values
    seconds: 0,
    hasInitialAPICallCompleted: false, // Flag to track initial API call
  },
  reducers: {
    decrementSecond: (state) => {
      if (state.seconds > 0) {
        state.seconds -= 1;
      } else if (state.minutes > 0) {
        state.minutes -= 1;
        state.seconds = 59;
      }
    },
    setInitialAPICallCompleted: (state) => {
      state.hasInitialAPICallCompleted = true;
    },
  },
});

export const { decrementSecond, setInitialAPICallCompleted } = timerSlice.actions;

export default timerSlice.reducer;
