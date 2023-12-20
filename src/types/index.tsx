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
  enteredAmount: number | undefined;
  actualAmount: number;
  gst: number;
  metalPrice: number,
  metalQuantity: number | undefined,
  totalAmount: number | undefined,
}

export interface UserReward {
  amount: number;
  createdAt: string;
  description: string;
  expireAt: string;
  gram: number;
  itemType: string;
  redeemAt: string;
  rewardsType: string;
  status: string;
  updatedAt: string;
  user_gifting_id: string;
  user_id: string;
  user_refer_id: string | null;
  __v: number;
  _id: string;
}

export interface GiftState {
  metalType: MetalType;
  transactionType: TransactionType;
  enteredAmount: number | undefined;
  actualAmount: number;
  metalPrice: number,
  metalQuantity: number | undefined,
  totalAmount: number | undefined,
}

export interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitVerify: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOTPChange: (otp: string) => void;
  otp: string;
  otpError: string;
  isSubmitting: boolean;
}

export interface Wallet {
  createdAt: null
  gold: number
  goldAvgPrice: number
  goldCurrentValue: number
  holdGoldGram: number
  holdSilverGram: number
  silver: number
  silverAvgPrice: number
  silverCurrentValue: number
  totalAmount: number
  updatedAt: String
  user_id: String
  _id: String
}

export interface UserState {
  data: {
    address: {
      line1: string;
      line2: string;
      pincode: number | null;
      state: string;
      city: string;
    };
    addresses: Array<{
      line1: string;
      line2: string;
      pincode: number | null;
      state: string;
      city: string;
    }>;
    bankDetails: {
      bankName: string;
      accountName: string;
      ifsc: string;
      accountNumber: string;
      upiId: string;
    };
    createdAt: string;
    dateOfBirth: string;
    email: string;
    enabled: boolean;
    gender: string;
    gst_number: string;
    isAadhaarUploaded: boolean;
    isAddressCompleted: boolean;
    isBankDetailsCompleted: boolean;
    isBasicDetailsCompleted: boolean;
    isEmailVerified: boolean;
    isKycDone: boolean;
    isMobileVerified: boolean;
    isPanUploaded: boolean;
    isUpiVerified: boolean;
    kyc: {
      panNumber: string;
      aadhaarNumber: string;
    };
    mobile_number: string;
    name: string;
    profile_image: string;
    referralCode: string;
    referredBy: string | null;
    type: string;
    updatedAt: string;
    userId: string;
    user_vaults: {
      _id: string;
      user_id: string;
      gold: number;
      silver: number;
      totalAmount: number;
    };
    verificationToken: string;
    walletAmount: number;
    __v: number;
    _id: string;
  };
}