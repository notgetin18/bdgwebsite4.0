"use client";
import { Tab } from "@headlessui/react";
import OrdersTabs from "../ordersTab/tabs/tabs";
import VaultTab from "../vaultTab/tabs";
import GiftTab from "../giftTab/tabs";
import ReferTab from "@/components/dashboard/refer/tabs";
import Redeem from "../redeem/tabs";
import { classNames } from "@/components";

const data = [
  { id: 1, name: "Orders" },
  { id: 2, name: "Vault" },
  { id: 3, name: "Redeem" },
  { id: 4, name: "Gifting" },
  { id: 5, name: "Refer & Earn" },
];
const DashboardTopTabs = () => {
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={3}>
        <Tab.List className="flex space-x-1 rounded-xl p-1">
          {data.map((category) => (
            <Tab
              //   key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "focus:outline-none",
                  selected
                    ? "bg-themeLight text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel
            className={classNames("rounded-xl  p-3", "focus:outline-none")}
          >
            <OrdersTabs />
          </Tab.Panel>

          {/* Displays this panel by default */}
          <Tab.Panel
            className={classNames("rounded-xl p-3", "focus:outline-none")}
          >
            <VaultTab />
          </Tab.Panel>

          <Tab.Panel
            className={classNames("rounded-xl p-3", "focus:outline-none")}
          >
            <Redeem />
          </Tab.Panel>
          <Tab.Panel
            className={classNames("rounded-xl p-3", "focus:outline-none")}
          >
            <GiftTab />
          </Tab.Panel>
          <Tab.Panel
            className={classNames("rounded-xl  p-3", "focus:outline-none")}
          >
            <ReferTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DashboardTopTabs;
