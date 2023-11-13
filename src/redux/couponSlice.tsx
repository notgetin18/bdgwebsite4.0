// couponSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseFloat } from '@/components/helperFunctions';
import { MetalType } from './shopSlice';

interface Coupon {
  code: string;
  createdAt: string;
  description: string;
  expiryDate: string;
  itemType: string;
  maximum: number;
  minimum: number;
  percentage: number;
  status: boolean;
  type: string;
  updatedAt: string;
  used_count: number;
  __v: number;
  _id: string;
  // Add other properties as needed
}

interface CouponState {
  selectedCoupon: Coupon | null;
  appliedCouponCode: string | null;
  error: string | null;
  extraGoldOfRuppess: number;
  extraGold: number; // Added property
  coupons: Coupon[]; // Array to store available coupons
}


const initialCoupons: Coupon[] = [
  // Your list of coupons from the API
  {
    code: "",
    createdAt: "",
    description: "",
    expiryDate: "",
    itemType: "GOLD",
    maximum: 0,
    minimum: 0,
    percentage: 0,
    status: true,
    type: "PERCENTAGE",
    updatedAt: "",
    used_count: 0,
    __v: 0,
    _id: "",
  },
  // Add more coupons as needed
];

const initialState: CouponState = {
  selectedCoupon: null,
  appliedCouponCode: null,
  error: null,
  extraGoldOfRuppess: 0,
  coupons: initialCoupons,
  extraGold: 0,
};

// ... (previous imports and code)

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (
      state,
      action: PayloadAction<{
        coupon: Coupon;
        amount: number;
        transactionType: string;
        metalType: MetalType;
        goldPrice: number;
      }>
    ) => {
      const { coupon, amount, transactionType, metalType, goldPrice } = action.payload;
      // Check if amount is greater than or equal to the coupon's minimum value
      if (amount < coupon.minimum) {
        state.error = `This Coupon is not applicable for amount less than Rs ${coupon.minimum}`;
        state.selectedCoupon = null;
        state.appliedCouponCode = null;
        state.extraGoldOfRuppess = 0;
        state.extraGold = 0;
      } else {

        if (transactionType === 'rupees' && metalType === 'gold') {
          // Calculate extra gold based on coupon percentage and maximum value
          const extraGoldOfRuppess = (amount * coupon.percentage) / 100;
          state.extraGoldOfRuppess = Math.min(extraGoldOfRuppess, coupon.maximum);
          // Assuming goldPrice is available in your action payload or from the store
          const extraGold = ParseFloat(extraGoldOfRuppess / goldPrice, 4);
          state.extraGold = extraGold
        }

        state.selectedCoupon = coupon;
        state.appliedCouponCode = coupon.code; // Store applied coupon code
        state.error = null;
        // state.extraGold = 0
      }
    },
    clearCoupon: (state) => {
      state.selectedCoupon = null;
      state.appliedCouponCode = null;
      state.error = null;
      state.extraGoldOfRuppess = 0;
      state.extraGold = 0;
    },
  },
});

// ... (export statements and other code)

export const { applyCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;

