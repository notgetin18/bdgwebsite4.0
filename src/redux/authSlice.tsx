import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  profileFilled: boolean;
  showProfileForm: boolean;
  otpModal: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  profileFilled: false,
  showProfileForm: true,
  otpModal: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    profileFilled: (state, action: PayloadAction<boolean>) => {
      state.profileFilled = action.payload;
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

export const { profileFilled, setShowProfileForm, setShowOTPmodal, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
