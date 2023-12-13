'use client'
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { setEnteredAmount, setMetalPrice, setMetalType, setTransactionType } from "@/redux/giftSlice";
import Image from "next/image";
import { ParseFloat } from "@/components/helperFunctions";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { faqs } from "@/constants";

const GiftTab = () => {
  const dispatch = useDispatch();
  const [isgold, setIsGold] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [activeTab, setactiveTab] = useState("rupees");
  const metalType = useSelector((state: RootState) => state.gift.metalType);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const totalAmount = useSelector((state: RootState) => state.gift.totalAmount);
  const metalQuantity = useSelector((state: RootState) => state.gift.metalQuantity);
  const transactionType = useSelector((state: RootState) => state.gift.transactionType);
  const enteredAmount = useSelector((state: RootState) => state.gift.enteredAmount);
  const actualAmount = useSelector((state: RootState) => state.gift.actualAmount);


  useEffect(() => {
    console.table({ activeTab, metalType, metalQuantity, transactionType, enteredAmount, actualAmount })
  }, [activeTab, metalType, metalQuantity, transactionType, enteredAmount, actualAmount])

  useEffect(() => {
    dispatch(setMetalType("gold"));
    dispatch(setEnteredAmount(0));
    dispatch(setTransactionType('rupees'));
  }, [])

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? "gold" : "silver"));
    dispatch(setEnteredAmount(0));
    setValidationError("");
  };


  useEffect(() => {
    if (isgold) {
      dispatch(setMetalPrice(goldData.salePrice))
    } else {
      dispatch(setMetalPrice(silverData.salePrice))
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
    if (metalType == 'gold') {
      if (activeTab === "grams") {
        if (Number(e.target.value) > 5) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is 5gm only. Please change the amount.`);
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
      if (activeTab === "rupees") {
        if (enteredValue > (5 * goldData.salePrice)) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is ₹${5 * goldData.salePrice} only. Please change the amount.`);
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
    } else {
      if (activeTab === "grams") {
        if (Number(e.target.value) > 50) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is 50gm only. Please change the amount.`);
          return;
        } else {
          dispatch(setEnteredAmount(+enteredValue));
        }
      }
      if (activeTab === "rupees") {
        if (enteredValue > (50 * silverData.salePrice)) {
          setValidationError(
            `We appreciate your trust to Gift  ${metalType} on our platform, but our current limit for gifting is ₹${50 * silverData.salePrice} only. Please change the amount.`);
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

  return (
    <div className="w-full ">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-4 p-4 rounded-lg bg-themeLight text-white grid grid-cols-2 gap-6">
          <div>
            <img
              alt="gold-logo"
              className="p-8"
              src="/images/gift_gold_web.png"
            />
          </div>
          <div>
            {/* gifting section */}
            <div className="grid grid-cols-2 items-center">
              <div
                onClick={toggleMetal}
                className={`flex justify-center text-center py-3 rounded font-semibold cursor-pointer ${isgold === true
                  ? "bg-themeLight text-white active"
                  : "bg-themeLight01 text-sky-600"
                  }`}>
                <Image
                  src={"https://www.brightdigigold.com/images/gold-bars.svg"}
                  width={20}
                  height={20}
                  alt="digital gold"
                  className={`mr-2 cursor-pointer ${isgold === true ? 'opacity-100' : 'opacity-50'}`}
                />
                <div>Gold</div>
              </div>
              <div
                onClick={toggleMetal}
                className={`flex justify-center text-center py-3 rounded font-semibold cursor-pointer ${isgold === false
                  ? "bg-themeLight text-white active"
                  : "bg-themeLight01 text-sky-600"
                  }`}>
                <Image
                  src={"https://www.brightdigigold.com/images/silverBars.png"}
                  width={20}
                  height={20}
                  alt="digital gold"
                  className={`mr-2 cursor-pointer ${isgold === false ? 'opacity-100' : 'opacity-50'}`}
                />
                <div>Silver</div>
              </div>

            </div>
            {/* vault Balance */}
            <div className="grid grid-cols-2 justify-between items-center border-2 border-blue-400 p-2 rounded-md mt-4">
              <div className="flex items-center">
                <Image src="https://img.freepik.com/premium-vector/gift-box-isolated-white-background-cute-image-paper-gift-box-with-bow_118339-5292.jpg" className="mr-2" alt="digital gold gift" width={26} height={26} />
                <p className="text-2xl font-semibold ">Gift {isgold ? <span className="text-yellow-500">Gold</span> : <span className="text-white">Silver</span>}</p>
              </div>
              <div>
                <div className="flex items-center justify-end">
                  <div >
                    <Image src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-gold-coin-png-image_3779125.jpg" className="mr-2" alt="digital gold gift" width={36} height={36} />
                  </div>
                  <div>
                    <p className="text-sm">Weight</p>
                    {isgold ? <p>5.0023 gm</p> : <p>200.0023 gm</p>}
                  </div>
                  <div >
                    <Image src="https://thumbs.dreamstime.com/b/bank-vault-stack-gold-bars-d-render-ine-108980994.jpg" className="ml-4" alt="digital gold gift" width={60} height={36} />
                  </div>
                </div>
              </div>

            </div>
            <div className="flex flex-col py-2">
              <div className="flex justify-around border-yellow-400 border-2 rounded-full">
                <div
                  className={`text-center w-1/2 sm:text-sm rounded-tl-full rounded-bl-full py-3 px-6 font-semibold cursor-pointer ${activeTab === "rupees"
                    ? "bg-yellow-400 text-slate-800 active"
                    : "text-white "
                    }`}
                  onClick={() => handleTabRupeesAndGrams("rupees")}
                >
                  {activeTab === "buy" ? " In Rupees" : " In Rupees"}
                </div>
                <div
                  className={`text-center text-md w-1/2 sm:text-sm px-6 py-3 rounded-tr-full rounded-br-full font-semibold cursor-pointer ${activeTab === "grams"
                    ? "bg-yellow-400 text-slate-800 active"
                    : "text-white "
                    }`}
                  onClick={() => handleTabRupeesAndGrams("grams")}
                >
                  {activeTab === "buy" ? "In grams" : "In grams"}
                </div>
              </div>
              <div className="pt-2 mt-2 grid grid-cols-2 items-center gap-6 border border-yellow-500 font-extrabold p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    {activeTab == "rupees" ? "₹ " : ""}
                  </div>
                  <input
                    type="number"
                    className="bg-transparent pl-12 text-lg py-1 focus:outline-none text-white"
                    placeholder={
                      activeTab === "rupees" ? "0000" : "0.0000"
                    }
                    onChange={handleEnteredAmountChange}
                    step="0.0001"
                    value={enteredAmount === 0 ? "" : enteredAmount}
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
                    placeholder={
                      activeTab === "rupees" ? "0.0000" : "0000"
                    }
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
              <p className="mt-3 text-lg">Quick Gift</p>
              {transactionType === "rupees" ? (
                <QuickGiftButtons
                  amounts={[50, 100, 500, 1000]}
                  unit="rupees"
                />
              ) : (
                <QuickGiftButtons amounts={[0.1, 0.5, 1, 2]} unit="gm" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* redeem part */}
        <p className="text-white">redeem part</p>
      </div>
      <div>
        <div className=" col-span-2 p-4 rounded-lg bg-themeLight text-white">
          <p className="text-white text-center">GIFT FAQ</p>
          <dl className="mt-10 space-y-2 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white bg-themeLight px-4 py-2 rounded-lg">
                        <span className="text-sm font-semibold leading-5">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-1 pr-12 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900"
                    >
                      <p className="text-base leading-7 text-white">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default GiftTab;
