"use client";
import { Tab } from "@headlessui/react";
import { classNames } from "@/components";
import KycTab from "../kyc/kyc";
import PayoutOptionTab from "../payoutOptions/payoutOption";
import ProfileTab from "../profile/profile";
import AddressTab from "../address/address";
import { useState } from "react";

const data = [
  { id: 1, name: "PROFILE", img: "/24K guaranteed .png" },
  { id: 2, name: "KYC", img: "/kycprofile.png" },
  { id: 3, name: "WITHDRAW", img: "/menusell.png" },
  { id: 4, name: "ADDRESS", img: "/location.png" },
];

const MyAccountTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCompleteKYC = () => {
    setSelectedIndex(1);
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Tab.List className="col-span-5 lg:col-span-1 rounded-xl p-1 sm:w-full flex flex-row lg:flex-col bg-themeLight">
            {data.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-xs sm:text-sm font-medium leading-5 text-left px-1 sm:px-4 grid grid-cols-4 items-center place-items-center",
                    "focus:outline-none",
                    selected
                      ? "bg-themeBlue text-black shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                <img
                  src={category.img}
                  className="h-6 col-span-4 sm:col-span-1"
                />
                <p className="col-span-4 sm:col-span-3">{category.name}</p>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="col-span-5 lg:col-span-4">
            <Tab.Panel
              className={classNames(
                "rounded-xl px-0 lg:px-3",
                "focus:outline-none"
              )}
            >
              <ProfileTab />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-xl px-0 lg:px-3",
                "focus:outline-none"
              )}
            >
              <KycTab />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-xl px-0 lg:px-3",
                "focus:outline-none"
              )}
            >
              <PayoutOptionTab onCompleteKYC={handleCompleteKYC} />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-xl px-0 lg:px-3",
                "focus:outline-none"
              )}
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
