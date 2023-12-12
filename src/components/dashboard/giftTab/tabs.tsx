'use client'
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { setMetalType } from "@/redux/shopSlice";
import Image from "next/image";
import { ParseFloat } from "@/components/helperFunctions";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const GiftTab = () => {
  const [isgold, setIsGold] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [activeTabPurchase, setActiveTabPurchase] = useState("rupees");
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const [enteredAmount, setenteredAmount] = useState(0)
  const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
  const metalQuantity = useSelector(
    (state: RootState) => state.shop.metalQuantity
  );
  const transactionType = useSelector(
    (state: RootState) => state.shop.transactionType
  );

  const purchaseType = useSelector(
    (state: RootState) => state.shop.purchaseType
  );

  const toggleMetal = () => {
    setIsGold(!isgold);
    // dispatch(setMetalType(!isgold ? "gold" : "silver"));
    // dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  const handleTabRupeesAndGrams = (tab: "rupees" | "grams") => {
    setActiveTabPurchase(tab);
    // dispatch(setTransactionType(tab));
    // dispatch(setEnteredAmount(0));
    setValidationError("");
  };

  let goldPriceWithGST = ParseFloat(
    `${goldData.totalPrice * 0.03 + goldData.totalPrice}`,
    2
  );
  const actualPurchasingInGm = 200000 / goldPriceWithGST;

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
        // dispatch(setEnteredAmount(+enteredValue));
      }
    }

    if (activeTabPurchase === "grams") {
      console.log("actualPurchasingInGm", actualPurchasingInGm);
      if (Number(e.target.value) > actualPurchasingInGm) {
        setValidationError("Amount should be less than 2 lakhs");
        return;
      } else {
        // dispatch(setEnteredAmount(+enteredValue));
      }
    }
  };

  const QuickBuySellButtons = ({ amounts, unit, onClickHandler }: any) => (
    <div className="mt-4 flex justify-between">
      {amounts.map((amount: any) => (
        <button
          key={amount}
          onClick={() => {
            // dispatch(setEnteredAmount(amount));
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
            <div className="flex flex-col py-2">
              <div className="flex justify-around border-yellow-400 border-2 rounded-md">
                <div
                  className={`text-center text-xxs w-1/2 sm:text-sm px-9 py-2 rounded-md font-semibold cursor-pointer ${activeTabPurchase === "rupees"
                    ? "bg-yellow-400 text-white active"
                    : "text-white"
                    }`}
                  onClick={() => handleTabRupeesAndGrams("rupees")}
                >
                  {purchaseType === "buy" ? " In Rupees" : " In Rupees"}
                </div>
                <div
                  className={`text-center text-xxs w-1/2 sm:text-sm px-9 py-2 rounded-md font-semibold cursor-pointer ${activeTabPurchase === "grams"
                    ? "bg-yellow-400 text-white active"
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
              {transactionType === "rupees" ? (
                <QuickBuySellButtons
                  amounts={[50, 100, 500, 1000]}
                  unit="rupees"
                />
              ) : (
                <QuickBuySellButtons amounts={[0.1, 0.5, 1, 2]} unit="gm" />
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
