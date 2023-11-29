"use client";
import React, { useState } from "react";
import BuyTab from "./tabs/howItWork/Buy";
import SellTab from "./tabs/howItWork/Sell";
import ExchangeTab from "./tabs/howItWork/Gift";
import Tabs from "./tabs/howItWork/Tabs";
import GiftTab from "./tabs/howItWork/Gift";
import DeliveryTab from "./tabs/howItWork/Delivery";

type TabsType = {
  label: string;
  index: number;
  img: string;
  alt: string;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Buy",
    img: "/buyTab.png",
    alt: "buy digital gold online",
    index: 1,
    Component: BuyTab,
  },
  {
    label: "Sell",
    img: "/sellTab.png",
    alt: "sell digital gold online",
    index: 2,
    Component: SellTab,
  },
  {
    label: "Gift",
    img: "/giftTab.png",
    alt: "Exchange Digital Gold to Physical Gold",
    index: 3,
    Component: GiftTab,
  },
  {
    label: "Delivery",
    img: "/deliveryTab.png",
    alt: "Exchange Digital Gold to Physical Gold",
    index: 4,
    Component: DeliveryTab,
  },
];

const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  return (
    <div className="bg-themeBlue">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <h1 className="text-2xl font-bold text-center">How it Works</h1>

        <div className="lg:items-center mt-8 sm:mt-8">
          <Tabs
            selectedTab={selectedTab}
            onClick={setSelectedTab}
            tabs={tabs}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
