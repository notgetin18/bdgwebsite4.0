import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userExists: boolean;
  showProfileForm: boolean;
  otpModal: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userExists: false,
  showProfileForm: true,
  otpModal: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserExists: (state, action: PayloadAction<boolean>) => {
      state.userExists = action.payload;
    },
    setShowProfileForm: (state, action: PayloadAction<boolean>) => {
      state.showProfileForm = action.payload;
    },
    setShowOTPmodal: (state, action: PayloadAction<boolean>) => {
      state.otpModal = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },

  },
});

export const { setUserExists, setShowProfileForm, setShowOTPmodal, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
