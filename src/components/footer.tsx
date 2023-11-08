import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <div className="bg-theme">
      <div className="bg-themeLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="sm:flex items-center mb-6">
                <Link href="#">
                  <img
                    alt="gold-logo"
                    className="w-56 mx-auto mb-6 sm:mb-0"
                    src="/images/bdg_logo_large.png"
                  />
                </Link>
                <p className=" text-white  sm:pl-10">
                  Bright Digi Gold Stands As The Most Trusted Partner Known For
                  Providing A Platform For Buying, Selling And Exchange Of 24K
                  Gold With The Guarantee Of Purity In Its Digital Form.
                </p>
              </div>

              <div className="grid sm:grid-cols-6  gap-8">
                <ul className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Home
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      About Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Contact Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Refunds & Cancellations
                    </Link>
                  </li>
                </ul>
                <ul className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Shipping Policy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      Blogs
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link className="text-white" href="#">
                      FAQS
                    </Link>
                  </li>
                </ul>
                <ul className="col-span-6 lg:col-span-2">
                  <li className="mb-6 flex  lg:grid grid-cols-4 gap-4 place-items-center">
                    <EnvelopeIcon className="h-8 text-white col-span-1" />
                    <p className="text-white col-span-3">
                      contact@brightdigigold.com
                    </p>
                  </li>
                  <li className="flex  lg:grid grid-cols-4 gap-4 place-items-center">
                    <MapPinIcon className="h-8 text-white  col-span-1" />
                    <p className="text-white col-span-3">
                      501, 5th Floor, World Trade Center,Babar Road, New Delhi -
                      110001
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-5 lg:col-span-1 lg:flex justify-center">
              <ul className="mt-6 grid grid-cols-4 lg:block">
                <li className="mb-8">
                  <Link href="#">
                    <img
                      src="/socail1.png"
                      alt="socail1"
                      className="h-8 mx-auto"
                    />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img
                      src="/socail2.png"
                      alt="socail2"
                      className="h-8 mx-auto"
                    />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img
                      src="/socail3.png"
                      alt="socail3"
                      className="h-8 mx-auto"
                    />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img
                      src="/socail4.png"
                      alt="socail4"
                      className="h-8 mx-auto"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="text-center text-white text-sm">
              © BrightDiGiGold. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
