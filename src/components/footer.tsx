import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <div className="bg-theme">
      <div className="bg-themeLight">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="flex items-center mb-6">
                {" "}
                <Link href="#">
                  <img
                    alt="gold-logo"
                    className="w-56"
                    src="/images/bdg_logo_large.png"
                  />
                </Link>
                <p className=" text-white  pl-10">
                  Bright Digi Gold Stands As The Most Trusted Partner Known For
                  Providing A Platform For Buying, Selling And Exchange Of 24K
                  Gold With The Guarantee Of Purity In Its Digital Form.
                </p>
              </div>

              <div className="grid grid-cols-3  gap-8">
                <ul>
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
                <ul>
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
                <ul>
                  <li className="flex mb-4">
                    <EnvelopeIcon className="h-6 text-white mr-8" />
                    <p className="text-white">contact@brightdigigold.com</p>
                  </li>
                  <li className="flex items-center">
                    <MapPinIcon className="h-12 text-white mr-8" />
                    <p className="text-white">
                      501, 5th Floor, World Trade Center,Babar Road, New Delhi -
                      110001
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" col-span-1 flex justify-center">
              <ul className="mt-6">
                <li className="mb-8">
                  <Link href="#">
                    <img src="/socail1.png" alt="socail1" className="h-8" />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img src="/socail2.png" alt="socail2" className="h-8" />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img src="/socail3.png" alt="socail3" className="h-8" />
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="#">
                    <img src="/socail4.png" alt="socail4" className="h-8" />
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
