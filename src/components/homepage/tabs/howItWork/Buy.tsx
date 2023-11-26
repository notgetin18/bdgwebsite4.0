import React, { FC, Fragment } from "react";

const BuyTab: FC<{}> = () => {
  return (
    <Fragment>
      {/* <p className="text-center text-xl text-white mt-4">It is easy!</p> */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8 mont-font relative">
        <img
          src="https://imagesbdg.sgp1.digitaloceanspaces.com/cf340772-ef49-4333-bd48-0f380674d17d"
          alt="gold price in india"
          className="abs-001"
        />
        <div>
          <p className="text-dark-blue text-md font-bold text-center my-2">
            Step 1
          </p>
          <div className="mx-auto flex justify-center">
            <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
              <img
                src="/buy01.png"
                alt="sell digital gold online"
                // className="w-12"
              ></img>
            </div>
          </div>
          <p className="text-center font-extrabold text-lg my-2">Enter Value</p>
          <p className="text-center text-sm my-2">
            Enter the amount you wish to purchase in Rs./Grams.
          </p>
        </div>

        <div>
          <p className="text-dark-blue text-md font-bold text-center my-2">
            Step 2
          </p>
          <div className="mx-auto flex justify-center">
            <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
              <img
                src="/buy02.png"
                alt="24k gold price in india"
                // className="h-8"
              ></img>
            </div>
          </div>
          <p className="text-center font-extrabold text-lg my-2">
            Bank Details
          </p>
          <p className="text-center text-sm my-2">
            Choose a payment method as per preference.
          </p>
        </div>

        <div>
          <p className="text-dark-blue text-md font-bold text-center my-2">
            Step 3
          </p>
          <div className="mx-auto flex justify-center">
            <div className="z-10 my-2 bg-theme p-4 rounded-full shadow-2xl h-16 w-16 flex justify-center items-center">
              <img src="/buy03.png" alt="24k gold price"></img>
            </div>
          </div>
          <p className="text-center font-extrabold text-lg my-2">
            Bank Account Credited
          </p>
          <p className="text-center text-sm my-2">
            Voila! Gold is added securely in the Bright DiGi Gold Vault.
          </p>
        </div>
      </div>{" "}
    </Fragment>
  );
};
export default BuyTab;
