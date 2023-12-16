"use client";
import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";
import {
  fadeIn,
  slideIn,
  staggerContainer,
  textVariant,
} from "../../utils/motion";

const Ecom = () => {
  return (
    <div className="bg-themeYellow">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <motion.div
          // variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="grid sm:grid-cols-2 gap-6 place-items-center"
        >
          <motion.div variants={fadeIn("right", "spring", 0.2, 1)} className="">
            <img alt="products" className="h-40 mx-auto" src="/goldcoin.png" />
          </motion.div>
          <div>
            <motion.h1
              variants={textVariant(1.1)}
              className=" text-right font-bold text-3xl text-gray-700"
            >
              Buy Gold and Silver <br />
              Coins
            </motion.h1>
            <Link
              href="#"
              className="text-black text-sm px-6 py-3 rounded-md float-right mt-4 sm:mt-8 bg-yellow-400"
            >
              Place Order
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecom;
