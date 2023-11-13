// store.ts

import { configureStore } from '@reduxjs/toolkit';
import {silverReducer, goldReducer}  from './metalSlice'; 
import timerSlice from './timerSlice';
import shopSlice from './shopSlice';
import couponSlice from './couponSlice';

export const store = configureStore({
    reducer: {
        gold: goldReducer, 
        silver: silverReducer, 
        timer: timerSlice,
        shop: shopSlice,
        coupon: couponSlice,
        // ... other reducers
    },
});
export type RootState = ReturnType<typeof store.getState>;

// Rest of your store configuration
