import React from "react";
import BuySell from "./buySell";
import CustomButton from "../customButton";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>HeroSection elements</div>
      <CustomButton title="Invest now" />
      <div>
        <BuySell />
      </div>
    </div>
  );
};

export default HeroSection;
