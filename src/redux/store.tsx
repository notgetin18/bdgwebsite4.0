// store.ts
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { silverReducer, goldReducer } from './metalSlice';
import shopSlice from './shopSlice';
import couponSlice from './couponSlice';
import timerReducer from './timeSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({ gold: goldReducer, silver: silverReducer, shop: shopSlice, coupon: couponSlice, time: timerReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const store = configureStore({
    reducer: persistedReducer
})
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Rest of your store configuration