"use client";
import { funcForDecrypt } from "@/components/helperFunctions";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/api/DashboardServices";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";

const Coins = () => {
  const [ProductList, setProductList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const getAllProducts = async (params: any) => {
    try {
      let url = `/public/products?limit=50&page=0`;
      if (params) {
        url = `/public/products?limit=50&page=0&metal=${params}`;
      }
      const response = await api.get(url);
      if (response.status) {
        const coins = await funcForDecrypt(response.data.payload);
        const x = JSON.parse(coins);
        // console.log("x", x)
        setProductList(x.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getAllProducts("ALL");
  }, []);

  // console.log("products", ProductList);

  const handleTabClick = (tab: "ALL" | "GOLD" | "SILVER") => {
    setActiveTab(tab);
    getAllProducts(tab);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <img
          src={"/lottie/product banner copy.jpg"}
          alt="Product"
          className="rounded-b"
        />
      </div>
      <div className="lg:flex flex-row md:flex-row mt-4 md:items-center md:justify-between p-3 rounded-md">
        <div className="sm:flex items-center">
          <p className="text-2xl text-white mr-4">Coins</p>
          <div className="mb-4 md:mb-0 md:mr-4 bg-themeLight px-3 py-2 rounded-md">
            <div className="text-white flex items-center">
              <div
                onClick={() => {
                  handleTabClick("ALL");
                }}
                className={`ml-2 cursor-pointer text-lg border-r-2 border-slate-400 pr-4 ${
                  activeTab === "ALL" ? "opacity-100 extrabold" : "opacity-50"
                }`}
              >
                All
              </div>
              <img
                src={
                  "https://imagesbdg.sgp1.digitaloceanspaces.com/a0cd4a0a-0816-4029-aa0d-ad4c6792701a"
                }
                alt="digital gold bar"
                className={`ml-2 h-5 cursor-pointer ${
                  activeTab === "GOLD" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => {
                  handleTabClick("GOLD");
                }}
              />
              <div
                onClick={() => {
                  handleTabClick("GOLD");
                }}
                className={`ml-2 cursor-pointer text-lg border-r-2 border-slate-400 pr-4 ${
                  activeTab === "GOLD" ? "opacity-100" : "opacity-50"
                }`}
              >
                Gold
              </div>
              <img
                src={
                  "https://imagesbdg.sgp1.digitaloceanspaces.com/78b932b1-cff6-4aa5-b0ea-17f264703802"
                }
                alt="digital gold bar"
                className={`ml-2 h-5 cursor-pointer ${
                  activeTab === "SILVER" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => {
                  handleTabClick("SILVER");
                }}
              />
              <div
                onClick={() => {
                  handleTabClick("SILVER");
                }}
                className={`ml-2 cursor-pointer text-lg ${
                  activeTab === "SILVER" ? "opacity-100" : "opacity-50"
                }`}
              >
                Silver
              </div>
            </div>
          </div>
        </div>
        <div className="text-white mt-4 lg:mt-0 sm:divide-x sm:flex items-center bg-themeLight rounded-md px-3 p-2">
          <div className="flex items-center">
            <img src={"Goldbarbanner.png"} className="h-5" alt="vault" />
            <div className="text-white ml-2 pr-4 flex">
              <p className="text-yellow-300 font-extrabold mr-2">Gold :</p>
              <p className="text-yellow-300">0.9825 GM</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src={"/SilverBar.png"} className="h-5 sm:ml-4" alt="vault" />
            <div className="ml-2 flex">
              <p className="text-slate-200 font-extrabold mr-2">Silver :</p>
              <p className="text-slate-200 font-semibold">0.0985 GM</p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div
          variants={fadeIn("right", "spring", 0.25, 0.25)}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
        >
          {ProductList.map((item, index) => (
            <div
              key={index}
              className="py-4 rounded-md shadow-xl text-center coins_background transition-transform transform hover:scale-105  hover:shadow-lg hover:shadow-yellow-500"
            >
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "bottom",
                  backgroundImage: `url(${
                    item.iteamtype.toLowerCase() === "gold"
                      ? "/images/goldpart.png"
                      : "/images/silverpart.png"
                  })`,
                }}
                className=""
              >
                <div className="flex flex-col items-center px-2">
                  <div>
                    <Image
                      src={item.image.image}
                      alt="coin image"
                      width={150}
                      height={90}
                    />
                  </div>
                  <div className="mt-2 text-xs sm:text-base text-white">
                    {item.name}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-lg items-center">
                    Making charges
                    <span className="text-base sm:text-2xl font-bold ml-1">
                      ₹{item.makingcharges}
                    </span>
                  </div>
                  <Link
                    href={`/coins/${item.slug}`}
                    className="my-2 bg-blue-100 rounded-2xl font-extrabold w-3/4 py-2 block"
                  >
                    VIEW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Coins;
