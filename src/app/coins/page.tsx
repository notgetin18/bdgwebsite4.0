'use client'
import { funcForDecrypt } from "@/components/helperFunctions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/api/DashboardServices";

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
        setProductList(x.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
        <Image
          src={"https://www.brightdigigold.com/images/product-banner.png"}
          alt="Product"
          width={1500}
          height={300}
        />
      </div>
      <div className="flex mt-4 items-center justify-between">
        <div>
          <div className="text-white   mt-10 flex items-center ">
            <p className="text-3xl">Coins</p>
            <div onClick={() => { handleTabClick("ALL") }} className="ml-4 cursor-pointer text-2xl">All</div>
            <div onClick={() => { handleTabClick("GOLD") }} className="ml-4 cursor-pointer text-2xl">Gold</div>
            <div onClick={() => { handleTabClick("SILVER") }} className="ml-4 cursor-pointer text-2xl">Silver</div>
          </div>
        </div>
        <div className="text-white flex items-center bg-blue-300 rounded-md p-2">
          <Image src={"https://www.brightdigigold.com/images/gold-bars.svg"} width={40} height={80} alt="vault" />
          <div className="text-white ml-4 border-r-2 border-slate-400">
            <p>Gold</p>
            <p>0.9825 GM</p>
          </div>
          <div className="ml-6 text-white">
            <p >Silver</p>
            <p>0.0985 GM</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ProductList.map((item, index) => (
          <div key={index} className="p-2 rounded-md shadow-xl text-center bg-themeLight01 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div>
              <Image src={item.image.image} alt="coin image" width={150} height={90} />
            </div>
            <div className="mt-2 text-white">{item.name}</div>
            <div className="text-gray-400 items-center">Making charges <span className="text-2xl font-bold ml-1">₹{item.makingcharges}</span></div>
            <button className=" bg-blue-100 rounded-2xl font-extrabold  px-16 py-2">VIEW</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coins;
