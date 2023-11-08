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

