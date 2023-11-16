import React from "react";
const ReferTab = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 p-4 rounded-lg bg-themeLight place-items-center">
        <div className="">
          <img
            alt="gold-logo"
            className="h-72 mx-auto"
            src="/images/refer.svg"
          />
        </div>
        <div className="">
          <p className="text-white">refer Referral code : S6R4H5L7</p>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-md font-medium leading-6 text-white"
            >
              Mobile
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 bg-themeLight py-1.5 text-white shadow-sm focus:outline-none px-4 h-12 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
              />
            </div>
            <div className="mt-4 bg-themeLight p-3 rounded-lg flex items-center">
              <img
                alt="gold-logo"
                className="h-16 mr-4"
                src="/images/worth.svg"
              />
              <p className="text-sm text-white">
                Friend registers using referral code. On his first transaction
                of Rs. 2000 both of you are rewarded with 0.01 gm of gold
              </p>
            </div>

            <button className="py-2 border-2 border-yellow-500 rounded-lg w-full text-center text-gold01 mt-4">
              REFER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferTab;
