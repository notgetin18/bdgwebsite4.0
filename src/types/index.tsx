import { MouseEventHandler } from "react";

export interface customButtonProps {
  title: string;
  containerStyles?: String;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface GoldData {
  mcx: number;
  parity: number;
  percentage: number;
  saleParity: number;
  salePrice: number;
  totalPrice: number;
  up: boolean;
}

export interface SilverData {
  mcx: number;
  parity: number;
  percentage: number;
  saleParity: number;
  salePrice: number;
  totalPrice: number;
  up: boolean;
}

export interface Coupon {
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

export interface CouponState {
  selectedCoupon: Coupon | null;
  appliedCouponCode: string | null;
  error: string | null;
  extraGoldOfRuppess: number;
  extraGold: number;
  coupons: Coupon[]; // Array to store available coupons
}

export type MetalType = 'gold' | 'silver';
export type PurchaseType = 'buy' | 'sell';
export type TransactionType = 'grams' | 'rupees';
export type metalPrice = number;
export interface ShopState {
  purchaseType: PurchaseType;
  metalType: MetalType;
  transactionType: TransactionType;
  enteredAmount: number;
  actualAmount: number;
  gst: number;
  metalPrice: number,
  metalQuantity: number
}