"use client";
import React, { useCallback, useEffect, useState } from "react";
import BuySell from "./buySell";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
// import OTPModal from "./otp";
import OfferSlider from "./offerSlider";
import { AesDecrypt } from "../helperFunctions";
import {
  setShowOTPmodal,
  setShowProfileForm,
  profileFilled,
} from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OtpModal from "../modals/otpModal";
import { useRouter } from 'next/navigation'
import SetProfileForNewUser from "../setProfile";

const HeroSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profileFilledd = useSelector((state: RootState) => state.auth.profileFilled);
  const otpModal = useSelector((state: RootState) => state.auth.otpModal);
  const showProfileForm = useSelector((state: RootState) => state.auth.showProfileForm);
  const [OpenSetUserProfile, setOpenSetUserProfile] = useState(true)

  // console.log("otpModal =-====>  ", otpModal);
  // console.log("profileFilledd =-====>  ", profileFilledd);



  useEffect(() => {
    const checkUserIsNew = async () => {
      console.log('method called');
      const token = localStorage.getItem("token");
      console.log('token', token)

      if (token) {
        const configHeaders = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await fetch(
            `${process.env.baseUrl}/auth/validate/token`,
            configHeaders
          );
          const data = await response.json();
          const decryptedData = await AesDecrypt(data.payload);
          console.log('decrypted data')
          const userdata = JSON.parse(decryptedData).data;
          console.log('decrypted data form hero section')
          console.log('userdata ------------>>>>>>>> 51', userdata)
          if (userdata.isBasicDetailsCompleted) {
            console.log('1')
            dispatch(setShowOTPmodal(false));
            dispatch(profileFilled(true));
          } else {
            console.log('2')
            dispatch(setShowProfileForm(false));
          }
        } catch (errorWhileCheckingIsUserNew) {
          console.log(
            "errorWhileCheckingIsUserNew:",
            errorWhileCheckingIsUserNew
          );
        }
      }
    };
    dispatch(setShowOTPmodal(false));
    checkUserIsNew();
  }, [dispatch]);

  useEffect(() => { }, [otpModal]);

  return (
    <div className="bg-theme py-10">
      {otpModal && <OtpModal />}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-16">
          <img
            className="h-7xl absolute -bottom-72 -left-20 opacity-20"
            src="/BDGwhite.png"
            alt="Your Company"
          />
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="hidden lg:block mt-10">
              <motion.h1
                variants={fadeIn("right", "spring", 0.2, 0.2)}
                className="text-6xl text-white font-semibold leading-tight mb-12 "
              >
                <span className="text-themeBlueLight extrabold">
                  Start Your Savings
                </span>
                <br />
                <span className="">
                  {" "}
                  With Just <span className="text-gold01 extrabold">₹</span> 10
                </span>
              </motion.h1>
              <motion.div variants={textVariant(1.1)}>
                <div className="inline-block items-center border-gold rounded-lg px-3 py-1">
                  <img
                    className="h-6 inline-block"
                    src="/goldbarbanner.png"
                    alt="Your Company"
                  />
                  <p className="text-gold01 p-1 px-3 ml-3  text-xl font-bold inline-block">
                    Best Platform to Buy & Sell 24K Digital Gold
                  </p>
                </div>

                <p className="text-white leading-8  mb-4 mt-6 text-xl pr-28">
                  We at Bright DiGi Gold invite you to embark on a journey of
                  effortless digital savings. In just a few clicks make your
                  savings grow in Digital Gold and Silver.  Your gateway to
                  hassle-free savings is here.
                </p>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-white">Trusted By</p>
                  {/* <img className="h-6 ml-4" src="/brinks.svg" alt="Your Company" /> */}
                  <img
                    className="h-14 ml-2 mt-2"
                    src="/Startup India.svg"
                    alt="Your Company"
                  />
                </div>

                <div className="flex gap-5 mt-8 relative">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.brightdigigold.customer"
                    className="cursor-pointer"
                  >
                    {/* <Lottie
                      animationData={IOS}
                      className="h-32 absolute -top-16 -left-2"
                      loop={true}
                    /> */}
                    <img
                      src="/lottie/google-play-button.png"
                      className="h-14"
                    />
                  </Link>
                  <Link
                    href="https://apps.apple.com/in/app/bright-digi-gold-buy-24k-gold/id1640972173"
                    className="cursor-pointer"
                  >
                    {/* <img className="h-10" src="/andriod.png" alt="Your Company" /> */}
                    {/* <Lottie
                      animationData={GooglePlay}
                      className="h-32 absolute -top-16 left-28"
                      loop={true}
                    /> */}
                    <img src="/lottie/app-store-button.png" className="h-14" />
                  </Link>
                </div>
              </motion.div>

              <div className="flex justify-center mt-4">
                {/* <img
                className="h-12"
                src="/Startup India.svg"
                alt="Your Company"
              /> */}
              </div>
            </div>
            {/* <CustomButton title="Invest now" /> */}
            <motion.div variants={fadeIn("bottom", "spring", 0.5, 0.5)}>
              <BuySell />
            </motion.div>
          </div>
          {showProfileForm && (
            <SetProfileForNewUser isOpen={OpenSetUserProfile} onClose={() => { setOpenSetUserProfile(!OpenSetUserProfile) }} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
