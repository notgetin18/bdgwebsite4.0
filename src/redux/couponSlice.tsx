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
}

interface CouponState {
  selectedCoupon: Coupon | null;
  appliedCouponCode: string | null;
  error: string | null;
  extraGoldOfRuppess: number;
  extraGold: number;
  coupons: Coupon[]; // Array to store available coupons
}


const initialCoupons: Coupon[] = [
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
];

const initialState: CouponState = {
  selectedCoupon: null,
  appliedCouponCode: null,
  error: null,
  extraGoldOfRuppess: 0,
  coupons: initialCoupons,
  extraGold: 0,
};


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
      if (transactionType === 'rupees' && amount < coupon.minimum) {
        state.error = `This Coupon is not applicable for amount less than Rs ${coupon.minimum}`;
        state.selectedCoupon = null;
        state.appliedCouponCode = null;
        state.extraGoldOfRuppess = 0;
        state.extraGold = 0;
      } else if (transactionType === 'grams' && ParseFloat(amount * goldPrice, 4) < coupon.minimum) {
        state.error = `This Coupon is not applicable for amount less than Rs ${coupon.minimum}`;
        state.selectedCoupon = null;
        state.appliedCouponCode = null;
        state.extraGoldOfRuppess = 0;
        state.extraGold = 0;
      }
      else {

        if (transactionType === 'rupees' && metalType === 'gold') {
          // Calculate extra gold based on coupon percentage and maximum value
          const extraGoldOfRuppess = (amount * coupon.percentage) / 100;
          state.extraGoldOfRuppess = Math.min(extraGoldOfRuppess, coupon.maximum);
          const extraGold = ParseFloat(extraGoldOfRuppess / goldPrice, 4);
          state.extraGold = extraGold
        } else if (transactionType === 'grams' && metalType === 'gold') {
          const gst = ParseFloat((goldPrice * 0.03 * amount), 2);
          const actualAmount = ParseFloat(goldPrice * amount + gst, 2);
          const extraGoldOfRuppess = (actualAmount * coupon.percentage) / 100;
          state.extraGoldOfRuppess = Math.min(extraGoldOfRuppess, coupon.maximum);
          const extraGold = ParseFloat(extraGoldOfRuppess / goldPrice, 4);
          state.extraGold = extraGold
        }

        state.selectedCoupon = coupon;
        state.appliedCouponCode = coupon.code; // Store applied coupon code
        state.error = null;
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


export const { applyCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;

