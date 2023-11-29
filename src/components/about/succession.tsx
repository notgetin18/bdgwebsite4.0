"use client";
import React from "react";
import goldBarData from "../../../public/lottie/GoldBricks.json";
import Lottie from "lottie-react";

const Succession = () => {
  return (
    <div className="bg-theme py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 relative">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="col-span-2 text-4xl text-gold01 text-center font-semibold leading-tight mb-12">
            Succession Of Gold <br />
            Over The Years
          </h1>
          <p className="text-white text-center leading-6  mb-4 mt-6 text-lg">
            We all know that Gold has proven to be a stable Investment, and it
            has shown great consistency and growth in value. While there have
            been fluctuations in Gold prices, its long-term trend has always
            been upwards.
            <br />
            <br />
            With Bright DiGi Gold, Invest your Savings in Digital Gold has been
            considered as a bright and smart saving choice for those looking to
            diversify their investment portfolio and protect their wealth.
          </p>
          <div className=" relative">
            <Lottie
              animationData={goldBarData}
              className="h-72 absolute right-40"
              loop={true}
            />
          </div>
        </div>
        {/* <CustomButton title="Invest now" /> */}
      </div>
    </div>
  );
};

export default Succession;
