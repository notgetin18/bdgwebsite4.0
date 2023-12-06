"use client";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import animationData from "../../../public/lottie/locker.json";
import goldBarData from "../../../public/lottie/GoldBricks.json";
import silverBarData from "../../../public/lottie/SilverBricks.json";
import live from "../../../public/lottie/live.json";
import {
  setEnteredAmount,
  setMetalPrice,
  setMetalType,
  setPurchaseType,
  setTransactionType,
} from "@/redux/shopSlice";
import {
  applyCoupon,
  clearCoupon,
  isCouponApplied,
  setCouponError,
} from "@/redux/couponSlice";
import Modal from "../modal";
import Timer from "../globalTimer";
import { useCoupons } from "@/customHooks/coupons";
import { ParseFloat } from "../helperFunctions";
import Lottie from "lottie-react";

const BuySell = () => {
  const dispatch = useDispatch();
  const [isgold, setIsGold] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("buy");
  const [activeTabPurchase, setActiveTabPurchase] = useState("rupees");
  const [validationError, setValidationError] = useState<string>("");
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const transactionType = useSelector((state: RootState) => state.shop.transactionType);
  const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
  const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
  const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
  const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
  const metalQuantity = useSelector((state: RootState) => state.shop.metalQuantity);
  const selectedCoupon = useSelector((state: RootState) => state.coupon.selectedCoupon);
  const appliedCouponCode = useSelector((state: RootState) => state.coupon.appliedCouponCode);
  const error = useSelector((state: RootState) => state.coupon.error);
  const extraGoldOfRuppess = useSelector((state: RootState) => state.coupon.extraGoldOfRuppess);
  const extraGold = useSelector((state: RootState) => state.coupon.extraGold);
  const isAnyCouponApplied = useSelector(isCouponApplied);
  const coupons = useCoupons();

  const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
  console.log("metalPricePerGram", metalPricePerGram)



  const handleApplyCoupon = (coupon: any, amount: any) => { dispatch(applyCoupon({ coupon, amount, goldPrice: goldData.totalPrice, metalType, transactionType, })); };

  const handleClearCoupon = () => {
    dispatch(clearCoupon());
  };

  // useEffect(() => {
  //   console.table({ error, appliedCouponCode, extraGoldOfRuppess, extraGold });
  //   console.table({
  //     purchaseType,
  //     actualAmount,
  //     gst,
  //     metalType,
  //     transactionType,
  //     metalPricePerGram,
  //     totalAmount,
  //     enteredAmount,
  //     metalQuantity,
  //   });
  // }, [
  //   error,
  //   appliedCouponCode,
  //   extraGoldOfRuppess,
  //   extraGold,
  //   purchaseType,
  //   actualAmount,
  //   gst,
  //   totalAmount,
  //   metalType,
  //   transactionType,
  //   metalPricePerGram,
  //   enteredAmount,
  //   metalQuantity,
  // ]);

  // useEffect(() => {
  //   console.log("metalPricePerGram", metalPricePerGram)
  //   // console.log("goldData", goldData)
  // }, [metalPricePerGram]);

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? "gold" : "silver"));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  const toggleCoupon = () => {
    setShowCoupon(!showCoupon);
    dispatch(setCouponError(""));
  };

  const handleTabBuyAndSell = (tab: "buy" | "sell") => {
    setActiveTab(tab);
    dispatch(setPurchaseType(tab));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  const handleTabRupeesAndGrams = (tab: "rupees" | "grams") => {
    setActiveTabPurchase(tab);
    dispatch(setTransactionType(tab));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  let goldPriceWithGST = ParseFloat(
    `${goldData.totalPrice * 0.03 + goldData.totalPrice}`,
    2
  );
  const actualPurchasingInGm = 200000 / goldPriceWithGST;
  // console.log('actualPurchasingInGm', actualPurchasingInGm)

  const handleEnteredAmountChange = (e: any) => {
    const enteredValue = ParseFloat(e.target.value, 4);
    setValidationError("");
    if (activeTabPurchase === "rupees") {
      if (enteredValue > 200000) {
        setValidationError(
          `We appreciate your trust to buy  ${metalType} on our platform, but our current limit is ₹2 lakhs only. Please change the amount.`
        );
        return;
      } else {
        dispatch(setEnteredAmount(+enteredValue));
      }
    }

    if (activeTabPurchase === "grams") {
      console.log("actualPurchasingInGm", actualPurchasingInGm);
      if (Number(e.target.value) > actualPurchasingInGm) {
        setValidationError("Amount should be less than 2 lakhs");
        return;
      } else {
        dispatch(setEnteredAmount(+enteredValue));
      }
    }
  };

  const QuickBuySellButtons = ({ amounts, unit, onClickHandler }: any) => (
    <div className="mt-4 flex justify-between">
      {amounts.map((amount: any) => (
        <button
          key={amount}
          onClick={() => {
            dispatch(setEnteredAmount(amount));
          }}
          className="bg-themeLight001 border border-blue-200 rounded-md py-1 px-4 text-white text-sm"
        >
          {unit === "rupees" ? `₹${amount}` : `${amount}gm`}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    if (isgold && activeTab == "buy") {
      dispatch(setMetalPrice(goldData.totalPrice));
    } else if (isgold && activeTab == "sell") {
      dispatch(setMetalPrice(goldData.salePrice));
    } else if (!isgold && activeTab == "buy") {
      dispatch(setMetalPrice(silverData.totalPrice));
    } else {
      dispatch(setMetalPrice(silverData.salePrice));
    }
  }, [isgold, activeTab]);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="block lg:pl-28">
          <div className="tab-bg  rounded-b-lg relative">
            <div className="grid grid-cols-2  ">
              <div
                className={`text-center py-3 rounded font-semibold cursor-pointer ${activeTab === "buy"
                  ? "bg-themeLight text-white active"
                  : "bg-themeLight01 text-sky-600"
                  }`}
                onClick={() => {
                  handleTabBuyAndSell("buy");
                }}
              >
                BUY
              </div>
              <div
                className={`text-center py-3 rounded cursor-pointer ${activeTab === "sell"
                  ? "bg-themeLight text-white active"
                  : "bg-themeLight01 text-sky-600"
                  }`}
                onClick={() => handleTabBuyAndSell("sell")}
              >
                SELL
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="">
                <div
                  className="toggle_button_spacing mt-6"
                  onChange={toggleMetal}
                >
                  <label className="toggle-button">
                    <input type="checkbox" />
                    <div className="slider"></div>
                    <div className="text-gold text-gold1">Silver</div>
                    <div className="text-silver text-silver1">Gold</div>
                  </label>
                </div>
                <div>
                  <p className="text-white text-sm pl-6 mt-6 relative">
                    {/* <img
                      className="h-4 inline-block mr-1"
                      src={new URL(
                        "../../../public/live.png",
                        import.meta.url
                      ).toString()}
                      alt="Your Company"
                    /> */}
                    <Lottie
                      animationData={live}
                      className="h-6 absolute"
                      loop={true}
                    />
                    <span className="pl-10 pt-2">
                      {metalType === "gold" ? "GOLD PRICE" : "SILVER PRICE"}
                    </span>
                  </p>
                  <div className="text-shine text-xl font-bold py-2 pl-6 items-center  flex">
                    ₹
                    {isgold ? (
                      <div className="">
                        {activeTab === "buy" ? (
                          <div>{goldData.totalPrice}</div>
                        ) : (
                          <div>{goldData.salePrice}</div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {activeTab === "buy" ? (
                          <div> {silverData.totalPrice}</div>
                        ) : (
                          <div>{silverData.salePrice}</div>
                        )}
                      </div>
                    )}
                    /gm{" "}
                    <div className="text-xs">
                      {purchaseType === "buy" ? "" : ""}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 pl-6">
                    24k 99.9% Pure Gold
                  </p>
                  <p className="text-xxs sm:text-xs font-base pl-6 flex">
                    {isgold ? (
                      <div
                        className={`${goldData.percentage >= 0
                          ? "text-green-500"
                          : "text-red-500"
                          }`}
                      >
                        {goldData.percentage >= 0 ? (
                          <ArrowUpIcon className="h-4 inline-block text-green-500" />
                        ) : (
                          <ChevronDownIcon className="h-4 inline-block text-red-500" />
                        )}
                        {goldData.percentage} %
                      </div>
                    ) : (
                      <div
                        className={`${silverData.percentage >= 0
                          ? "text-green-500"
                          : "text-red-500"
                          }`}
                      >
                        {silverData.percentage >= 0 ? (
                          <ArrowUpIcon className="h-4 inline-block" />
                        ) : (
                          <ChevronDownIcon className="h-4 inline-block" />
                        )}
                        {silverData.percentage} %
                      </div>
                    )}

                    <p className="text-white ml-2 inline-block">
                      Since Yesterday
                    </p>
                  </p>

                  {/* <p className="timer mt-4 text-xs py-1 pl-6 flex">
                    <div className="pl-1"></div>
                  </p> */}
                </div>
              </div>
              <div className="mt-20 sm:mt-10">
                <div className="flex justify-end pr-4 sm:pr-12">
                  {/* <Image
                    className={`coin_transition ${
                      isgold
                        ? "gold_coin h-16 w-16 sm:h-28 sm:w-28"
                        : "silver_coin w-16 sm:h-28 sm:w-28"
                    }`}
                    src={
                      isgold
                        ? "/silvercoin.png"
                        : "https://www.brightdigigold.com/images/Masksilver.svg"
                    }
                    alt="coin image"
                    loading="lazy"
                    width={100}
                    height={100}
                  /> */}
                  {metalType === "gold" ? (
                    <Lottie
                      animationData={goldBarData}
                      className="h-40 absolute"
                      loop={true}
                    />
                  ) : (
                    <Lottie
                      animationData={silverBarData}
                      className="h-40 absolute"
                      loop={true}
                    />
                  )}
                </div>
                <Timer />
              </div>
            </div>
            {purchaseType === "sell" && (
              <div className="bg-themeLight p-3 mx-6 h-20 mt-4 rounded-lg border-1 grid grid-cols-3 gap-4 items-center justify-between">
                {/* <img src="/silvercoin.png" className="h-8" /> */}
                <Lottie
                  animationData={animationData}
                  className="h-40 left-5 absolute"
                  loop={true}
                />
                <div className="col-span-1"></div>
                <div className="flex justify-between items-center gap-6 col-span-2">
                  <div className="flex items-center gap-4">
                    <img src="/silvercoin.png" className="h-6" />
                    <p className="text-white text-sm">₹ 3000</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src="/silvercoin.png" className="h-6" />
                    <p className="text-white text-sm">₹ 3000</p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 z-20">
              <div className="flex justify-around px-1 py-1 bg-themeLight rounded-md">
                <div
                  className={`text-center text-xxs w-1/2 sm:text-sm px-9 py-2 rounded-md font-semibold cursor-pointer ${activeTabPurchase === "rupees"
                    ? "bg-transparent text-white bg-themeLight active"
                    : "text-white"
                    }`}
                  onClick={() => handleTabRupeesAndGrams("rupees")}
                >
                  {purchaseType === "buy" ? " In Rupees" : " In Rupees"}
                </div>
                <div
                  className={`text-center text-xxs w-1/2 sm:text-sm px-9 py-2 rounded-md font-semibold cursor-pointer ${activeTabPurchase === "grams"
                    ? "bg-transparent text-white bg-themeLight active"
                    : "text-white "
                    }`}
                  onClick={() => handleTabRupeesAndGrams("grams")}
                >
                  {purchaseType === "buy" ? "In grams" : "In grams"}
                </div>
              </div>
              <div className="pt-2 mt-2 grid grid-cols-2 items-center gap-6 border border-yellow-500 font-extrabold p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    {activeTabPurchase == "rupees" ? "₹ " : ""}
                  </div>
                  <input
                    type="number"
                    className="bg-transparent pl-12 text-lg py-1 focus:outline-none text-white"
                    placeholder={
                      activeTabPurchase === "rupees" ? "0000" : "0.0000"
                    }
                    onChange={handleEnteredAmountChange}
                    step="0.0001"
                    value={enteredAmount === 0 ? "" : enteredAmount}
                    onKeyDown={(e) => {
                      // Prevent the input of a decimal point if purchase type is rupees
                      if (activeTabPurchase === "rupees" && e.key === ".") {
                        e.preventDefault();
                      }
                      // Prevent entering negative values
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-gray-300 text-md inset-y-0 left-0 flex items-center pl-24">
                    {activeTabPurchase === "rupees" ? "" : "₹"}
                  </div>
                  <input
                    type="number"
                    placeholder={
                      activeTabPurchase === "rupees" ? "0.0000" : "0000"
                    }
                    className="bg-transparent w-full pr-12 text-sm py-1  focus:outline-none text-white text-right"
                    value={
                      activeTabPurchase == "rupees"
                        ? metalQuantity === 0
                          ? ""
                          : metalQuantity
                        : totalAmount === 0
                          ? ""
                          : totalAmount
                    }
                    readOnly
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                    {activeTabPurchase == "rupees" ? "gm" : ""}
                  </div>
                </div>
              </div>
              {validationError ? (
                <span className="text-red-500 text-sm">{validationError}</span>
              ) : (
                ""
              )}

              <div className="text-white text-md mt-4">
                {purchaseType === "buy" ? "Quick Buy" : "Quick Sell"}
              </div>
              {transactionType === "rupees" ? (
                <QuickBuySellButtons
                  amounts={[50, 100, 500, 1000]}
                  unit="rupees"
                />
              ) : (
                <QuickBuySellButtons amounts={[0.1, 0.5, 1, 2]} unit="gm" />
              )}

              <p className="text-center text-xxs sm:text-xs flex justify-center items-center mt-6 text-gray-400">
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
              <img src="/brink.png" className="h-4 sm:h-8 mt-2 mx-auto" />
              {isgold && purchaseType === "buy" && (
                <div>
                  <div className="flex justify-between mt-6"></div>
                  <div className="py-2 px-4 rounded-lg bg-themeLight flex items-center justify-between">
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
                      <div>
                        {showCoupon ? (
                          <ChevronUpIcon
                            onClick={toggleCoupon}
                            className="h-8"
                          />
                        ) : (
                          <ChevronDownIcon
                            onClick={toggleCoupon}
                            className="h-8"
                          />
                        )}
                      </div>
                    </button>
                  </div>
                  {error && <div className="text-red-500 text-xs">{error}</div>}
                  {showCoupon &&
                    coupons?.map((coupon: any) => (
                      <div key={coupon._id}>
                        <p className="text-white">{coupon.description}</p>
                        <button
                          className="bg-gray-400 rounded cursor-pointer text-white p-2"
                          onClick={() =>
                            handleApplyCoupon(coupon, enteredAmount)
                          }
                        >
                          Apply Coupon
                        </button>
                      </div>
                    ))}{" "}
                </div>
              )}
              <div className="mt-12">
                <button
                  onClick={openModal}
                  className="w-full bg-gray-400 rounded-lg py-2"
                >
                  <ChevronLeftIcon className="h-6 rounded-full border-2 border-black inline-block float-left ml-4" />
                  {purchaseType === "buy" ? "Start Investing " : "Sell Now"}
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
