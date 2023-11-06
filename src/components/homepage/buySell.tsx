"use client";
import { ArrowUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../helperFunctions";
import Image from "next/image";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

const tabs = [
  { name: "Buy", href: "#", current: true },
  { name: "Sell", href: "#", current: false },
];

const BuySell = () => {
  const [enabled, setMetal] = useState(false);
  const [isgold, setIsGold] = useState(true);

  const toggleGold = () => {
    setIsGold(!isgold);
  };

  return (
    <>
      <div>
        <div className="block pl-32">
          <nav className="isolate flex shadow" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "text-white tab-activeBg"
                    : "text-gray-500 tab-bg",
                  tabIdx === 0 ? "rounded-tl-lg" : "",
                  tabIdx === tabs.length - 1 ? " rounded-tr-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-lg font-medium focus:z-10"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? "" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
          <div className="tab-bg py-4 rounded-b-lg relative">
            <div className="grid grid-cols-2">
              <div className="">
                <div className="toggle_button_spacing" onChange={toggleGold}>
                  <label className="toggle-button">
                    <input type="checkbox" />
                    <span className="slider"></span>
                    <span className="text-gold text-gold1">Silver</span>
                    <span className="text-silver text-silver1">Gold</span>
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
                    GOLD PRICE
                  </p>
                  <p className="text-gold01 text-xl font-bold py-2 pb-0 pl-6">
                    ₹6177.90/gm <span className="text-xs"> + 3% GST</span>
                  </p>
                  <p className="text-xs text-gray-400 pl-6">
                    24k 99.9% Pure Gold
                  </p>
                  <p className="text-xs font-base pl-6">
                    <span className="text-green-500">
                      <ArrowUpIcon className="h-4 inline-block" />0 %
                    </span>
                    <span className="text-white ml-2">Since Yesterday</span>
                  </p>
                  {/* 
                  <p className="timer mt-4 text-xs py-1 pl-6">
                    Gold rate expires in 2:20
                  </p> */}
                </div>
              </div>
              <div className=" flex justify-end items-center pr-12">
                <Image
                  className={`coin_transition ${
                    isgold ? "gold_coin" : "silver_coin"
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
              <div className=" flex justify-around">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Buy in Rupees
                </label>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Buy in Grams
                </label>
              </div>
              <div className="grid grid-cols-2 items-center gap-6 border border-white p-1 rounded-lg">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute text-white text-lg inset-y-0 left-0 flex items-center pl-3">
                    ₹
                  </div>
                  <input
                    type="number"
                    className=" bg-transparent pl-8 text-lg py-1 focus:outline-none text-white"
                    max={9}
                    placeholder="000"
                    // value=""
                  />
                </div>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    className="bg-transparent pr-10 text-sm py-1 focus:outline-none text-white text-right"
                    max={9}
                    placeholder="000"
                    // value=""
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                    gm
                  </div>
                </div>
              </div>

              <p className="text-white text-md mt-4"> Quick Buy</p>
              <div className="mt-4 flex justify-between">
                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +₹50
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +₹100
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +0.5 gm
                </Link>

                <Link
                  href="#"
                  className="bg-themeLight rounded-full py-2 px-5 text-white text-sm"
                >
                  +1.0 gm
                </Link>
              </div>
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
                  <ChevronDownIcon className="h-8" />
                </button>
              </div>

              <div className="mt-12">
                <button className="w-full bg-blue-200 rounded-lg py-2">
                  Start Investing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
