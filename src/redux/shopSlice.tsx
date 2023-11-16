// import { metalPrice } from '@/api/DashboardServices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseFloat } from '@/components/helperFunctions';
import { metalPrice, MetalType, PurchaseType, ShopState, TransactionType } from '@/types';

// Define the initial state
const initialState: ShopState = {
    purchaseType: 'buy',
    metalType: 'gold',
    transactionType: 'rupees',
    enteredAmount: 0,
    actualAmount: 0,
    gst: 0,
    metalPrice: 0,
    metalQuantity: 0,
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

        setEnteredAmount: (state, action: PayloadAction<number>) => {
            state.enteredAmount = action.payload;
            const metalPrice = state.metalPrice
            // Calculate actual amount and GST based on conditions
            if (state.purchaseType === 'buy') {
                if (state.transactionType === 'rupees') {
                    state.actualAmount = ParseFloat(((state.enteredAmount / 103) * 100), 8);
                    state.gst = ParseFloat((state.enteredAmount - state.actualAmount), 8);
                    state.metalQuantity = ParseFloat((state.actualAmount / metalPrice), 8);
                } else if (state.transactionType === 'grams') {
                    state.gst = ParseFloat((metalPrice * 0.03 * state.enteredAmount), 2);
                    state.actualAmount = metalPrice * state.enteredAmount + state.gst;
                    state.metalQuantity = state.enteredAmount;
                }
            } else {
                if (state.transactionType === 'rupees') {
                    state.metalQuantity = ParseFloat((state.enteredAmount / metalPrice), 4);
                    state.gst = 0;
                } else if (state.transactionType === 'grams') {
                    state.gst = 0;
                    state.actualAmount = ParseFloat((metalPrice * state.enteredAmount), 2);
                }

            }
        },
    },
});


export const {
    setPurchaseType,
    setMetalType,
    setTransactionType,
    setEnteredAmount,
    setMetalPrice,
} = shopSlice.actions;

export default shopSlice.reducer;
