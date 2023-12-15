import React, { FC, Fragment } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../../utils/motion";
import animationData from "../../../../../public/lottie/line.json";
import Lottie from "lottie-react";
const GiftTab: FC<{}> = () => {
  return (
    <Fragment>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        {/* <p className="text-center text-xl text-white mt-4">It is easy!</p> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8 mont-font relative">
          {/* <img
          src="https://imagesbdg.sgp1.digitaloceanspaces.com/cf340772-ef49-4333-bd48-0f380674d17d"
          alt="gold price in india"
          className="abs-001"
        /> */}
          <motion.div
            variants={fadeIn("right", "spring", 0.25, 0.25)}
            className=" absolute top-14 left-44"
          >
            {/* <Lottie
              animationData={animationData}
              className="sm:h-12"
              loop={false}
            /> */}
            <img src="/line.png" alt="gold price in india" className="h-12" />
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
                <img src="/gift01.png" alt="sell digital gold online"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Enter Value
            </p>
            <p className="text-center text-sm my-2">
              Enter the amount you wish to purchase in Rs./Grams.
            </p>
          </motion.div>

          <motion.div variants={fadeIn("right", "spring", 0.5, 1.25)}>
            <p className="text-dark-blue text-md font-bold text-center my-2">
              Step 2
            </p>
            <div className="mx-auto flex justify-center">
              <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
                <img src="/gift02.png" alt="24k gold price in india"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Bank Details
            </p>
            <p className="text-center text-sm my-2">
              Choose a payment method as per preference.
            </p>
          </motion.div>

          <motion.div variants={fadeIn("right", "spring", 0.75, 1.25)}>
            <p className="text-dark-blue text-md font-bold text-center my-2">
              Step 3
            </p>
            <div className="mx-auto flex justify-center">
              <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
                <img src="/gift03.png" alt="24k gold price"></img>
              </div>
            </div>
            <p className="text-center font-extrabold text-lg my-2">
              Bank Account Credited
            </p>
            <p className="text-center text-sm my-2">
              Voila! Gold is added securely in the Bright DiGi Gold Vault.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
};
export default GiftTab;
