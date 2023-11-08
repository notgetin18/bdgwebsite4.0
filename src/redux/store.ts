import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import managerReducer from "./rootSlice";
// import shopReducer from "./shopSlice";
// import authReducer from "./authSlice";
import shopReducer from "./shopSlice"
export const store = configureStore({
  reducer: {
    // main: managerReducer,
    shop: shopReducer,
    // auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
