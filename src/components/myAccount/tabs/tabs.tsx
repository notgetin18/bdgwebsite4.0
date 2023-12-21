"use client";
import { Tab } from "@headlessui/react";
import { classNames } from "@/components";
import KycTab from "../kyc/kyc";
import PayoutOptionTab from "../payoutOptions/payoutOption";
import ProfileTab from "../profile/profile";
import AddressTab from "../address/address";

const data = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Kyc" },
  { id: 3, name: "Payout Option" },
  { id: 4, name: "Address" },
];

const MyAccountTabs = () => {
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={1}>
        <div className=" grid grid-cols-5 gap-4">
          <Tab.List className=" col-span-1 space-x-1 rounded-xl p-1">
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
          <Tab.Panel
            className={classNames("rounded-xl p-2 col-span-4", "focus:outline-none")}
          >
            <ProfileTab />
          </Tab.Panel>
          <Tab.Panels className="col-span-4">
            <Tab.Panel
              className={classNames("rounded-xl  p-3", "focus:outline-none")}
            >
              <KycTab />
            </Tab.Panel>
            <Tab.Panel
              className={classNames("rounded-xl p-3", "focus:outline-none")}
            >
              <PayoutOptionTab />
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
