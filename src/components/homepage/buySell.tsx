"use client";
import { ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { useEffect, } from "react";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setEnteredAmount, setMetalPrice, setMetalType, setPurchaseType, setTransactionType } from "@/redux/shopSlice";
import { applyCoupon, clearCoupon, isCouponApplied, setCouponError } from "@/redux/couponSlice";
import Modal from "../modal";
import Timer from "../globalTimer";
import { useCoupons } from "@/customHooks/coupons";
import { ParseFloat } from "../helperFunctions";

const BuySell = () => {
  const dispatch = useDispatch();
  const [isgold, setIsGold] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('buy');
  const [activeTabPurchase, setActiveTabPurchase] = useState('rupees');
  const [validationError, setValidationError] = useState<string>("");
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
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



  const handleApplyCoupon = (coupon: any, amount: any,) => {
    dispatch(applyCoupon({ coupon, amount, goldPrice: goldData.totalPrice, metalType, transactionType }));
  };

  const handleClearCoupon = () => {
    dispatch(clearCoupon());
  };


  useEffect(() => {
    console.table({ error, appliedCouponCode, extraGoldOfRuppess, extraGold })
    console.table({ purchaseType, actualAmount, gst, metalType, transactionType, metalPricePerGram, totalAmount, enteredAmount, metalQuantity })
  }, [error, appliedCouponCode, extraGoldOfRuppess, extraGold, purchaseType, actualAmount, gst, totalAmount, metalType, transactionType, metalPricePerGram, enteredAmount, metalQuantity])

  const toggleMetal = () => {
    setIsGold(!isgold);
    dispatch(setMetalType(!isgold ? 'gold' : 'silver'));
    dispatch(setEnteredAmount(0));
    setValidationError('')
  };

  const toggleCoupon = () => {
    setShowCoupon(!showCoupon)
    dispatch(setCouponError(''))
  }

  const handleTabBuyAndSell = (tab: 'buy' | 'sell') => {
    setActiveTab(tab);
    dispatch(setPurchaseType(tab))
    dispatch(setEnteredAmount(0));
    setValidationError('')

  };

  const handleTabRupeesAndGrams = (tab: 'rupees' | 'grams') => {
    setActiveTabPurchase(tab);
    dispatch(setTransactionType(tab));
    dispatch(setEnteredAmount(0));
    setValidationError('')
  }

  let goldPriceWithGST = ParseFloat(`${(goldData.totalPrice * 0.03) + goldData.totalPrice}`, 2);
  const actualPurchasingInGm = 200000 / goldPriceWithGST;
  // console.log('actualPurchasingInGm', actualPurchasingInGm)

  const handleEnteredAmountChange = (e: any) => {
    const enteredValue = ParseFloat(e.target.value, 4)
    setValidationError('')
    if (activeTabPurchase === 'rupees') {
      if (enteredValue > 200000) {
        setValidationError(`We appreciate your trust to buy  ${metalType} on our platform, but our current limit is ₹2 lakhs only. Please change the amount.`);
        return;
      } else {
        dispatch(setEnteredAmount(+enteredValue));
      }
    }

    if (activeTabPurchase === 'grams') {
      console.log('actualPurchasingInGm', actualPurchasingInGm)
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
          className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
        >
          {unit === 'rupees' ? `₹${amount}` : `${amount}gm`}
        </button>
      ))}
    </div>
  );



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
        <div className="block pl-32">
          <div className="tab-bg  rounded-b-lg relative">
            <div className="grid grid-cols-2  ">
              <div
                className={`text-center py-3 rounded font-semibold cursor-pointer ${activeTab === 'buy'
                  ? 'bg-blue-600 text-white active'
                  : 'bg-blue-200 text-blue-800'
                  }`}
                onClick={() => {
                  handleTabBuyAndSell('buy')
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
                onClick={() => handleTabBuyAndSell('sell')}
              >
                SELL
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="">
                <div className="toggle_button_spacing" onChange={toggleMetal}>
                  <label className="toggle-button">
                    <input type="checkbox" />
                    <div className="slider"></div>
                    <div className="text-gold text-gold1">Silver</div>
                    <div className="text-silver text-silver1">Gold</div>
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
                    {metalType === 'gold' ? "GOLD PRICE" : "SILVER PRICE"}
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
                    )}/gm <div className="text-xs">{purchaseType === 'buy' ? "+ 3% GST" : ""}</div>
                  </div>
                  <p className="text-xs text-gray-400 pl-6">
                    24k 99.9% Pure Gold
                  </p>
                  <p className="text-xs font-base pl-6">
                    {isgold ? <div className={`${goldData.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {goldData.percentage >= 0 ? <ArrowUpIcon className="h-4 inline-block text-green-500" /> : <ChevronDownIcon className="h-4 inline-block text-red-500" />}
                      {goldData.percentage} %
                    </div> : <div className={`${silverData.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {silverData.percentage >= 0 ? <ArrowUpIcon className="h-4 inline-block" /> : <ChevronDownIcon className="h-4 inline-block" />}
                      {silverData.percentage} %
                    </div>}

                    <div className="text-white ml-2">Since Yesterday</div>
                  </p>

                  <p className="timer mt-4 text-xs py-1 pl-6 flex">
                    <div className="pl-1"> <Timer /></div>
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
              <div className="bg-blue-400 rounded flex justify-around   py-2">
                <div
                  className={`text-center px-9 py-2 rounded-lg font-semibold cursor-pointer ${activeTabPurchase === 'rupees'
                    ? 'bg-blue-300 text-blue-800 active'
                    : 'text-blue-200 '
                    }`}
                  onClick={() => handleTabRupeesAndGrams('rupees')}
                >
                  {purchaseType === 'buy' ? "Buy in Rupees" : "Sell in Rupees"}
                </div>
                <div
                  className={`text-center px-9 py-2 rounded font-semibold cursor-pointer ${activeTabPurchase === 'grams'
                    ? 'bg-blue-300 text-blue-800  active'
                    : 'text-blue-200'
                    }`}
                  onClick={() => handleTabRupeesAndGrams('grams')}
                >
                  {purchaseType === 'buy' ? "Buy in grams" : "Sell in grams"}                </div>
              </div>
              <div className="pt-2 mt-2 grid grid-cols-2 items-center gap-6 border border-yellow-500 font-extrabold p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    {activeTabPurchase == 'rupees' ? '₹ ' : ''}
                  </div>
                  <input
                    type="number"
                    className="bg-transparent pl-8 text-lg py-1 focus:outline-none text-white"
                    placeholder={activeTabPurchase === 'rupees' ? '0000' : '0.0000'}
                    onChange={handleEnteredAmountChange}
                    step='0.0001'
                    value={enteredAmount === 0 ? '' : enteredAmount}
                    onKeyDown={(e) => {
                      // Prevent the input of a decimal point if purchase type is rupees
                      if (activeTabPurchase === 'rupees' && e.key === '.') {
                        e.preventDefault();
                      }
                      // Prevent entering negative values
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-20">
                    {activeTabPurchase === 'rupees' ? ' ' : '₹'}
                  </div>
                  <input
                    type="number"
                    placeholder={activeTabPurchase === 'rupees' ? '0.0000' : '00'}
                    className="bg-transparent pr-10 text-sm py-1 focus:outline-none text-white text-right"
                    value={activeTabPurchase == 'rupees' ? metalQuantity === 0 ? '' : metalQuantity : totalAmount === 0 ? '' : totalAmount}
                    readOnly
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                    {/* gm */}
                  </div>
                </div>
              </div>
              {validationError ? (
                <span className="text-red-500 text-sm">{validationError}</span>
              ) : (
                ""
              )}

              <div className="text-white text-md mt-4">{purchaseType === 'buy' ? "Quick Buy" : 'Quick Sell'}</div>
              {transactionType === 'rupees' ? (
                <QuickBuySellButtons
                  amounts={[50, 100, 500, 1000]}
                  unit="rupees"
                />
              ) : (
                <QuickBuySellButtons
                  amounts={[0.1, 0.5, 1, 2]}
                  unit="gm"
                />
              )}

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

              {isgold && purchaseType === 'buy' &&
                <div>
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
                      <div>
                        {showCoupon ? (
                          <ChevronUpIcon onClick={toggleCoupon} className="h-8" />
                        ) : (
                          <ChevronDownIcon onClick={toggleCoupon} className="h-8" />
                        )}
                      </div>

                    </button>

                  </div>
                  {error && <div className="text-red-500 text-xs">{error}</div>}

                  {showCoupon && coupons?.map((coupon: any) => (
                    <div key={coupon._id}>
                      <p className="text-white">{coupon.description}</p>
                      <button className="bg-blue-400 rounded cursor-pointer text-white p-2" onClick={() => handleApplyCoupon(coupon, enteredAmount)}>
                        Apply Coupon
                      </button>
                    </div>
                  ))} </div>}
              <div className="mt-12">
                <button onClick={openModal} className="w-full bg-blue-200 rounded-lg py-2">
                  Start Investing
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
