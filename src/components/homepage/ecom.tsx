import Link from "next/link";
import React from "react";

const Ecom = () => {
  return (
    <div className="bg-themeYellow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-6 place-items-center">
          <div className="">
            <img alt="products" className="h-40 mx-auto" src="/goldcoin.png" />
          </div>
          <div>
            <h1 className=" text-right font-bold text-3xl text-gray-700">
              Buy Gold and Silver <br />
              Coins
            </h1>
            <Link
              href="#"
              className="text-black text-sm px-6 py-3 rounded-md float-right mt-4 sm:mt-8 bg-yellow-400"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecom;
