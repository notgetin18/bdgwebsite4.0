// store.ts

import { configureStore } from '@reduxjs/toolkit';
import {silverReducer, goldReducer}  from './metalSlice'; 
import timerSlice from './timerSlice';
import shopSlice from './shopSlice';
import couponSlice from './couponSlice';
import timerReducer from './timeSlice';

export const store = configureStore({
    reducer: {
        gold: goldReducer, 
        silver: silverReducer, 
        timer: timerSlice,
        shop: shopSlice,
        coupon: couponSlice,
        time: timerReducer,
        // ... other reducers
    },
});
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Rest of your store configuration
