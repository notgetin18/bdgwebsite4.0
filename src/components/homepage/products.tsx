import Link from "next/link";
import React from "react";
const products = [
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/product/gold/1gm/Group+24.png",
    name: "1 Gram Gold Coin",
    href: "#",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/product/gold/1gm/Group+24.png",
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
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl">Our Coins</h1>
          <Link
            href="#"
            className="bg-themeLight px-3 py-1 text-md text-white rounded border border-gray-500"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">
          {products.map((item, index) => (
            <div className="bg-themeLight rounded p-4 relative">
              <div className="relative">
                <img
                  alt="products"
                  className=" absolute left-0"
                  src="/images/star1.png"
                />
                <img
                  alt="products"
                  className=" absolute right-0"
                  src="/images/star1.png"
                />
              </div>

              <div className="">
                <img
                  alt="products"
                  className="h-52 mx-auto mt-10"
                  src={item.img}
                />
              </div>
              <p className="mt-6 text-center font-bold text-white">
                {item.name}
              </p>

              <Link
                href={item.href}
                className="theme-btn w-full py-2 mt-6 text-center"
              >
                {/* <img
                  alt="buy"
                  width="30"
                  height="30"
                  className="inline-block"
                  src="/images/buy.png"
                ></img> */}
                Buy Coin
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
