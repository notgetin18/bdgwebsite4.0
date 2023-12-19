"use client";
import { Tab } from "@headlessui/react";
import OrdersTabs from "../ordersTab/tabs/tabs";
import GiftTab from "../giftTab/tabs";
import { classNames } from "@/components";

const data = [
  { id: 1, name: "Orders" },
  { id: 2, name: "Gifting" },
];

const DashboardTopTabs = () => {
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex space-x-1 rounded-xl p-1">
          {data.map((category, index) => (
            <Tab
              key={index}
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
        {/* Displays this panel by default */}
        <Tab.Panels>
          <Tab.Panel className={classNames("rounded-xl  p-3", "focus:outline-none")}>
            <OrdersTabs />
          </Tab.Panel>

          <Tab.Panel className={classNames("rounded-xl p-3", "focus:outline-none")}>
            <GiftTab />
          </Tab.Panel>

        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DashboardTopTabs;
