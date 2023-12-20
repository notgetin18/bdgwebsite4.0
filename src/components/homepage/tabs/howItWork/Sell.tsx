import React, { FC, Fragment } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../../utils/motion";
import animationData from "../../../../../public/lottie/line.json";
import Lottie from "lottie-react";
const SellTab: FC<{}> = () => {
  return (
    <Fragment>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        {/* <p className="text-center text-xl text-white mt-4">It is easy!</p> */}
        <div className="grid grid-cols-1 gap-6  sm:grid-cols-3 mt-8 mont-font relative">
          {/* <img src="/line.gif" alt="gold price in india" className="abs-001" /> */}
          <motion.div
            variants={fadeIn("right", "spring", 0.25, 0.25)}
            className="hidden sm:block absolute top-72 sm:top-14 left-[-6%] sm:left-28 md:left-36 lg:left-44 xl:left-56 w-4/6"
          >
            {/* <Lottie
              animationData={animationData}
              className="sm:h-12"
              loop={false}
            /> */}
            <img
              src="/line.png"
              alt="gold price in india"
              className="h-12 rotate-90 sm:rotate-0 min-w-[440px] sm:min-w-full sm:w-full hidden"
            />
          </motion.div>
          {/* <motion.div
            variants={fadeIn("right", "spring", 0.75, 0.75)}
            className=" top-14 right-44 absolute"
          >
            <Lottie
              animationData={animationData}
              className="sm:h-12"
              loop={false}
            />
          </motion.div> */}
          <motion.div variants={fadeIn("right", "spring", 0.2, 0.25)}>
            <p className="text-dark-blue text-md font-bold text-center my-2">
              Step 1
            </p>
            <div className="mx-auto flex justify-center">
              <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
                <img src="/sell01.png" alt="sell digital gold online"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Enter Value
            </p>
            <p className="text-center text-sm my-2">
              Click on Sell, Enter value in Rs./Grams
            </p>
          </motion.div>

          <motion.div variants={fadeIn("right", "spring", 0.5, 1.25)}>
            <p className="text-dark-blue text-md font-bold text-center my-2">
              Step 2
            </p>
            <div className="mx-auto flex justify-center">
              <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
                <img src="/sell02.png" alt="24k gold price in india"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Bank Details
            </p>
            <p className="text-center text-sm my-2">
              Enter Your Correct Bank details.
            </p>
          </motion.div>

          <motion.div variants={fadeIn("right", "spring", 0.75, 1.25)}>
            <p className="text-dark-blue text-md font-bold text-center my-2">
              Step 3
            </p>
            <div className="mx-auto flex justify-center">
              <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
                <img src="/sell03.png" alt="24k gold price"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Bank Account Credited
            </p>
            <p className="text-center text-sm my-2">
              Woohoo! Amount successfully credit in your Bank Account.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
};
export default SellTab;
