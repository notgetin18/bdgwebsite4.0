import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type MetalType = "gold" | "silver";
export type PurchaseType = "buy" | "sell";
export type TransactionType = "gram" | "rupees";
export type AppliedCoupon = true | false;

type TippyType = {
  title: string;
  value: any;
};

// declaring the types for our state
interface InitialState {
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
  metal: MetalType | string;
  purchaseType: PurchaseType | string;
  amount: number;
  transactionType: TransactionType | string;
  displayText: string;
  amountWithoutTax: number;
  AppliedCoupon: boolean;
  CouponCode: string;
  gst: number;
  discount: number;
  promotionalgold: number;
  AfterDiscountValue: number;
  amountWithGst: number;
  tippyText: Array<TippyType>;
}

const initialState: InitialState = {
  gold: {
    isLoading: false,
    title: "Live  Price",
    price: 0,
    increment: true,
    percentage: 0.0,
    btn: "View Trends",
    sellPrice: 0,
    mcxPrice: 0,
  },
  silver: {
    isLoading: false,
    title: "Live  Price",
    price: 0,
    increment: true,
    percentage: 0.0,
    btn: "View Trends",
    sellPrice: 0,
    mcxPrice: 0,
  },
  metal: "gold",
  purchaseType: "buy",
  amount: 0,
  transactionType: "rupees",
  displayText: "0 gm",
  amountWithoutTax: 0,
  AppliedCoupon: false,
  CouponCode: "WELCOME_OFFER",
  gst: 0,
  discount: 0,
  promotionalgold: 0,
  AfterDiscountValue: 0,
  amountWithGst: 0,
  tippyText: [],
};

export const manager = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setGoldPriceForShop: (
      state,
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
    setSilverPriceForShop: (
      state,
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
    setMetalForShop: (state, action: PayloadAction<MetalType | string>) => {
      state.metal = action.payload;
    },
    setPurchaseTypeForShop: (
      state,
      action: PayloadAction<PurchaseType | string>
    ) => {
      state.purchaseType = action.payload;
    },
    setCoupanApplied: (state, action: PayloadAction<boolean>) => {
      state.AppliedCoupon = action.payload;
    },
    setCouponCode: (state, action: PayloadAction<string>) => {
      state.CouponCode = action.payload;
    },
    setAmountForShop: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      const amount = action.payload;

      function ParseFloat(str: any, val: any) {
        str = str.toString();
        if (Number.isInteger(Number(str))) {
          return Number(str);
        } else {
          str = str.slice(0, str.indexOf(".") + val + 1);
        }
        return Number(str);
      }
    },
  },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setMetalForShop,
  setGoldPriceForShop,
  setSilverPriceForShop,
  setAmountForShop,
  setPurchaseTypeForShop,
  //   setTransactionTypeForShop,
  setCoupanApplied,
  //   setDisplayText,
  setCouponCode,
} = manager.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getMetalTypeShop = (state: RootState) => state.shop.metal;
export const getAmount = (state: RootState) => state.shop.amount;
export const getTippy = (state: RootState) => state.shop.tippyText;
export const getDisplayText = (state: RootState) => state.shop.displayText;
export const getAmountWithouTax = (state: RootState) =>
  state.shop.amountWithoutTax;
export const getGstForShop = (state: RootState) => state.shop.gst;
export const getTotalAmountForshop = (state: RootState) =>
  state.shop.amountWithGst;
export const getTransactionTypeForShop = (state: RootState) =>
  state.shop.transactionType;
export const getAppliedCoupon = (state: RootState) => state.shop.AppliedCoupon;
export const getCouponCode = (state: RootState) => state.shop.CouponCode;
export const getDiscountForUser = (state: RootState) => state.shop.discount;
export const getPromotionalGold = (state: RootState) =>
  state.shop.promotionalgold;
export const getValueAfterDiscountForUser = (state: RootState) =>
  state.shop.AfterDiscountValue;

// exporting the reducer here, as we need to add this to the store
export default manager.reducer;
