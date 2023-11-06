"use client";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../helperFunctions";
import Image from "next/image";

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
          <div className="grid grid-cols-2 bg-red-500">
            <div className="">
              <div className="toggle_button_spacing" onChange={toggleGold}>
                <label className="toggle-button">
                  <input type="checkbox" />
                  <span className="slider"></span>
                  <span className="text-gold text-gold1">Silver</span>
                  <span className="text-silver text-silver1">Gold</span>
                </label>
              </div>
            </div>

            <div className="">
              <Image
                className={`coin_transition ${
                  isgold ? "gold_coin" : "silver_coin"
                }`}
                src={
                  isgold
                    ? "	https://www.brightdigigold.com/images/Maskgold.svg"
                    : "https://www.brightdigigold.com/images/Masksilver.svg"
                }
                alt="coin image"
                loading="lazy"
                width={240}
                height={260}
              />
            </div>
            <div className="bg-blue-300">
              <div className="w-1/2">
                <p className="text-white text-xs pl-6">
                  LIVE 24K 99.9% GOLD PRICE
                </p>
                <p className="text-gold01 text-lg font-bold py-2 pl-6">
                  ₹6177.90/gm <span className="text-sm"> + 3% GST</span>
                </p>
                <p className="text-xs font-base pl-6">
                  <span className="text-green-500">
                    <ArrowUpIcon className="h-4 inline-block" />0 %
                  </span>
                  <span className="text-white ml-2">Since Yesterday</span>
                </p>

                <p className="timer mt-4 text-xs py-1 pl-6">
                  Gold rate expires in 2:20
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 z-20">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className=" border-b-2 border-white bg-transparent text-xs py-1 focus:outline-none text-white"
                max={9}
                placeholder="Enter Rupees"
                // value=""
              />

              <input
                type="number"
                className=" border-b-2 border-white bg-transparent text-xs py-1 focus:outline-none text-white"
                max={9}
                placeholder="Enter Grams"
                // value=""
              />
            </div>

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

            <div className="flex justify-between mt-4">
              <p className="text-white text-sm">Coupons</p>
              <p className="text-yellow-400 text-sm">View All</p>
            </div>

            <div className="py-3 px-4 rounded-lg bg-themeLight flex items-center mt-6">
              <img
                className="h-5"
                src={new URL(
                  "../../../public/sale.png",
                  import.meta.url
                ).toString()}
                alt="Your Company"
              />
              <p className="text-white text-sm leading-4 ml-2">
                Get 1.5% Extra Gold, Upto Rs.100 on minimum purchase of Gold
                Rs.899
              </p>
              <Link href="#" className="text-yellow-400 text-sm">
                Apply
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-white text-sm">GST No. (Optional)</p>
              <input
                type="text"
                className="bg-themeLight text-lg pl-4 w-full py-2 rounded-lg focus:outline-none text-white mt-6"
                max={9}
                placeholder="Enter GST No."
                // value=""
              />
            </div>

            <div className="mt-6">
              <button className="theme-btn w-full py-2">buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
