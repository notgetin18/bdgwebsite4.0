import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MetalType = 'gold' | 'silver';
export type PurchaseType = 'buy' | 'sell';
export type TransactionType = 'grams' | 'rupees';
export type AppliedCoupon = boolean;
export type AppliedCouponCode = string;
export type metalPrice = number;


// Define the initial state
interface ShopState {
    purchaseType: PurchaseType;
    metalType: MetalType;
    transactionType: TransactionType;
    appliedCoupon: AppliedCoupon;
    enteredAmount: number;
    actualAmount: number;
    gst: number;
    extraGold: number;
    metalPrice: number,
    couponCode: string;
    totalGold: number;
}

const initialState: ShopState = {
    purchaseType: 'buy',
    metalType: 'gold',
    transactionType: 'rupees',
    appliedCoupon: false,
    enteredAmount: 0,
    actualAmount: 0,
    gst: 0,
    extraGold: 0,
    couponCode: 'BDG499',
    metalPrice: 8000,
    totalGold: 3
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setPurchaseType: (state, action: PayloadAction<PurchaseType>) => {
            state.purchaseType = action.payload;
        },
        setMetalType: (state, action: PayloadAction<MetalType>) => {
            state.metalType = action.payload;
        },
        setMetalPrice: (state, action: PayloadAction<metalPrice>) => {
            state.metalPrice = action.payload;
        },
        setTransactionType: (state, action: PayloadAction<TransactionType>) => {
            state.transactionType = action.payload;
        },
        setAppliedCoupon: (state, action: PayloadAction<AppliedCoupon>) => {
            state.appliedCoupon = action.payload;
        },
        setAppliedCouponCode: (state, action: PayloadAction<AppliedCouponCode>) => {
            state.couponCode = action.payload;
        },
        setEnteredAmount: (state, action: PayloadAction<number>) => {
            state.enteredAmount = action.payload;

            // Calculate actual amount and GST based on conditions
            if (state.purchaseType === 'buy' && state.metalType === 'gold') {
                if (state.transactionType === 'rupees') {
                    state.actualAmount = (state.enteredAmount / 103) * 100;
                    state.gst = state.enteredAmount - state.actualAmount;
                } else if (state.transactionType === 'grams') {
                    state.gst = state.metalPrice * 0.03 * state.enteredAmount;
                    state.actualAmount = state.metalPrice * 0.03 * state.enteredAmount + state.gst;
                }

                // Apply extra gold for the coupons
                if (state.appliedCoupon) {
                    if (state.couponCode === 'BDG499') {
                        state.extraGold = Math.min(0.015 * state.enteredAmount, 50);
                    } else if (state.couponCode === 'BDG899') {
                        state.extraGold = Math.min(0.015 * state.enteredAmount, 100);
                    } else {
                        // Handle other coupon codes here
                    }

                    // Calculate total gold (including extra gold)
                    state.totalGold = state.actualAmount / state.metalPrice + state.extraGold;
                }
            }
        },
    },
});

export const {
    setPurchaseType,
    setMetalType,
    setTransactionType,
    setAppliedCoupon,
    setEnteredAmount,
    setAppliedCouponCode,
    setMetalPrice,
} = shopSlice.actions;

export default shopSlice.reducer;
