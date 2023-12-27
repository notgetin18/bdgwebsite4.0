"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

const features = [
  {
    img: "/lottie/KYC Verification.gif",
    name: "Gold KYC",
    pera: "Get your KYC done and start with your digital gold/silver investment journey.    ",
    linkName: "KYC Now",
    href: "/profile",
  },
  {
    img: "/lottie/Customer support.gif",
    name: "Customer Support",
    pera: "Bright DiGi Gold provides you with 24*7 customer support services for ease of communication. ",
    linkName: "Contact Us ",
    href: "/contact",
  },
  {
    img: "/lottie/Home Deliveryy.gif",
    name: "Get It Delivered",
    pera: " Get 100% safe and secure gold/silver delivery at your doorstep. ",
    linkName: "Buy Now",
    href: "/coins",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function Marketing() {
  return (
    <>
      <div className="bg-theme">
        <div className="mx-auto  px-4 sm:px-6 lg:px-16 py-16">
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {features.map((item, index) => (
              <SwiperSlide
                key={`${index}-Slider`}
                className="relative swiper-slide p-4"
              >
                <div className="backSlider grid md:grid-cols-2 gap-20 place-items-center">
                  <div>
                    <img
                      alt="stories img"
                      className="mx-auto h-72 sm:h-96"
                      src={item.img}
                    />
                  </div>
                  <div>
                    <h1 className="text-white text-3xl extrabold mb-12">
                      {item.name}
                    </h1>
                    <p className="w-full sm:w-3/4 text-white">{item.pera}</p>
                    <div className="block mt-8">
                      <Link
                        className="bg-gray-200 rounded-lg py-3 px-8 text-center"
                        href={item.href}
                      >
                        {item.linkName}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
