import Link from "next/link";
import React from "react";
const products = [
  {
    img: "/goldcoin.png",
    name: "1 Gram Gold Coin",
    href: "#",
  },
  {
    img: "/Banyan Tree silver coin.png",
    name: "2 Gram Gold Coin",
    href: "#",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/product/gold/1gm/Group+24.png",
    name: "3 Gram Gold Coin",
    href: "#",
  },
];
const Products = () => {
  return (
    <div className="bg-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl">Our Coins</h1>
          <Link
            href="#"
            className="bg-themeLight px-3 py-1 text-md text-white rounded border border-gray-500"
          >
            View All
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-themeLight rounded-lg shadow-xl p-4 relative">
            <div className="relative">
              <img
                alt="products"
                className=" absolute left-0"
                src="/Light_1.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_2.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_3.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_4.png"
              />
            </div>

            <div className="">
              <img
                alt="products"
                className="h-40 mx-auto mt-10"
                src="/goldcoin.png"
              />
            </div>
            <p className="mt-6 text-center font-bold text-white">
              1 Gram Gold Coin
            </p>

            <Link
              href="#"
              className="bg-themeBlue w-full block rounded-full py-2 mt-6 text-center"
            >
              View
            </Link>
          </div>
          <div className="bg-themeLight rounded-lg shadow-xl p-4 relative">
            <div className="relative">
              <img
                alt="products"
                className=" absolute left-0"
                src="/Star_1.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Star_3.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Star_4.png"
              />
            </div>

            <div className="">
              <img
                alt="products"
                className="h-40 mx-auto mt-10"
                src="/BanyanTree.png"
              />
            </div>
            <p className="mt-6 text-center font-bold text-white">
              10 Gram banyan Tree
            </p>

            <Link
              href="#"
              className="bg-themeBlue w-full block rounded-full py-2 mt-6 text-center"
            >
              View
            </Link>
          </div>

          <div className="bg-themeLight rounded-lg shadow-xl p-4 relative">
            <div className="relative">
              <img
                alt="products"
                className=" absolute left-0"
                src="/Light_1.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_2.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_3.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Light_4.png"
              />
            </div>

            <div className="">
              <img
                alt="products"
                className="h-40 mx-auto mt-10"
                src="/goldcoin.png"
              />
            </div>
            <p className="mt-6 text-center font-bold text-white">
              10 Gram Gold Coin
            </p>

            <Link
              href="#"
              className="bg-themeBlue w-full block rounded-full py-2 mt-6 text-center"
            >
              View
            </Link>
          </div>
          <div className="bg-themeLight rounded-lg shadow-xl p-4 relative">
            <div className="relative">
              <img
                alt="products"
                className=" absolute left-0"
                src="/Star_1.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Star_3.png"
              />
              <img
                alt="products"
                className=" absolute right-0"
                src="/Star_4.png"
              />
            </div>

            <div className="">
              <img
                alt="products"
                className="h-40 mx-auto mt-10"
                src="/BanyanTree.png"
              />
            </div>
            <p className="mt-6 text-center font-bold text-white">
              100 Gram banyan Tree
            </p>

            <Link
              href="#"
              className="bg-themeBlue w-full block rounded-full py-2 mt-6 text-center"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
