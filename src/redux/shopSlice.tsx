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

// Helper function to calculate values based on the state
const recalculateValues = (state: ShopState) => {
    const metalPrice = state.metalPrice;
    // Calculate actual amount and GST based on conditions
    if (state.purchaseType === 'buy') {
        if (state.transactionType === 'rupees') {
            state.actualAmount = ParseFloat(((state.enteredAmount / 103) * 100), 2);
            state.gst = ParseFloat((state.enteredAmount - state.actualAmount), 2);
            state.metalQuantity = ParseFloat((state.actualAmount / metalPrice), 4);
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
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setPurchaseType: (state, action: PayloadAction<PurchaseType>) => {
            state.purchaseType = action.payload;
            recalculateValues(state);
        },
        setMetalType: (state, action: PayloadAction<MetalType>) => {
            state.metalType = action.payload;
            recalculateValues(state);
        },
        setMetalPrice: (state, action: PayloadAction<metalPrice>) => {
            state.metalPrice = action.payload;
            recalculateValues(state);
        },
        setTransactionType: (state, action: PayloadAction<TransactionType>) => {
            state.transactionType = action.payload;
            recalculateValues(state);
        },
        updateMetalPrice: (state, action: PayloadAction<metalPrice>) => {
            state.metalPrice = action.payload;
            recalculateValues(state);
        },
        setEnteredAmount: (state, action: PayloadAction<number>) => {
            state.enteredAmount = action.payload;
            recalculateValues(state);
        },
    },
});

export const {
    setPurchaseType,
    setMetalType,
    setTransactionType,
    setEnteredAmount,
    setMetalPrice,
    updateMetalPrice,
} = shopSlice.actions;

export default shopSlice.reducer;
