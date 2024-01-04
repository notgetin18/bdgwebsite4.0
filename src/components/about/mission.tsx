"use client";
import React from "react";
import Lottie from "lottie-react";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";

const Mission = () => {
  return (
    <div className="bg-theme py-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-16 relative">
          <img
            className="h-800 absolute top-32 -left-20 opacity-20"
            src="/BDGwhite.png"
            alt="Your Company"
          />
          <div className="grid sm:grid-cols-2 gap-4 place-items-center">
            <h1 className="col-span-2 text-5xl text-gold01 text-center extrabold leading-tight mb-0 sm:mb-6">
              Our Vision
            </h1>
            <p className="col-span-2 sm:col-span-1 text-white text-left leading-8  mb-4 mt-6 text-2xl">
              At Bright Digi Gold, we pioneer innovative solutions in the
              digital space, transforming your savings management. Our
              commitment to transparency and accountability ensures a secure,
              enhanced financial experience. Specializing in digital gold and
              silver services, we empower customers to achieve financial goals
              conveniently from home.
            </p>
            <motion.div
              variants={fadeIn("right", "spring", 1.25, 1.25)}
              className=" col-span-2 sm:col-span-1 rounded-2xl bg-themeBlue"
            >
              <img src="/lottie/Vision.gif" className="mx-auto h-72" />
            </motion.div>
            <h1 className="col-span-2 text-5xl text-gold01 text-center extrabold leading-tight mb-0 sm:mb-6">
              Our Mission
            </h1>
            <motion.div
              variants={fadeIn("left", "spring", 1.25, 1.25)}
              className="col-span-2 sm:col-span-1 rounded-2xl bg-themeBlue"
            >
              <img src="/lottie/Vision.gif" className="mx-auto h-72" />
            </motion.div>
            <p className="col-span-2 sm:col-span-1 text-white text-left leading-8  mb-4 mt-6 text-2xl">
              Bright Digi Gold envisions leadership in digital gold trade,
              aiming for a flawless system that offers reliable investment
              solutions. Our vision includes becoming a trusted, transparent,
              and secure brand, making gold savings accessible to diverse
              portfolios. We prioritize strong customer relationships, embodying
              friendliness, approachability, and dedication to providing
              valuable products and services.
            </p>
          </div>
          {/* <CustomButton title="Invest now" /> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Mission;
