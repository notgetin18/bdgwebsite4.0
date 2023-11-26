"use client";
import React, { useCallback, useEffect } from "react";
import BuySell from "./buySell";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-theme py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <img
          className="h-7xl absolute bottom-0 -left-20"
          src="/BDGwhite.png"
          alt="Your Company"
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="hidden lg:block">
            <h1 className="text-5xl text-white font-semibold leading-tight mb-12 extrabold">
              Start Your Saving
              <br /> With Just <span className="text-gold01">₹</span> 10
            </h1>
            <div className="flex items-center">
              <img className="h-12" src="/gold-bars.svg" alt="Your Company" />
              <p className="text-gold01 p-1 px-3 ml-3 border-gold rounded-lg text-sm font-bold">
                Best Platform to Buy & Sell 24K Digital Gold
              </p>
            </div>

            <p className="text-white leading-6  mb-4 mt-6 text-sm">
              In Just A Few Clicks Make Your Savings Grow in Digital Gold and
              Silver.
            </p>
            <div className="flex items-center">
              <p className="text-lg font-bold text-white">Trusted By</p>
              {/* <img className="h-6 ml-4" src="/brinks.svg" alt="Your Company" /> */}
              <img
                className="h-8 ml-6 mt-2"
                src="/Startup India.svg"
                alt="Your Company"
              />
            </div>

            <div className="flex gap-4 mt-10">
              <Link href="" className="cursor-pointer">
                <img className="h-10" src="/app-store.png" alt="Your Company" />
              </Link>
              <Link href="" className="cursor-pointer">
                <img className="h-10" src="/andriod.png" alt="Your Company" />
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              {/* <img
                className="h-12"
                src="/Startup India.svg"
                alt="Your Company"
              /> */}
            </div>
          </div>
          {/* <CustomButton title="Invest now" /> */}
          <div>
            <BuySell />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
