// store.ts

import { configureStore } from '@reduxjs/toolkit';
import {silverReducer, goldReducer}  from './goldSlice'; // Import your goldSlice reducer
import timerSlice from './timerSlice';
import shopSlice from './shopSlice';

export const store = configureStore({
    reducer: {
        gold: goldReducer, // Add the goldReducer to your store
        silver: silverReducer, // Add the silverReducer to your store
        globalTimer: timerSlice,
        shop: shopSlice,
        // ... other reducers
    },
});
export type RootState = ReturnType<typeof store.getState>;

// Rest of your store configuration
