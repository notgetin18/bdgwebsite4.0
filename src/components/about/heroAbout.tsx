"use client";
import React from "react";
import Link from "next/link";

const HeroAbout = () => {
  return (
    <div className="bg-theme py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <img
          className="h-800 absolute top-48 -left-20"
          src="/BDGwhite.png"
          alt="Your Company"
        />
        <div className="grid gap-4">
          <div className="">
            <h1 className="text-4xl text-white text-center font-semibold leading-tight mb-12">
              “Buy & Sell 24 karat Digital Gold” <br /> From The Comfort of Your
              Home
            </h1>
            <div className="flex items-center justify-center">
              <img className="" src="/aboutbanner.png" alt="Your Company" />
            </div>

            <p className="text-white text-center leading-6  mb-4 mt-6 text-lg">
              A place where digital innovation and quality combine! We at Bright
              Digi Gold are more than simply an organisation; we're a vibrant
              group of enthusiasts with a mission to add our golden touch to the
              digital environment.
            </p>
          </div>
          {/* <CustomButton title="Invest now" /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
