"use client";
import React from "react";

const Mission = () => {
  return (
    <div className="bg-theme py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 relative">
        <img
          className="h-800 absolute top-32 -left-20"
          src="/BDGwhite.png"
          alt="Your Company"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <h1 className="col-span-2 text-4xl text-gold01 text-center font-semibold leading-tight mb-0 sm:mb-12">
            Our Vision
          </h1>
          <p className="col-span-2 sm:col-span-1 text-white text-center leading-6  mb-4 mt-6 text-lg">
            At Bright Digi Gold, we pioneer innovative solutions in the digital
            space, transforming your savings management. Our commitment to
            transparency and accountability ensures a secure, enhanced financial
            experience. Specializing in digital gold and silver services, we
            empower customers to achieve financial goals conveniently from home.
          </p>

          <h1 className="col-span-2 text-4xl text-gold01 text-center font-semibold leading-tight mb-0 sm:mb-12 mt-10">
            Our Mission
          </h1>
          <p></p>
          <p className="col-span-2 sm:col-span-1 text-white text-center leading-6  mb-4 mt-6 text-lg">
            Bright Digi Gold envisions leadership in digital gold trade, aiming
            for a flawless system that offers reliable investment solutions. Our
            vision includes becoming a trusted, transparent, and secure brand,
            making gold savings accessible to diverse portfolios. We prioritize
            strong customer relationships, embodying friendliness,
            approachability, and dedication to providing valuable products and
            services.
          </p>
        </div>
        {/* <CustomButton title="Invest now" /> */}
      </div>
    </div>
  );
};

export default Mission;
