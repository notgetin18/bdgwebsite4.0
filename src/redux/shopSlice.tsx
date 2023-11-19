import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseFloat } from '@/components/helperFunctions';
import { metalPrice, MetalType, PurchaseType, ShopState, TransactionType } from '@/types';

// Define the initial state
const initialState: ShopState = {
    purchaseType: 'buy',
    metalType: 'gold',
    transactionType: 'rupees',
    enteredAmount: undefined,
    actualAmount: 0,
    gst: 0,
    metalPrice: 0,
    metalQuantity: undefined,
    totalAmount: undefined,
};

// Helper function to calculate values based on the state
const recalculateValues = (state: ShopState) => {
    const metalPrice = state.metalPrice;
    // Calculate actual amount and GST based on conditions
    let enteredAmount = state.enteredAmount ?? 0
    if (state.purchaseType === 'buy') {
        if (state.transactionType === 'rupees') {
            state.actualAmount = ParseFloat(((enteredAmount / 103) * 100), 2);
            state.gst = (+(enteredAmount - state.actualAmount).toFixed(2));
            state.metalQuantity = ParseFloat((state.actualAmount / metalPrice), 4);
            state.totalAmount = ParseFloat((state.actualAmount + state.gst), 2);
        } else if (state.transactionType === 'grams') {
            state.gst = ParseFloat((0.03 * enteredAmount * metalPrice), 2);
            state.actualAmount = ParseFloat(metalPrice * enteredAmount, 2);
            state.totalAmount = ParseFloat((state.actualAmount + state.gst), 2);
            state.metalQuantity = state.enteredAmount;
        }
    } else {
        if (state.transactionType === 'rupees') {
            state.metalQuantity = ParseFloat((enteredAmount / metalPrice), 4);
            state.gst = 0;
        } else if (state.transactionType === 'grams') {
            state.gst = 0;
            state.actualAmount = ParseFloat((metalPrice * enteredAmount), 2);
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
