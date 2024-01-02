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
import Timer from "../globalTimer";
import { useCoupons } from "@/customHooks/coupons";
import {
  ParseFloat,
  funForAesEncrypt,
  funcForDecrypt,
} from "../helperFunctions";
import Modal from "../modals/modal";
import ModalCoupon from "../modals/modalcoupon";
import axios from "axios";
import Swal from "sweetalert2";
import { selectUser } from "@/redux/userDetailsSlice";

const BuySell = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isgold, setIsGold] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("buy");
  const [activeTabPurchase, setActiveTabPurchase] = useState("rupees");
  const [validationError, setValidationError] = useState<string>("");
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCouponOpen, setModalCouponOpen] = useState(false);

  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const transactionType = useSelector(
    (state: RootState) => state.shop.transactionType
  );
  const purchaseType = useSelector(
    (state: RootState) => state.shop.purchaseType
  );
  const enteredAmount = useSelector(
    (state: RootState) => state.shop.enteredAmount
  );
  const actualAmount = useSelector(
    (state: RootState) => state.shop.actualAmount
  );
  const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
  const metalQuantity = useSelector(
    (state: RootState) => state.shop.metalQuantity
  );
  const selectedCoupon = useSelector(
    (state: RootState) => state.coupon.selectedCoupon
  );
  const appliedCouponCode = useSelector(
    (state: RootState) => state.coupon.appliedCouponCode
  );
  const error = useSelector((state: RootState) => state.coupon.error);
  const extraGoldOfRuppess = useSelector(
    (state: RootState) => state.coupon.extraGoldOfRuppess
  );
  const extraGold = useSelector((state: RootState) => state.coupon.extraGold);
  const isAnyCouponApplied = useSelector(isCouponApplied);
  const metalPricePerGram = useSelector(
    (state: RootState) => state.shop.metalPrice
  );

  const [previewData, setPreviewData] = useState([]);
  const [transactionId, setTransactionId] = useState("");

  console.log('user', user.data.user_vaults.gold)
  console.log("user", user);
  // console.table({
  //   orderType: purchaseType.toUpperCase(),
  //   item: metalType.toUpperCase(),
  //   // unit: "AMOUNT",
  //   gram: metalQuantity,
  //   amount: totalAmount,
  //   // gst_number: props.gstNum,
  //   // currentMatelPrice: 33.22,
  //   currentMatelPrice: metalPricePerGram,
  //   fromApp: false,
  // })

  const previewModal = async () => {
    // Notiflix.Loading.custom({svgSize:'180px',customSvgCode: '<object type="image/svg+xml" data="/svg/pageloader.svg">svg-animation</object>'});
    const dataToBeDecrypt: {
      orderType: string;
      itemType: string;
      unit: string;
      gram: number | undefined;
      amount: number | undefined;
      currentMatelPrice: number;
      fromApp: boolean;
      couponCode?: string;
    } = {
      orderType: purchaseType.toUpperCase(),
      itemType: metalType.toUpperCase(),
      unit: "AMOUNT",
      gram: metalQuantity,
      amount: totalAmount,
      currentMatelPrice: metalPricePerGram,
      fromApp: false,
    };

    if (isAnyCouponApplied) {
      dataToBeDecrypt.couponCode = appliedCouponCode ? appliedCouponCode : "";
    }

    const resAfterEncryptData = await funForAesEncrypt(dataToBeDecrypt);
    const payloadToSend = {
      payload: resAfterEncryptData,
    };
    const token = localStorage.getItem("token");

    const configHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // onUploadProgress: Notiflix.Loading.circle()
      },
    };
    axios
      .post(
        `${process.env.baseUrl}/user/order/preview`,
        payloadToSend,
        configHeaders
      )
      .then(async (resAfterPreview) => {
        const decryptedData = await funcForDecrypt(
          resAfterPreview.data.payload
        );
        // log("preview", JSON.parse(decryptedData).data);
        setPreviewData(JSON.parse(decryptedData).data.preview);
        setTransactionId(JSON.parse(decryptedData).data.transactionCache._id);
        if (JSON.parse(decryptedData).statusCode == 200) {
          // Notiflix.Loading.remove();
          // if (purchaseType.toUpperCase() == "BUY") {
          setModalOpen(true)
          // } else {
          // setSellModalShow(true);
          // }
          if (purchaseType.toUpperCase() == "BUY") {
            setModalOpen(true);
          } else {
            // setSellModalShow(true);
          }
        }
      })
      .catch(async (errInPreview) => {
        // Notiflix.Loading.remove();
        const decryptedData = await funcForDecrypt(
          errInPreview.response.data.payload
        );
        let response = JSON.parse(decryptedData);
        console.log("decryptedData", response);
        if (response.messageCode == "TECHNICAL_ERROR") {
          console.log('response.messageCode 128', response.messageCode)
          console.log("response.messageCode 128", response.messageCode);
          // updateMetalPrice();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Session Expired",
          });
        } else if (response.messageCode == "KYC_PENDING") {
          // setKycError(response.message);
        } else if (response.messageCode == "SESSION_EXPIRED") {
          console.log("response.messageCode 135", response.messageCode);
          // setKycError(response.message);
        } else if (response.messageCode == "SESSION_EXPIRED") {
          console.log("response.messageCode 138", response.messageCode);
          // updateMetalPrice();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Session Expired",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message,
          });
        }
      });
  };

  useEffect(() => {
    dispatch(setMetalType("gold"));
    dispatch(setEnteredAmount(0));
    dispatch(setCouponError(""));
    dispatch(setPurchaseType("buy"));
    dispatch(setTransactionType("rupees"));
    dispatch(clearCoupon());
  }, []);

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? "gold" : "silver"));
    dispatch(setEnteredAmount(0));
    setValidationError("");
    dispatch(clearCoupon());
  };

  // const toggleCoupon = () => {
  //   setShowCoupon(!showCoupon);
  //   dispatch(setCouponError(""));
  // };

  const handleTabBuyAndSell = (tab: "buy" | "sell") => {
    setActiveTab(tab);
    dispatch(setPurchaseType(tab));
    dispatch(setEnteredAmount(0));
    setValidationError("");
    dispatch(clearCoupon());
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

  const handleEnteredAmountChange = (e: any) => {
    const enteredValue = ParseFloat(e.target.value, 4);
    if (!enteredAmount) {
      setValidationError("Please enter amount");
      // return;
    } else if (actualAmount < 10) {
      setValidationError("Minimum gifting amount is Rs.10");
      // return;
    }
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
      // console.log("actualPurchasingInGm", actualPurchasingInGm);
      if (Number(e.target.value) > ParseFloat(actualPurchasingInGm, 4)) {
        setValidationError("Amount should be less than 2 lakhs");
        return;
      } else {
        dispatch(setEnteredAmount(+enteredValue));
      }
    }
  };

  const handleBuyClick = (e: any) => {
    if (!enteredAmount) {
      setValidationError("Please enter amount");
      return;
    } else if (totalAmount !== undefined && totalAmount < 10) {
      setValidationError("Minimum Purchase amount is Rs.10");
      return;
    }
    setValidationError("");
    previewModal();
    // setModalOpen(true);
  };

  const handleSellClick = (e: any) => {
    if (!enteredAmount) {
      setValidationError("Please enter amount");
      return;
    } else if (enteredAmount < 100) {
      setValidationError("Minimum Sell amount is Rs.100");
      return;
    }
    setValidationError("");
    previewModal()
    // setModalOpen(true);
  };

  const QuickBuySellButtons = ({ amounts, unit, onClickHandler }: any) => (
    <div className="mt-4 flex justify-between">
      {amounts.map((amount: any) => (
        <button
          key={amount}
          onClick={() => {
            dispatch(setEnteredAmount(amount));
          }}
          className="bg-themeLight001 border border-blue-200 rounded-md py-1 px-2 sm:px-4 text-white text-sm"
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
  }, [isgold, activeTab, toggleMetal]);

  const openModal = () => {
    setModalCouponOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalCouponOpen(false);
  };

  // useEffect(() => {
  //   // console.table({ error, appliedCouponCode, extraGoldOfRuppess, extraGold });
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
  //   toggleMetal,
  // ]);

  return (
    <>
      <div>
        <div className="block xl:pl-24">
          <div className="tab-bg  rounded-b-lg relative">
            <div className="grid grid-cols-2">
              <div
                className={`text-center py-3 rounded font-semibold cursor-pointer ${
                  activeTab === "buy"
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
                className={`text-center py-3 rounded cursor-pointer ${
                  activeTab === "sell"
                    ? "bg-themeLight text-white active"
                    : "bg-themeLight01 text-sky-600"
                }`}
                onClick={() => handleTabBuyAndSell("sell")}
              >
                SELL
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 items-end">
              <div className="w-full">
                <div
                  className="toggle_button_spacing pl-4 mt-6"
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
                    {/* <Lottie
                      animationData={live}
                      className="h-6 absolute"
                      loop={true}
                    /> */}
                    <img
                      src="/lottie/Animation - 1700632554663.gif"
                      className="h-8 inline-block"
                    />
                    <span className="pl-2 pt-2">
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
                        className={`${
                          goldData.percentage >= 0
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
                        className={`${
                          silverData.percentage >= 0
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

                    <p className="text-7x sm:text-xs text-white ml-2 inline-block">
                      Since Yesterday
                    </p>
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-4 w-full 2xl:w-4/5 float-left">
                <div className="flex justify-end 2xl:justify-center pr-4 sm:pr-12 2xl:pr-4">
                  {metalType === "gold" ? (
                    <img
                      src="/lottie/Gold Stack Animation.gif"
                      className="h-16 sm:h-32"
                    />
                  ) : (
                    <img
                      src="/lottie/Silver Stacks animation.gif"
                      className="h-16 sm:h-32"
                    />
                  )}
                </div>
                <Timer />
              </div>
            </div>
            {purchaseType === "sell" && (
              <div className="bg-themeLight001 p-0 mx-4 mt-4 rounded-lg border-1 grid grid-cols-3 gap-1 sm:gap-4 items-center justify-between place-items-center sm:place-content-between">
                <div className="col-span-1">
                  <img src="/lottie/New Web Vault.gif" className="h-20" />
                </div>
                <div className="col-span-2 sm:flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
                    {metalType === "gold" ? (
                      <img src="/Goldbarbanner.png" className="h-6 sm:h-6" />
                    ) : (
                      <img src="/Silverbar.png" className="h-6 sm:h-6" />
                    )}
                    <p className="text-white text-sm sm:text-lg">{metalType === 'gold' ? `${ParseFloat(user.data.user_vaults.gold, 2)}` : `${ParseFloat(user.data.user_vaults.silver, 2)}`} gmmm</p>
                    <p className="text-white text-sm sm:text-lg">
                      {metalType === "gold"
                        ? `${ParseFloat(user.data.user_vaults.gold, 2)}`
                        : `${ParseFloat(user.data.user_vaults.silver, 2)}`}{" "}
                      gm
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <img src="/Green Rupees.png" className="w-10 " />
                    <p className="text-white text-sm sm:text-lg">
                      ₹{" "}
                      {metalType === "gold"
                        ? `${ParseFloat(
                            ParseFloat(user.data.user_vaults.gold, 2) *
                              metalPricePerGram,
                            2
                          )}`
                        : `${ParseFloat(
                            ParseFloat(user.data.user_vaults.silver, 2),
                            2
                          )}`}{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 z-20">
              <div className="flex justify-around px-1 py-1 bg-themeLight rounded-full mx-auto w-3/4">
                <div
                  className={`text-center border-2 text-xxs w-1/2 sm:text-sm px-2 sm:px-9 py-2 rounded-tl-full rounded-bl-full font-semibold cursor-pointer ${
                    activeTabPurchase === "rupees"
                      ? "bg-transparent text-black bg-themeBlue active extrabold"
                      : "text-white"
                  }`}
                  onClick={() => handleTabRupeesAndGrams("rupees")}
                >
                  {purchaseType === "buy" ? " In Rupees" : " In Rupees"}
                </div>
                <div
                  className={`text-center border-2  text-xxs w-1/2 sm:text-sm px-2 sm:px-9 py-2 rounded-tr-full rounded-br-full font-semibold cursor-pointer ${
                    activeTabPurchase === "grams"
                      ? "bg-transparent text-black  bg-themeBlue active extrabold"
                      : "text-white"
                  }`}
                  onClick={() => handleTabRupeesAndGrams("grams")}
                >
                  {purchaseType === "buy" ? "In Grams" : "In grams"}
                </div>
              </div>
              <div className="pt-2 mt-2 grid grid-cols-2 items-center gap-6 border-1 font-extrabold p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    {activeTabPurchase == "rupees" ? "₹ " : ""}
                  </div>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="bg-transparent pl-12 text-lg py-1 focus:outline-none text-white"
                    placeholder={
                      activeTabPurchase === "rupees" ? "0000" : "0.0000"
                    }
                    onChange={(e) => {
                      handleEnteredAmountChange(e);
                    }}
                    step="0.0001"
                    value={enteredAmount === 0 ? undefined : enteredAmount}
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
                Your Gold will be Stored in Safe & Secured Vault
                <img
                  className="h-5 ml-2"
                  src={new URL(
                    "../../../public/secure.png",
                    import.meta.url
                  ).toString()}
                  alt="Your Company"
                />{" "}
              </p>
              <img src="/brink.png" className="h-4 sm:h-7 mt-2 mx-auto" />
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
                        <ChevronUpIcon onClick={openModal} className="h-8" />
                      </div>
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-12">
                {purchaseType === "buy" && <button
                  onClick={handleBuyClick}
                  className="w-full bg-themeBlue rounded-lg py-2"
                >
                  <p>Start Saving</p>
                </button>}
                {purchaseType === "sell" && <button
                  onClick={handleSellClick}
                  className="w-full bg-themeBlue rounded-lg py-2"
                >
                  <p>Sell Now</p>
                </button>}
                
                {isModalOpen && (
                  <Modal
                    transactionId={transactionId}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                  />
                )}

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
