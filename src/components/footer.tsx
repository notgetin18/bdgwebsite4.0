import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import Lottie from "lottie-react";
import GooglePlay from "../../public/lottie/Google Play.json";
import IOS from "../../public/lottie/App Store.json";
const Footer = () => {
  return (
    <div className="bg-theme">
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="mx-auto md:mx-0 w-full">
              <Link href="#">
                <img
                  alt="gold-logo"
                  className=" w-full px-4 lg:w-56"
                  src="/goldenlogo.png"
                />
              </Link>
              <div className="flex gap-4 justify-around lg:justify-start ml-6 mt-10 relative">
                <Link href="" className="cursor-pointer">
                  {/* <Lottie
                    animationData={IOS}
                    className="h-32 absolute -top-16 -left-2"
                    loop={true}
                  /> */}
                  <img src="/lottie/google-play-button.png" className="h-8" />
                </Link>
                <Link href="" className="cursor-pointer">
                  {/* <img className="h-10" src="/andriod.png" alt="Your Company" /> */}
                  {/* <Lottie
                    animationData={GooglePlay}
                    className="h-32 absolute -top-16 left-28"
                    loop={true}
                  /> */}
                  <img src="/lottie/app-store-button.png" className="h-8" />
                </Link>
              </div>
              <div className="w-full px-4 lg:w-72">
                <ul className="mt-8 flex gap-1 justify-between">
                  <li className="mb-8">
                    <Link href="#">
                      <img src="/socail1.png" alt="socail1" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="#">
                      <img src="/socail2.png" alt="socail2" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="#">
                      <img src="/socail3.png" alt="socail3" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="#">
                      <img src="/Twitter.png" alt="socail3" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="#">
                      <img src="/socail5.png" alt="socail4" className="h-6" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="mt-6 grid md:block grid-cols-2 gap-2">
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - About Us
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Coins
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Contact Us
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Blog
                </Link>
              </li>
            </ul>
            <ul className="mt-6 grid md:block grid-cols-2 gap-2">
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Terms of Uses
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Shipping Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  - Refunds & Cancellations
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid gap-4 w-full mt-6 md:mt-0">
            <ul className="lg:flex items-center justify-between gap-y-2">
              <li className="flex mb-4 sm:mb-0 items-center">
                <MapPinIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs">
                  501, 5th Floor, World Trade Center,Babar Road, New Delhi -
                  110001
                </p>
              </li>
              <li className="flex mb-4 sm:mb-0 items-center">
                <PhoneIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs">+91 92894 80033</p>
              </li>
              <li className="flex mb-4 sm:mb-0 items-center">
                <EnvelopeIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs">contact@brightdigigold.com</p>
              </li>
            </ul>
          </div>

          {/* <div>
            <p className="text-center text-white text-sm">
              © BrightDiGiGold. All Rights Reserved.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
