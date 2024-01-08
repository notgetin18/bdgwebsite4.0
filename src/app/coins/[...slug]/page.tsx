"use client";
import { api } from "@/api/DashboardServices";
import CustomButton from "@/components/customButton";
import {
  AesDecrypt,
  ParseFloat,
  funcForDecrypt,
} from "@/components/helperFunctions";
import BottomSidebar from "@/components/modals/bottomAsideCoin";
import CoinModal from "@/components/modals/buyCoinModal";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SimpleImageSlider from "react-simple-image-slider";

const page = ({ params }: any) => {
  const id = params.slug;
  const [productsDetailById, setProductDetailById] = useState<any>();
  const [quantity, setQuantity] = useState<number>(1);
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const formRef = useRef<HTMLFormElement>(null);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [delivery, setDeliverey] = useState<boolean>(false);
  const [photo, setphoto] = useState<[]>([]);
  const [openCoinModal, setOpenCoinModal] = useState<boolean>(false)
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openCoinModalHandler = () => {
    setOpenCoinModal(true)
  }
  const closeCoinModalHandler = () => {
    setOpenCoinModal(false)
  }


  const getProductById = async () => {
    try {
      const response = await api.get(`/public/product/${id}/details`);
      if (response.status) {
        const responseOfApi = await funcForDecrypt(response.data.payload);
        const productDetails = JSON.parse(responseOfApi);
        setProductDetailById(productDetails.data);
        setphoto(productDetails.data.image);
      }
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const increaseQty = () => {
    if (quantity <= 9) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pincodeValue = e.currentTarget.pincode.value;
    // Validate pincode
    if (!pincodeValue) {
      setPincodeError("Please enter a 6-digit pincode.");
      return;
    }
    if (pincodeValue.toString() < 6) {
      setPincodeError("Please enter a 6-digit pincode.");
      return;
    }
    if (!pincodeValue.match(/^\d{6}$/)) {
      setPincodeError("Invalid pincode. Please enter a 6-digit pincode.");
      return;
    } else {
      setPincodeError(null);
    }

    // Handle form submission logic here
    // console.log("Form submitted:", pincodeValue);
    try {
      // console.log('pincode2', pincodeValue);
      const token = localStorage.getItem("token");
      const configHeaders = {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.baseUrl}/user/ecom/pincode/${pincodeValue}`,
        configHeaders
      );
      const decryptedData = AesDecrypt(response.data.payload);
      const finalResult = JSON.parse(decryptedData);
      // console.log('finalResult', finalResult)
      if (finalResult.data.length > 0) {
        setDeliverey(true);
        setPincodeError(`Available at ${pincodeValue} pincode`);
      } else {
        setDeliverey(false);
        setPincodeError(`Not available at ${pincodeValue} pincode`);
      }
    } catch (error: any) {
      setPincodeError(error);
    }
  };

  if (!productsDetailById) {
    return <div className="text-white">Loading...</div>;
  }
  // console.log('productsDetailById', productsDetailById)

  return (
    <div className="container py-16 text-white">
      {openCoinModal && <CoinModal productsDetailById={productsDetailById} openModalOfCoin={openCoinModal}
        closeModalOfCoin={closeCoinModalHandler} />}

      <BottomSidebar productsDetailById={productsDetailById} isOpen={isSidebarOpen} onClose={handleToggleSidebar} />

      <div className="grid xl:grid-cols-5 gap-12">
        <div className="col-span-5 xl:col-span-2 relative">
          {/* Absolute positioning for out-of-stock image */}
          {!productsDetailById.inStock && (
            <div className="bg-red-600 absolute top-0 right-0 px-2  rounded-bl-lg">
              <p className="font-medium">Out Of Stock</p>
            </div>
          )}
          <div className="hidden sm:block bg-themeLight rounded p-4">
            <SimpleImageSlider
              width={400}
              height={400}
              images={photo}
              showBullets={true}
              style={{ margin: "0 auto" }}
              showNavs={false}
              loop={true}
              autoPlay={true}
              bgColor="#red"
              autoPlayDelay={2.0}
              slideDuration={0.5}
            />
          </div>
          <div className="block sm:hidden bg-themeLight rounded p-4">
            <SimpleImageSlider
              width={250}
              height={250}
              images={photo}
              showBullets={true}
              style={{ margin: "0 auto" }}
              showNavs={false}
              loop={true}
              autoPlay={true}
              bgColor="#red"
              autoPlayDelay={2.0}
              slideDuration={0.5}
            />
          </div>
          <div className="mt-4">
            <div className="cursor-pointer bg-themeBlue text-black w-full block text-center py-3 rounded">
              Add to cart
            </div>
            <CustomButton
              title="Buy Now"
              containerStyles="cursor-pointer bg-themeBlue text-black mt-4 w-full text-center py-3 rounded"
              isDisabled={productsDetailById.inStock} // Disable the button when product  is out of stock
              handleClick={() => { openCoinModalHandler() }}
            />
            <button
              onClick={handleToggleSidebar}
              className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
            >
              Open Sidebar
            </button>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="mb-2 sm:text-lg extrabold">
                {productsDetailById.name}
              </div>
              <div className="mb-2 text-base sm:text-lg">
                Total Price{" "}
                <span className="text-yellow-500">
                  ₹
                  {ParseFloat(
                    +productsDetailById.weight *
                    quantity *
                    (productsDetailById.iteamtype === "GOLD"
                      ? goldData.totalPrice
                      : silverData.totalPrice),
                    2
                  )}
                </span>
                <span className="text-yellow-500"> +3% GST</span>
              </div>
              <div className="text-base sm:text-lg">
                Making Charge ₹{productsDetailById.makingcharges}
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-themeLight">
              <div onClick={decreaseQty} className={styles.p1}>
                -
              </div>
              <div className="">{quantity}</div>
              <div onClick={increaseQty} className={styles.p2}>
                +
              </div>
            </div>
          </div>
          {/* pin code */}
          <div className="py-2 mt-4">
            <form ref={formRef} onSubmit={handleFormSubmit}>
              <label className="text-sm">Check pincode availability</label>
              <br />
              <div className="rounded-md bg-themeLight px-4 py-2 relative">
                <input
                  name="pincode"
                  type="tel"
                  className="text-white bg-transparent w-full focus:outline-none h-8"
                  placeholder="Enter Your Pincode"
                  maxLength={6}
                  // pattern="\d{6}"
                  // required
                  onChange={(event) => {
                    const { value } = event.target;
                    const updatedValue = value.replace(/[^0-9]/g, "");
                    event.target.value = updatedValue;
                    setPincodeError(null); // Clear pincode error on input change
                  }}
                />
                <button
                  className=" absolute right-4 rounded-xl text-yellow-400 border border-yellow-400 px-5 py-1"
                  type="submit"
                >
                  Check
                </button>
              </div>
              {pincodeError && delivery == true ? (
                <div className="text-green-500">{pincodeError}</div>
              ) : (
                <div className="text-red-500">{pincodeError}</div>
              )}
            </form>
          </div>
          {/*coin description */}
          <div className="bg-themeLight px-4 py-4 rounded-md mt-4">
            <p className="text-sm">{productsDetailById.description}</p>

            <div className="grid grid-cols-4 mt-4">
              <div className=" text-center px-2">
                <img
                  src={"/24K guaranteed .png"}
                  alt="icons"
                  className="mx-auto mb-2 h-12 sm:h-20"
                />
                <p className="font-8x sm:text-base">
                  24K Guaranteed <br /> Quality Certified
                </p>
              </div>
              <div className="text-center px-2">
                <img
                  src={"/Free Insurance.png"}
                  alt="icons"
                  className="mx-auto mb-2  h-12 sm:h-20"
                />
                <p className="font-8x sm:text-base">
                  Free Insurance <br /> on Delivery
                </p>
              </div>
              <div className="text-center px-2">
                <img
                  src={"/order tracking support.png"}
                  alt="icons"
                  className="mx-auto mb-2   h-12 sm:h-20"
                />
                <p className="font-8x sm:text-base">
                  Order Tracking &<br />
                  Support
                </p>
              </div>
              <div className="text-center px-2">
                <img
                  src={"/zero negative.png"}
                  alt="icons"
                  className="mx-auto mb-2 h-12 sm:h-20"
                />
                <p className="font-8x sm:text-base">
                  Zero negative <br /> weight tolerance
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mt-4">
                <p>
                  <span className=" w-32 inline-block">Weight</span> :
                  <span className="pl-2"></span>
                  {productsDetailById.weight}
                </p>
              </div>
              <div className="mt-4">
                <p>
                  <span className=" w-32 inline-block">Metal Purity</span> :
                  <span className="pl-2"></span>
                  {productsDetailById.purity}
                </p>
              </div>
              <div className="mt-4">
                <p>
                  {" "}
                  <span className=" w-32 inline-block">Dimension </span> :
                  <span className="pl-2"></span>
                  {productsDetailById.dimension}
                </p>
              </div>
              <div className="mt-4">
                <p>
                  <span className="w-32 inline-block">Quality </span> :
                  <span className="pl-2"></span>
                  {productsDetailById.quality}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  p1: "m-2 w-6 sm:w-8 px-2 sm:px-3 sm:py-1 font-bold text-lg text-red-500 cursor-pointer rounded-md bg-themeLight",
  p2: "m-2 w-6 sm:w-8 px-2 sm:px-3 sm:py-1 font-bold text-lg text-green-500 cursor-pointer rounded-md bg-themeLight",
};

export default page;
