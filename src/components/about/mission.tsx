"use client";
import React from "react";
import Lottie from "lottie-react";
import vision from "../../../public/lottie/vision.json";
import mission from "../../../public/lottie/mission.json";
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
            className="h-800 absolute top-32 -left-20 opacity-40"
            src="/BDGwhite.png"
            alt="Your Company"
          />
          <div className="grid sm:grid-cols-2 gap-4 place-items-center">
            <h1 className="col-span-2 text-4xl text-gold01 text-center font-semibold leading-tight mb-0 sm:mb-12">
              Our Vision
            </h1>
            <p className="col-span-2 sm:col-span-1 text-white text-center leading-6  mb-4 mt-6 text-lg">
              At Bright Digi Gold, we pioneer innovative solutions in the
              digital space, transforming your savings management. Our
              commitment to transparency and accountability ensures a secure,
              enhanced financial experience. Specializing in digital gold and
              silver services, we empower customers to achieve financial goals
              conveniently from home.
            </p>
            <motion.div
              variants={fadeIn("right", "spring", 1.25, 1.25)}
              className=" col-span-2 sm:col-span-1"
            >
              {/* <Lottie
                animationData={mission}
                className="h-60 left-1/3 -top-10 absolute"
                loop={true}
              /> */}
              <img src="/lottie/Vision.gif" className=" mx-auto" />
            </motion.div>
            <h1 className="col-span-2 text-4xl text-gold01 text-center font-semibold leading-tight mb-0 sm:mb-12">
              Our Mission
            </h1>
            <motion.div
              variants={fadeIn("left", "spring", 1.25, 1.25)}
              className="col-span-2 sm:col-span-1"
            >
              {/* <Lottie
                animationData={mission}
                className="h-60 left-1/3 -top-6 absolute"
                loop={true}
              /> */}
              <img src="/lottie/Mission.gif" className="h-28 mx-auto" />
            </motion.div>
            <p className="col-span-2 sm:col-span-1 text-white text-center leading-6  mb-4 mt-6 text-lg">
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
