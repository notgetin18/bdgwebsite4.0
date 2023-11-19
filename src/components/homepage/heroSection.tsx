'use client'
import React, { useCallback, useEffect } from "react";
import BuySell from "./buySell";


const HeroSection = () => {


  return (
    <div className="bg-theme py-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-5xl text-white font-semibold leading-tight mb-12 extrabold">
              Invest Your Savings
              <br /> Just a click away
            </h1>
            <div className="flex items-center">
              {/* <img
                className="h-12"
                src={new URL(
                  "../../../public/gold-bars.svg",
                  import.meta.url
                ).toString()}
                alt="Your Company"
              /> */}
              <p className="text-gold p-1 px-3 ml-3 border-gold rounded-lg text-sm font-bold">
                Invest or sell 24 karat Gold from the comfort of your home.
              </p>
            </div>

            <p className="text-white leading-6  mb-4 mt-6 text-sm">
              We at Bright DiGi Gold encourage users to participate in seamless
              Gold/Silver transactions through Digital Buying and Selling, with
              a minimum transaction value of Rs.10/-. The aim is to promote
              hassle-free Gold/Silver transactions.
            </p>
            <div className="flex items-center">
              <p className="text-xl font-bold text-white">Secured with</p>
              <img className="h-6 ml-4" src="/brinks.svg" alt="Your Company" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <img className="h-28" src="/playstore.svg" alt="Your Company" />

              <img className="h-28" src="/appstore.svg" alt="Your Company" />
            </div>
            <div className="flex justify-center mt-4">
              <img
                className="h-12"
                src="/Startup India.svg"
                alt="Your Company"
              />
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
