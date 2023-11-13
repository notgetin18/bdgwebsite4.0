import { metalPrice } from '@/api/DashboardServices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseFloat } from '@/components/helperFunctions';

export type MetalType = 'gold' | 'silver';
export type PurchaseType = 'buy' | 'sell';
export type TransactionType = 'grams' | 'rupees';
// export type AppliedCoupon = boolean;
// export type AppliedCouponCode = string;
export type metalPrice = number;


// Define the initial state
interface ShopState {
    purchaseType: PurchaseType;
    metalType: MetalType;
    transactionType: TransactionType;
    // appliedCoupon: AppliedCoupon;
    enteredAmount: number;
    actualAmount: number;
    gst: number;
    // extraGold: number;
    metalPrice: number,
    couponCode: string;
    totalGold: number;
    metalQuantity: number
}

const initialState: ShopState = {
    purchaseType: 'buy',
    metalType: 'gold',
    transactionType: 'rupees',
    // appliedCoupon: false,
    enteredAmount: 0,
    actualAmount: 0,
    gst: 0,
    // extraGold: 0,
    couponCode: 'BDG499',
    metalPrice: 8000,
    totalGold: 3,
    metalQuantity: 12345
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
        // setAppliedCoupon: (state, action: PayloadAction<AppliedCoupon>) => {
        //     state.appliedCoupon = action.payload;
        // },
        // setAppliedCouponCode: (state, action: PayloadAction<AppliedCouponCode>) => {
        //     state.couponCode = action.payload;
        // },
        setEnteredAmount: (state, action: PayloadAction<number>) => {
            state.enteredAmount = action.payload;

            // Calculate actual amount and GST based on conditions
            if (state.purchaseType === 'buy') {
                if (state.transactionType === 'rupees') {
                    state.actualAmount = ParseFloat(((state.enteredAmount / 103) * 100), 2);
                    state.gst = ParseFloat((state.enteredAmount - state.actualAmount), 2);
                    state.metalQuantity = ParseFloat((state.actualAmount / state.metalPrice), 4);
                } else if (state.transactionType === 'grams') {
                    state.gst = ParseFloat((state.metalPrice * 0.03 * state.enteredAmount), 2);
                    state.actualAmount = state.metalPrice * state.enteredAmount + state.gst;
                }





                // Apply extra gold for the coupons
                // if (state.appliedCoupon) {
                //     if (state.couponCode === 'BDG499') {
                //         state.extraGold = Math.min(0.015 * state.enteredAmount, 50);
                //     } else if (state.couponCode === 'BDG899') {
                //         state.extraGold = Math.min(0.015 * state.enteredAmount, 100);
                //     } else {
                //         // Handle other coupon codes here
                //     }

                //     // Calculate total gold (including extra gold)
                //     state.totalGold = state.actualAmount / state.metalPrice + state.extraGold;
                // }
            } else {
                if (state.transactionType === 'rupees') {
                    state.metalQuantity = ParseFloat((state.enteredAmount / state.metalPrice), 4);
                    state.gst = 0;
                } else if (state.transactionType === 'grams') {
                    state.gst = 0;
                    state.actualAmount = ParseFloat((state.metalPrice * state.enteredAmount), 2);
                }

            }
        },
    },
});


export const {
    setPurchaseType,
    setMetalType,
    setTransactionType,
    // setAppliedCoupon,
    setEnteredAmount,
    // setAppliedCouponCode,
    setMetalPrice,
} = shopSlice.actions;

export default shopSlice.reducer;
