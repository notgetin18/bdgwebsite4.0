'use client'
import { funcForDecrypt } from "@/components/helperFunctions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/api/DashboardServices";
import { useRouter } from 'next/navigation'
import Link from "next/link";



const Coins = () => {
  const [ProductList, setProductList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const router = useRouter();
  


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
        console.log("x", x)
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

  const gotoDetailPage = (item: any) => {
    router.push("/coins/[slug]")
  }
  return (
    <div className="container mx-auto coins_backgroun">
      <div className="flex justify-center items-center">
        <Image
          src={"https://www.brightdigigold.com/images/product-banner.png"}
          alt="Product"
          width={1500}
          height={300}
        />
      </div>
      <div className="flex flex-row md:flex-row mt-4 md:items-center md:justify-between bg-slate-600 p-3 rounded-md">
        <div className="mb-4 md:mb-0 md:mr-4">
          <div className="text-white flex items-center">
            <div onClick={() => { handleTabClick("ALL") }} className={`ml-4 cursor-pointer text-2xl border-r-2 border-slate-400 pr-4 ${activeTab === 'ALL' ? 'opacity-100' : 'opacity-50'}`}>All</div>
            <Image
              src={"https://imagesbdg.sgp1.digitaloceanspaces.com/a0cd4a0a-0816-4029-aa0d-ad4c6792701a"}
              width={35}
              height={40}
              alt="digital gold bar"
              className={`ml-2 cursor-pointer ${activeTab === 'GOLD' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => { handleTabClick("GOLD") }}
            />
            <div onClick={() => { handleTabClick("GOLD") }} className={`ml-1 cursor-pointer text-2xl border-r-2 border-slate-400 pr-4 ${activeTab === 'GOLD' ? 'opacity-100' : 'opacity-50'}`}>Gold</div>
            <Image
              src={"https://imagesbdg.sgp1.digitaloceanspaces.com/78b932b1-cff6-4aa5-b0ea-17f264703802"}
              width={35}
              height={40}
              alt="digital gold bar"
              className={`ml-2 cursor-pointer ${activeTab === 'SILVER' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => { handleTabClick("SILVER") }}
            />
            <div onClick={() => { handleTabClick("SILVER") }} className={`ml-1 cursor-pointer text-2xl ${activeTab === 'SILVER' ? 'opacity-100' : 'opacity-50'}`}>Silver</div>
          </div>
        </div>
        <div className="text-white flex items-center bg-blue-300 rounded-md p-2 ">
          <Image src={"https://www.brightdigigold.com/images/gold-bars.svg"} width={40} height={80} alt="vault" />
          <div className="text-white ml-4 border-r-4 border-slate-400 pr-4">
            <p className="text-black font-extrabold">Gold</p>
            <p className="text-yellow-300">0.9825 GM</p>
          </div>
          <div className="ml-6">
            <p className="text-black font-extrabold">Silver</p>
            <p className="text-slate-600 font-semibold">0.0985 GM</p>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {ProductList.map((item, index) => (
          <div key={index} className=" py-4 rounded-md shadow-xl text-center coins_background transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <div>
                <Image src={item.image.image} alt="coin image" width={150} height={90} />
              </div>
              <div className="mt-2 text-white">{item.name}</div>
              <div className="text-gray-400 items-center">Making charges <span className="text-2xl font-bold ml-1">₹{item.makingcharges}</span></div>
              <Link
                href={`/coins/${item.slug}`}
                className="m-2 bg-blue-100 rounded-2xl font-extrabold   px-14 py-2">VIEW</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coins;
