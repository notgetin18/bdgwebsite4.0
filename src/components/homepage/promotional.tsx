"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  slideIn,
  staggerContainer,
  textVariant,
} from "../../utils/motion";
export default function Promotional() {
  return (
    <>
      <div className=" bg-themeBlue px-4 sm:px-6 lg:px-16 py-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className=""
        >
          <div className=" grid xl:grid-cols-2 gap-6">
            <div className="flex items-center justify-center relative">
              <motion.div variants={fadeIn("right", "spring", 0.5, 1)}>
                <img
                  className="z-10"
                  src="/Master savings Phones.png"
                  alt="Your Company"
                />
              </motion.div>
            </div>

            <div className=" flex items-center justify-end">
              <motion.div variants={textVariant(0.2)}>
                <p className="text-right text-3xl sm:text-5xl xl:text-7xl">
                  Master Your <br />
                  <span className=" extrabold text-teal-950">
                    Saving Digitally
                  </span>
                </p>

                <div className=" flex justify-end divide-x-2 divide-black gap-4 mt-6">
                  <motion.div
                    variants={fadeIn("right", "spring", 0.25, 0.25)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className="text-sm sm:text-xl font-bold mr-1 sm:mr-3">
                      Buy
                    </p>
                    <img src="/ban1.png" className="h-8 sm:h-14" />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("right", "spring", 0.5, 0.5)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className=" text-sm sm:text-xl font-bold mr-1 sm:mr-3 ml-2 sm:ml-4">
                      Sell
                    </p>
                    <img src="/ban2.png" className="h-8 sm:h-14" />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("right", "spring", 0.75, 0.75)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className="text-sm sm:text-xl font-bold mr-1 sm:mr-3 ml-2 sm:ml-4">
                      Gift
                    </p>
                    <img src="/ban3.png" className="h-8 sm:h-14" />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("right", "spring", 1, 1)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className="text-sm sm:text-xl font-bold mr-1 sm:mr-3 ml-2 sm:ml-4">
                      Delivery
                    </p>
                    <img src="/ban4.png" className="h-8 sm:h-14" />
                  </motion.div>
                </div>
                <div className=" flex justify-end divide-x-2 divide-black gap-4 mt-4">
                  <motion.div
                    variants={fadeIn("right", "spring", 1.25, 1.25)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className="text-sm sm:text-xl font-bold mr-1 sm:mr-3">
                      24k Purity
                    </p>
                    <img src="/ban1.png" className="h-8 sm:h-14" />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("right", "spring", 1.5, 1.5)}
                    className=" flex items-center hover:animate-bounce"
                  >
                    <p className="text-sm sm:text-xl font-bold mr-1 sm:mr-3 ml-2 sm:ml-4">
                      Safe Vaults
                    </p>
                    <img src="/ban2.png" className="h-8 sm:h-14" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
