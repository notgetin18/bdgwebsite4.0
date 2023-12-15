"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeIn,
  slideIn,
  staggerContainer,
  textVariant,
} from "../../utils/motion";

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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className=""
          >
            <motion.h1
              variants={fadeIn("right", "spring", 0.2, 1)}
              className="text-2xl sm:text-4xl text-white text-center font-semibold leading-tight mb-28"
            >
              “Buy & Sell 24 karat Digital Gold” <br /> From The Comfort of Your
              Home
            </motion.h1>

            <div className="flex items-center justify-center">
              <motion.div variants={fadeIn("left", "spring", 0.2, 1)}>
                <img className="" src="/aboutbanner10.png" alt="Your Company" />
              </motion.div>
              <motion.div variants={textVariant(1.1)}>
                <img
                  className="-mt-28"
                  src="/aboutbanner20.png"
                  alt="Your Company"
                />
              </motion.div>
              <motion.div variants={fadeIn("right", "spring", 0.2, 1)}>
                <img className="" src="/aboutbanner30.png" alt="Your Company" />
              </motion.div>
            </div>
            <motion.p
              variants={fadeIn("bottom", "spring", 0.2, 1)}
              className="text-white text-center leading-6  mb-4 mt-6 text-lg"
            >
              A place where digital innovation and quality combine! We at Bright
              Digi Gold are more than simply an organisation; we're a vibrant
              group of enthusiasts with a mission to add our golden touch to the
              digital environment.
            </motion.p>
          </motion.div>
          {/* <CustomButton title="Invest now" /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
