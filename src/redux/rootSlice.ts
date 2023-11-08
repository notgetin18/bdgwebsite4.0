import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type MetalType = "gold" | "silver";
export type purchaseType = "buy" | "sell";
// declaring the types for our state
interface InitialState {
  metal: MetalType | string;
  gold: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean;
    percentage: number;
    btn: string;
    sellPrice: number;
    mcxPrice: string | number;
  };
  silver: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean;
    percentage: number;
    btn: string;
    sellPrice: number;
    mcxPrice: string | number;
  };
  currentInvestment: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean | string;
    percentage: number;
    btn: string;
  };
  vault: {
    isLoading: boolean;
    amount: string | number;
  };
  wallet: {
    isLoading: boolean;
    amount: string | number;
  };
  totalVault: {
    gold: number;
    silver: number;
  };
  purchaseType: purchaseType | string;
  pageLoader: boolean;
  loaderData: string;
}

const initialState: InitialState = {
  metal: "gold",
  gold: {
    isLoading: false,
    title: "Live Gold Price",
    price: 1002.3,
    increment: true,
    percentage: 0.0,
    btn: "View Trends",
    sellPrice: 900.2,
    mcxPrice: 921.2,
  },
  silver: {
    isLoading: false,
    title: "Live Silver Price",
    price: 259.5,
    increment: true,
    percentage: 0.0,
    btn: "View Trends",
    sellPrice: 900.2,
    mcxPrice: 921.2,
  },
  currentInvestment: {
    isLoading: false,
    title: "Current Investment",
    price: 50000,
    increment: true,
    percentage: 2.81,
    btn: "Withdraw",
  },
  vault: {
    isLoading: false,
    amount: 0,
  },
  wallet: {
    isLoading: false,
    amount: 0,
  },
  totalVault: {
    gold: 0,
    silver: 0,
  },
  purchaseType: "buy",
  pageLoader: false,
  loaderData: "This may take a few seconds, please do not close this page.",
};

export const manager = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMetal: (state: any, action: PayloadAction<MetalType | string>) => {
      state.metal = action.payload;
    },
    setGoldPrice: (
      state: any,
      action: PayloadAction<{
        isLoading: false;
        title: string;
        price: number;
        increment: boolean;
        percentage: number;
        btn: string;
        sellPrice: number;
        mcxPrice: string | number;
      }>
    ) => {
      state.gold = { ...state.gold, ...action.payload };
    },
    setSilverPrice: (
      state: any,
      action: PayloadAction<{
        isLoading: false;
        title: string;
        price: number;
        increment: boolean;
        percentage: number;
        btn: string;
        sellPrice: number;
        mcxPrice: string | number;
      }>
    ) => {
      state.silver = { ...state.silver, ...action.payload };
    },
    setCurrentInvestment: (
      state: any,
      action: PayloadAction<{
        isLoading: boolean;
        title: string;
        price: number;
        increment: boolean | string;
        percentage: number;
        btn: string;
      }>
    ) => {
      state.currentInvestment = {
        ...state.currentInvestment,
        ...action.payload,
      };
    },
    setVault: (
      state: any,
      action: PayloadAction<{
        isLoading: boolean;
        amount: string | number;
      }>
    ) => {
      state.vault = { ...state.vault, ...action.payload };
    },
    setWallet: (
      state: any,
      action: PayloadAction<{
        isLoading: boolean;
        amount: string | number;
      }>
    ) => {
      state.wallet = { ...state.wallet, ...action.payload };
    },
    setPurchaseType: (
      state: any,
      action: PayloadAction<purchaseType | string>
    ) => {
      state.purchaseType = action.payload;
    },
    setPageLoader: (state: any, action: PayloadAction<boolean>) => {
      state.pageLoader = action.payload;
    },
    setPageLoaderMessage: (state: any, action: PayloadAction<string>) => {
      state.loaderData = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setMetal,
  setGoldPrice,
  setSilverPrice,
  setCurrentInvestment,
  setVault,
  setWallet,
  setPurchaseType,
  setPageLoader,
  setPageLoaderMessage,
} = manager.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getMetalType = (state: RootState) => state.main.metal;
export const getGold = (state: RootState) => state.main.gold;
export const getSilver = (state: RootState) => state.main.silver;
export const getCurrentInvestment = (state: RootState) =>  state.main.currentInvestment;
export const getVault = (state: RootState) => state.main.vault;
export const getWallet = (state: RootState) => state.main.wallet;
export const getPurchaseType = (state: RootState) => state.main.purchaseType;
export const getPageLoader = (state: RootState) => state.main.pageLoader;
export const getGoldVault = (state: RootState) => state.main.totalVault;
export const getPageLoaderMessage = (state: RootState) => state.main.loaderData;
// exporting the reducer here, as we need to add this to the store
export default manager.reducer;
