"use client";
import React, { useEffect, useState } from "react";
import {
  setEnteredAmount,
  setMetalPrice,
  setMetalType,
  setTransactionType,
} from "@/redux/giftSlice";
import {
  AesDecrypt,
  AesEncrypt,
  ParseFloat,
} from "@/components/helperFunctions";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Formik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import * as Yup from "yup";
import OtpModal from "./otpModal";
import GiftFaq from "./giftFaq";
import Redeem from "./giftSentOrReedem";

const GiftTab = () => {
  const dispatch = useDispatch();
  const [isgold, setIsGold] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [activeTab, setactiveTab] = useState("rupees");
  const [isSubmitting, setSubmitting] = useState(false);
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [mobile, setMobile] = useState<number>();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const metalType = useSelector((state: RootState) => state.gift.metalType);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const totalAmount = useSelector((state: RootState) => state.gift.totalAmount);
  const metalQuantity = useSelector(
    (state: RootState) => state.gift.metalQuantity
  );
  const transactionType = useSelector(
    (state: RootState) => state.gift.transactionType
  );
  const enteredAmount = useSelector(
    (state: RootState) => state.gift.enteredAmount
  );
  const actualAmount = useSelector(
    (state: RootState) => state.gift.actualAmount
  );

  // console.log("i am from GiftTab");
  // useEffect(() => {
  //   console.table({ activeTab, metalType, metalQuantity, transactionType, enteredAmount, actualAmount })
  // }, [activeTab, metalType, metalQuantity, transactionType, enteredAmount, actualAmount])

  useEffect(() => {
    dispatch(setMetalType("gold"));
    dispatch(setEnteredAmount(0));
    dispatch(setTransactionType("rupees"));
  }, []);

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? "gold" : "silver"));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  useEffect(() => {
    if (isgold) {
      dispatch(setMetalPrice(goldData.salePrice));
    } else {
      dispatch(setMetalPrice(silverData.salePrice));
    }
  }, [isgold, activeTab, toggleMetal]);

  const handleTabRupeesAndGrams = (tab: "rupees" | "grams") => {
    setactiveTab(tab);
    dispatch(setTransactionType(tab));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  const handleEnteredAmountChange = (e: any) => {
    const enteredValue = ParseFloat(e.target.value, 4);
    setValidationError("");
    if (metalType == "gold") {
      if (activeTab === "grams") {
        if (Number(e.target.value) > 5) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is 5gm only. Please change the amount.`
          );
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
      if (activeTab === "rupees") {
        if (enteredValue > 5 * goldData.salePrice) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is ₹${
              5 * goldData.salePrice
            } only. Please change the amount.`
          );
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
    } else {
      if (activeTab === "grams") {
        if (Number(e.target.value) > 50) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is 50gm only. Please change the amount.`
          );
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
      if (activeTab === "rupees") {
        if (enteredValue > 50 * silverData.salePrice) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is ₹${
              50 * silverData.salePrice
            } only. Please change the amount.`
          );
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
    }
  };

  const QuickGiftButtons = ({ amounts, unit, onClickHandler }: any) => (
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

  const initialValues = {
    giftedUsers: "",
  };
  const validationSchema = Yup.object().shape({
    giftedUsers: Yup.string()
      .required("Enter Mobile Number")
      .matches(/^[6789][0-9]{9}$/, "Mobile number is not valid")
      .min(10, "Please enter 10-digit mobile number")
      .max(10, "too long"),
  });

  const onSubmit = async (values: { giftedUsers: any }, { resetForm }: any) => {
    if (!enteredAmount) {
      setValidationError("Please enter amount");
      return;
    } else if (actualAmount < 10) {
      setValidationError("Minimum gifting amount is Rs.10");
      return;
    }

    if (
      validationError == "" &&
      metalQuantity !== undefined &&
      metalQuantity > 0
    ) {
      // console.log(metalType.toUpperCase(), transactionType.toUpperCase(), metalQuantity, values.giftedUsers)
      setSubmitting(true);
      const data = {
        itemType: metalType.toUpperCase(),
        unitType: "GRAMS",
        quantity: metalQuantity,
        giftedUsers: values.giftedUsers,
      };
      try {
        const resAfterEncryptData = AesEncrypt(data);
        const body = {
          payload: resAfterEncryptData,
        };

        const token = localStorage.getItem("token");
        const configHeaders = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          `${process.env.baseUrl}/user/gifting/verify`,
          body,
          configHeaders
        );
        const decryptedData = await AesDecrypt(response.data.payload);
        const result = JSON.parse(decryptedData);
        if (result.status) {
          setOtpModalShow(true);
        }
      } catch (error: any) {
        const decryptedData = await AesDecrypt(error.response.data.payload);

        const result = JSON.parse(decryptedData);
        Swal.fire({
          // position: "centre",
          icon: "error",
          title: "Error",
          text: result.message,
          showConfirmButton: false,
          timer: 15000,
        });
      } finally {
        setSubmitting(false);
        resetForm();
      }
    } else {
      // log("gramError or rupeeError is there");
      // setCommonError("Please enter Rs. or Grams");
    }
  };

  function handleOTPChange(otp: React.SetStateAction<string>) {
    setOtp(otp);
    setOtpError("");
  }

  const onSubmitVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (otp === "") {
      setOtpError("Please enter the OTP");
    } else if (
      validationError == "" &&
      metalQuantity !== undefined &&
      metalQuantity > 0
    ) {
      setSubmitting(true);
      const data = {
        itemType: metalType.toUpperCase(),
        unitType: "GRAMS",
        quantity: metalQuantity,
        giftedUsers: mobile,
        otp: otp,
      };
      e.preventDefault();
      try {
        const resAfterEncryptData = await AesEncrypt(data);
        const body = {
          payload: resAfterEncryptData,
        };
        const token = localStorage.getItem("token");
        const configHeaders = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          `${process.env.baseUrl}/user/gifting`,
          body,
          configHeaders
        );
        //
        const decryptedData = await AesDecrypt(response.data.payload);

        const result = JSON.parse(decryptedData);

        if (result.status) {
          setOtpModalShow(false);
          // walletApiSell();
          setOtp("");
          setOtpError("");
          Swal.fire({
            // position: "centre",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error: any) {
        // setOtpModalShow(false);
        const decryptedData = await AesDecrypt(error?.response?.data?.payload);
        const result = JSON.parse(decryptedData);
        setOtpError(result.message);
        // console.log('result.message', result.message)
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full ">
      <OtpModal
        isOpen={otpModalShow}
        onClose={() => {
          setOtpModalShow(false);
          setOtp("");
          setOtpError("");
        }}
        onSubmitVerify={onSubmitVerify}
        handleOTPChange={handleOTPChange}
        otp={otp}
        otpError={otpError}
        isSubmitting={isSubmitting}
      />
      <div className="rounded-lg bg-themeLight">
        <p className="text-center text-gold01 pt-4 extrabold text-5xl">GIFT</p>
        <div className="col-span-4 p-4 items-center  text-white grid md:grid-cols-2 gap-6">
          <div className=" hidden md:block">
            <img
              alt="gold-logo"
              className="p-8"
              src="/images/gift_gold_web.png"
            />
          </div>
          <div>
            {/* gifting section */}
            <div className="grid grid-cols-2 items-center py-4">
              <div
                onClick={toggleMetal}
                className={`flex justify-center text-center py-3 rounded font-semibold cursor-pointer ${
                  isgold === true
                    ? "bg-themeBlue extrabold active text-black"
                    : "bg-themeLight01 text-white"
                }`}
              >
                <img
                  src={"/Goldbarbanner.png"}
                  alt="digital gold"
                  className={`mr-2 cursor-pointer h-5 sm:h-6 ${
                    isgold === true ? "opacity-100" : "opacity-50"
                  }`}
                />
                <p className="text-sm sm:text-base">Gold</p>
              </div>
              <div
                onClick={toggleMetal}
                className={`flex justify-center text-center py-3 rounded font-semibold cursor-pointer ${
                  isgold === false
                    ? "bg-themeBlue text-black extrabold  active"
                    : "bg-themeLight01 text-white"
                }`}
              >
                <img
                  src={"/Silverbar.png"}
                  alt="digital gold"
                  className={`mr-2 cursor-pointer h-5 sm:h-6 ${
                    isgold === false ? "opacity-100" : "opacity-50"
                  }`}
                />
                <p className="text-sm sm:text-base">Silver</p>
              </div>
            </div>
            {/* vault Balance */}
            <div className="grid grid-cols-2 justify-between items-center bg-themeLight px-4 p-2 rounded-md mt-4">
              <div className="flex items-center">
                <img
                  src="/gift-box.png"
                  className="mr-2 h-8"
                  alt="digital gold gift"
                />
                <p className="text-lg sm:text-2xl font-semibold ">
                  <span className="text-sm sm:text-lg mr-2">Gift</span>
                  {isgold ? (
                    <span className="text-yellow-500">Gold</span>
                  ) : (
                    <span className="text-white">Silver</span>
                  )}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-end">
                  <div>
                    <img
                      src="/scale.png"
                      className="mr-2 h-8"
                      alt="digital gold gift"
                    />
                  </div>
                  <div>
                    <p className="text-sm">Weight</p>
                    {isgold ? <p>5.0023 gm</p> : <p>200.0023 gm</p>}
                  </div>
                  <div>
                    {/* <Image
                      src="https://thumbs.dreamstime.com/b/bank-vault-stack-gold-bars-d-render-ine-108980994.jpg"
                      className="ml-4"
                      alt="digital gold gift"
                      width={60}
                      height={36}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-8 ">
              <div className="flex items-center justify-center ">
                <div className="flex justify-around px-1 py-1 bg-themeLight rounded-full mx-auto w-full lg:w-3/4">
                  <div
                    className={`text-center text-xxs w-1/2 sm:text-sm px-2 sm:px-9 py-2 rounded-tl-full rounded-bl-full font-semibold cursor-pointer ${
                      activeTab === "rupees"
                        ? "bg-transparent text-black bg-themeBlue active extrabold"
                        : "text-white "
                    }`}
                    onClick={() => handleTabRupeesAndGrams("rupees")}
                  >
                    {activeTab === "buy" ? " In Rupees" : " In Rupees"}
                  </div>
                  <div
                    className={`text-center text-xxs w-1/2 sm:text-sm px-2 sm:px-9 py-2 rounded-tr-full rounded-br-full font-semibold cursor-pointer ${
                      activeTab === "grams"
                        ? "bg-transparent text-black bg-themeBlue active extrabold"
                        : "text-white "
                    }`}
                    onClick={() => handleTabRupeesAndGrams("grams")}
                  >
                    {activeTab === "buy" ? "In grams" : "In grams"}
                  </div>
                </div>
              </div>
              <div className="pt-2 mt-2 grid grid-cols-2 items-center gap-6 border-1 font-extrabold p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    {activeTab == "rupees" ? "₹ " : ""}
                  </div>
                  <input
                    type="number"
                    className="bg-transparent pl-12 text-lg py-1 focus:outline-none text-white"
                    placeholder={activeTab === "rupees" ? "0000" : "0.0000"}
                    onChange={(e) => {
                      e.preventDefault();
                      handleEnteredAmountChange(e);
                    }}
                    step="0.0001"
                    value={enteredAmount == 0 ? undefined : enteredAmount}
                    onKeyDown={(e) => {
                      // Prevent the input of a decimal point if gift type is rupees
                      if (activeTab === "rupees" && e.key === ".") {
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
                    {activeTab === "rupees" ? "" : "₹"}
                  </div>
                  <input
                    type="number"
                    placeholder={activeTab === "rupees" ? "0.0000" : "0000"}
                    className="bg-transparent w-full pr-12 text-sm py-1  focus:outline-none text-white text-right"
                    value={
                      activeTab == "rupees"
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
                    {activeTab == "rupees" ? "gm" : ""}
                  </div>
                </div>
              </div>
              {validationError ? (
                <span className="text-red-500 text-sm">{validationError}</span>
              ) : (
                ""
              )}
              <p className="mt-3 text-lg pt-3">Quick Gift</p>
              {transactionType === "rupees" ? (
                <QuickGiftButtons
                  amounts={[50, 100, 500, 1000]}
                  unit="rupees"
                />
              ) : (
                <QuickGiftButtons amounts={[0.1, 0.5, 1, 2]} unit="gm" />
              )}
              <div className="mt-6">
                <p className="text-lg">Send to</p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form
                      className="pt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="">
                        <input
                          name="giftedUsers"
                          type="tel"
                          minLength={10}
                          maxLength={10}
                          placeholder="Enter Mobile Number"
                          value={values.giftedUsers}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            const updatedValue = value.replace(/[^0-9]/g, "");
                            setFieldValue("giftedUsers", updatedValue);
                            setMobile(+updatedValue);
                          }}
                          className="text-white text-lg p-2 px-4 rounded-lg bg-transparent border-1 w-full focus:outline-none focus:bg-transparent outline-none"
                        />
                        <ErrorMessage
                          name="giftedUsers"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="rounded-md items-center justify-center text-center bg-themeBlue text-black font-semibold mt-3 cursor-pointer"
                      >
                        <button
                          type="submit"
                          onClick={() => {
                            handleSubmit();
                          }}
                          disabled={isSubmitting}
                          className="p-2"
                        >
                          SEND GIFT
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* redeem part */}
      <div className="mt-4">
        <Redeem />
      </div>
      {/* faq part */}
      <div className="mt-4">
        <GiftFaq />
      </div>
    </div>
  );
};

export default GiftTab;
