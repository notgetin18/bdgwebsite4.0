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
    img: "/images/refer_and_earn.png",
    name: "Refer and Earn Rewards",
    pera: "Refer our Bright DiGi Gold app to your friends and family, and earn an extra 0.01gm of Gold as a reward.",
    linkName: "Refer Now",
    href: "#",
  },
  {
    img: "/images/gold_delivery_boy.png",
    name: "Gold delivery at your doorstep",
    pera: "With just a click away, you can now order your Digital Gold/Silver and get physical delivery of your purchase without any hassle.",
    linkName: "Buy Now",
    href: "#",
  },
  {
    img: "/images/gift_gold_web.png",
    name: "Gift Gold to Your Special Ones",
    pera: "Now you can gift certified and guaranteed 24k",
    linkName: "Gift Now",
    href: "#",
  },
  {
    img: "/images/get_reward_web.png",
    name: "Get Rewards",
    pera: "With the Bright DiGi Gold app you can now earn an extra 1.5% of Gold on your first purchase and grow your savings with us.",
    linkName: "Reward Now",
    href: "#",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function Marketing() {
  return (
    <>
      <div className="bg-theme">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-16">
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 2500,
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
                <div className="backSlider grid grid-cols-2 gap-20 place-items-center">
                  <div>
                    <img
                      alt="stories img"
                      className="mx-auto h-96"
                      src={item.img}
                    />
                  </div>
                  <div>
                    <h1 className="text-white text-3xl extrabold mb-12">
                      {item.name}
                    </h1>
                    <p className="w-3/4 text-white">{item.pera}</p>
                    <Link
                      className="theme-btn py-3 px-8 mt-12 text-center"
                      href={item.href}
                    >
                      {item.linkName}
                    </Link>
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
