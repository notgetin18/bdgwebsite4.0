import React from "react";

const Motive = () => {
  return (
    <div className="bg-themeBlue py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-center text-gray-900 text-3xl extrabold mb-12">
          Motives To Choose Bright DiGi Gold
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16">
          <div>
            <div className="flex items-center gap-4">
              <img src="/Assured.png" className="h-12" />
              <p className="extrabold"> Assured 24K Purity</p>
            </div>
            <p className="mt-4">
              Bright DiGi Gold ensures quality with purity. We assure you with
              24 karat 99.9% Pure Gold and 99.99% Fine Silver.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <img src="/Guaranteed Security.png" className="h-12" />
              <p className="extrabold"> Guaranteed Security</p>
            </div>
            <p className="mt-4 inline-block">
              Our robust security measures ensure the safety of your digital
              assets, which are stored in world class vault{" "}
              <img src="/client5.png" className="inline-block h-3" />
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <img src="/Transparency.png" className="h-12" />
              <p className="extrabold"> 100% Transparency</p>
            </div>
            <p className="mt-4">
              With Bright DiGi Gold you don’t have to worry about hidden charges
              or fees because the process of investment is transparent.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <img src="/Cost-Effective.png" className="h-12" />
              <p className="extrabold"> Cost-Effective</p>
            </div>
            <p className="mt-4">
              We provide you with a budget friendly cost of just Rs. 10/-.
              making it an affordable way to save in Digital Gold.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <img src="/Convenience.png" className="h-12" />
              <p className="extrabold"> Convenience</p>
            </div>
            <p className="mt-4">
              We allow our users to buy, sell, deliver, and gift digital gold
              and silver all available from the comfort of their home without
              any need to physically visit the store.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <img src="/Liquidity and Flexibility.png" className="h-12" />
              <p className="extrabold"> Liquidity and Flexibility</p>
            </div>
            <p className="mt-4">
              With Bright Digi Gold the users can enjoy liquidity and
              flexibility in managing your digital gold and silver assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motive;
