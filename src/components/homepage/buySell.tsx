"use client";
import { ArrowUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAppliedCoupon, setAppliedCouponCode, setEnteredAmount, setMetalPrice, setMetalType, setPurchaseType, setTransactionType } from "@/redux/shopSlice";

const BuySell = () => {
  const [isgold, setIsGold] = useState(true);
  const [activeTab, setActiveTab] = useState('buy');
  const [activeTabPurchase, setActiveTabPurchase] = useState('rupees');
  const dispatch = useDispatch();
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const { minutes, seconds, hasInitialAPICallCompleted } = useSelector((state: RootState) => state.globalTimer);
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
  const extraGold = useSelector((state: RootState) => state.shop.extraGold);
  const totalGold = useSelector((state: RootState) => state.shop.totalGold);
  const transactionType = useSelector((state: RootState) => state.shop.transactionType);
  const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
  const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
  const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
  const couponCode = useSelector((state: RootState) => state.shop.couponCode);

  console.table({ couponCode, purchaseType, actualAmount, gst, metalType, extraGold, totalGold, transactionType, metalPricePerGram, enteredAmount })

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? 'gold' : 'silver'));
  };

  const handleTabClick = (tab: 'buy' | 'sell') => {
    setActiveTab(tab);
    dispatch(setPurchaseType(tab))
  };

  const handleTabClick1 = (tab: 'rupees' | 'grams') => {
    setActiveTabPurchase(tab);
    dispatch(setTransactionType(tab));
  }

  const handleEnteredAmountChange = (e: any) => {
    const enteredValue = e.target.value
    console.log("changing", +enteredValue)
    dispatch(setEnteredAmount(+enteredValue));
  };
  const handleAppliedCouponChange = (AppliedCoupon: boolean) => {
    dispatch(setAppliedCoupon(AppliedCoupon));
  };

  const handleAppliedCouponCode = (CouponCode: string) => {
    console.log('clicked!!!', CouponCode);
    dispatch(setAppliedCouponCode(CouponCode));
  };

  useEffect(() => {
    if (isgold && activeTab == 'buy') {
      dispatch(setMetalPrice(goldData.totalPrice))
    } else if (isgold && activeTab == 'sell') {
      dispatch(setMetalPrice(goldData.salePrice))
    } else if (!isgold && activeTab == 'buy') {
      dispatch(setMetalPrice(silverData.totalPrice))
    } else {
      dispatch(setMetalPrice(silverData.salePrice))
    }
  }, [isgold, activeTab])




  return (
    <>
      <div>
        <div className="block pl-32">
          <div className="tab-bg  rounded-b-lg relative">
            <div className="grid grid-cols-2">
              <div
                className={`text-center py-3 rounded font-semibold cursor-pointer ${activeTab === 'buy'
                  ? 'bg-blue-600 text-white active'
                  : 'bg-blue-200 text-blue-800'
                  }`}
                onClick={() => {
                  handleTabClick('buy')
                  handleAppliedCouponCode('BDG99')
                  handleAppliedCouponChange(true)
                }
                }
              >
                BUY
              </div>
              <div
                className={`text-center py-3 rounded cursor-pointer ${activeTab === 'sell'
                  ? 'bg-blue-800 text-white active'
                  : 'bg-blue-200 text-blue-800'
                  }`}
                onClick={() => handleTabClick('sell')}
              >
                SELL
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="">
                <div className="toggle_button_spacing" onChange={toggleMetal}>
                  <label className="toggle-button">
                    <input type="checkbox" />
                    <span className="slider"></span>
                    <span className="text-gold text-gold1">Silver</span>
                    <span className="text-silver text-silver1">Gold</span>
                  </label>
                </div>
                <div>
                  <p className="text-white text-sm pl-6 mt-6">
                    <img
                      className="h-4 inline-block mr-1"
                      src={new URL(
                        "../../../public/live.png",
                        import.meta.url
                      ).toString()}
                      alt="Your Company"
                    />
                    GOLD PRICE
                  </p>
                  <div className="text-gold01 text-xl font-bold py-2 pl-6 items-center  flex">
                    ₹{isgold ? (
                      <div className="">
                        {activeTab === 'buy' ? (
                          <div>{goldData.totalPrice}</div>
                        ) : (
                          <div>{goldData.salePrice}</div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {activeTab === 'buy' ? (
                          <div> {silverData.totalPrice}</div>
                        ) : (
                          <div>{silverData.salePrice}</div>
                        )}
                      </div>
                    )}/gm <span className="text-xs"> + 3% GST</span>
                  </div>
                  <p className="text-xs text-gray-400 pl-6">
                    24k 99.9% Pure Gold
                  </p>
                  <p className="text-xs font-base pl-6">
                    {isgold ? <span className={`${goldData.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {goldData.percentage >= 0 ? <ArrowUpIcon className="h-4 inline-block text-green-500" /> : <ChevronDownIcon className="h-4 inline-block text-red-500" />}
                      {goldData.percentage} %
                    </span> : <span className={`${silverData.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {silverData.percentage >= 0 ? <ArrowUpIcon className="h-4 inline-block" /> : <ChevronDownIcon className="h-4 inline-block" />}
                      {silverData.percentage} %
                    </span>}

                    <span className="text-white ml-2">Since Yesterday</span>
                  </p>

                  <p className="timer mt-4 text-xs py-1 pl-6">
                    Gold rate expires in {minutes} : {seconds}
                  </p>
                </div>
              </div>
              <div className=" flex justify-end items-center pr-12">
                <Image
                  className={`coin_transition ${isgold ? "gold_coin" : "silver_coin"
                    }`}
                  src={
                    isgold
                      ? "/goldbar.png"
                      : "https://www.brightdigigold.com/images/Masksilver.svg"
                  }
                  alt="coin image"
                  loading="lazy"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            <div className="p-6 z-20">
              <div className=" flex justify-around">
                <div
                  className={`text-center py-3 rounded font-semibold cursor-pointer ${activeTabPurchase === 'rupees'
                    ? 'bg-blue-600 text-white active'
                    : 'bg-blue-200 text-blue-800'
                    }`}
                  onClick={() => handleTabClick1('rupees')}
                >
                  Buy in Rupees
                </div>
                <div
                  className={`text-center py-3 rounded font-semibold cursor-pointer ${activeTabPurchase === 'grams'
                    ? 'bg-blue-600 text-white active'
                    : 'bg-blue-200 text-blue-800'
                    }`}
                  onClick={() => handleTabClick1('grams')}
                >
                  Buy in Grams
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-6 border border-white p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    ₹
                  </div>
                  <input
                    type="number"
                    className=" bg-transparent pl-8 text-lg py-1 focus:outline-none text-white"
                    max={9}
                    placeholder="000"
                    // value=""
                    onChange={handleEnteredAmountChange}
                  />
                </div>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="bg-transparent pr-10 text-sm py-1 focus:outline-none text-white text-right"
                    max={9}
                    placeholder="000"
                    onChange={handleEnteredAmountChange}
                  // value=""
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                    gm
                  </div>
                </div>
              </div>

              <p className="text-white text-md mt-4"> Quick Buy</p>
              <div className="mt-4 flex justify-between">
                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +₹50
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +₹100
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +0.5 gm
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +1.0 gm
                </Link>
              </div>
              <p className="text-center text-xs flex justify-center items-center mt-8 text-gray-400">
                Your Gold will be Stored in Safe & Secured Vault{" "}
                <img
                  className="h-5 ml-2"
                  src={new URL(
                    "../../../public/secure.png",
                    import.meta.url
                  ).toString()}
                  alt="Your Company"
                />{" "}
              </p>
              <div className="flex justify-between mt-6">
                <p className="text-white text-sm">Get Extra Gold</p>
              </div>

              <div className="py-3 px-4 rounded-lg bg-themeLight flex items-center mt-4 justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10"
                    src={new URL(
                      "../../../public/coupon.png",
                      import.meta.url
                    ).toString()}
                    alt="Your Company"
                  />
                  <p className="text-white text-lg leading-4 ml-2">
                    Apply Coupon
                  </p>
                </div>
                <button className="text-white rounded-full border-2">
                  <ChevronDownIcon className="h-8" />
                </button>
              </div>

              <div className="mt-12">
                <button className="w-full bg-blue-200 rounded-lg py-2">
                  Start Investing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
