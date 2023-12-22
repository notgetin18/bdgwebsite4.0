"use client";
import { Tab } from "@headlessui/react";
import { classNames } from "@/components";
import KycTab from "../kyc/kyc";
import PayoutOptionTab from "../payoutOptions/payoutOption";
import ProfileTab from "../profile/profile";
import AddressTab from "../address/address";
import { useState } from "react";

const data = [
  { id: 1, name: "PROFILE" },
  { id: 2, name: "KYC" },
  { id: 3, name: "PAYOUT" },
  { id: 4, name: "ADDRESS" },
];


const MyAccountTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleCompleteKYC = () => {
    setSelectedIndex(1);
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <Tab.List className="sm:col-span-1 space-x-1 rounded-xl p-1 sm:w-full flex flex-row sm:flex-col">
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
          <Tab.Panels className="sm:col-span-4">
            <Tab.Panel
              className={classNames("rounded-xl p-2", "focus:outline-none")}
            >
              <ProfileTab />
            </Tab.Panel>
            <Tab.Panel
              className={classNames("rounded-xl p-3", "focus:outline-none")}
            >
              <KycTab />
            </Tab.Panel>
            <Tab.Panel
              className={classNames("rounded-xl p-3", "focus:outline-none")}
            >
              <PayoutOptionTab onCompleteKYC={handleCompleteKYC} />
            </Tab.Panel>
            <Tab.Panel
              className={classNames("rounded-xl p-3", "focus:outline-none")}
            >
              <AddressTab />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default MyAccountTabs;


