import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <div className="bg-theme">
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-4">
            <div className="mx-auto md:mx-0 w-full lg:pr-20 xl:pr-32">
              <Link href="#">
                <img
                  alt="gold-logo"
                  className=" w-full px-4"
                  src="/goldenlogo.png"
                />
              </Link>
              <div className="flex gap-4 justify-around lg:justify-between mx-4 mt-10 relative">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.brightdigigold.customer"
                  className="cursor-pointer"
                >
                  {/* <Lottie
                    animationData={IOS}
                    className="h-32 absolute -top-16 -left-2"
                    loop={true}
                  /> */}
                  <img src="/lottie/google-play-button.png" className="h-10" />
                </Link>
                <Link
                  href="https://apps.apple.com/in/app/bright-digi-gold-buy-24k-gold/id1640972173"
                  className="cursor-pointer"
                >
                  {/* <img className="h-10" src="/andriod.png" alt="Your Company" /> */}
                  {/* <Lottie
                    animationData={GooglePlay}
                    className="h-32 absolute -top-16 left-28"
                    loop={true}
                  /> */}
                  <img src="/lottie/app-store-button.png" className="h-10" />
                </Link>
              </div>
              <div className="w-full px-4">
                <ul className="mt-8 flex gap-1 justify-between">
                  <li className="mb-8">
                    <Link href="https://www.facebook.com/brightdigigold">
                      <img src="/socail1.png" alt="socail1" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="https://www.instagram.com/brightdigigold/">
                      <img src="/socail2.png" alt="socail2" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="https://www.linkedin.com/company/brightdigigold/mycompany/">
                      <img src="/socail3.png" alt="socail3" className="h-6" />
                    </Link>
                  </li>
                  <li className="mb-8">
                    <Link href="https://twitter.com/BrightDiGiGold">
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
                <Link className="text-white" href="/about">
                  <span className="inline sm:hidden">-</span> About Us
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="/coins">
                  <span className="inline sm:hidden">-</span> Coins
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="/contact">
                  <span className="inline sm:hidden">-</span> Contact Us
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  <span className="inline sm:hidden">-</span> Blog
                </Link>
              </li>
            </ul>
            <ul className="mt-0 md:mt-6 grid md:block grid-cols-2 gap-2">
              <li className="mb-4">
                <Link className="text-white" href="#">
                  <span className="inline sm:hidden">-</span> Terms of Uses
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  <span className="inline sm:hidden">-</span> Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  <span className="inline sm:hidden">-</span> Shipping Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-white" href="#">
                  <span className="inline sm:hidden">-</span> Refunds &
                  Cancellations
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid gap-4 w-full mt-6 md:mt-0">
            <ul className="lg:flex items-center justify-between gap-y-2">
              <li className="flex mb-4 lg:mb-0 items-center">
                <MapPinIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs sm:text-sm xl:text-base">
                  501, 5th Floor, World Trade Center,Babar Road, New Delhi -
                  110001
                </p>
              </li>
              <li className="flex mb-4 lg:mb-0 items-center">
                <PhoneIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs sm:text-sm xl:text-base">
                  +91 92894 80033
                </p>
              </li>
              <li className="flex mb-4 sm:mb-0 items-center">
                <EnvelopeIcon className="h-6 text-white mr-4" />
                <p className="text-white text-xs sm:text-sm xl:text-base">
                  contact@brightdigigold.com
                </p>
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
