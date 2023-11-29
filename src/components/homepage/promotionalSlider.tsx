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
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/equalgramsofsilver.jpg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/EXTRAGOLDBANNER.jpg",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Promotional() {
  return (
    <>
      <div className="bg-themeBlue">
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <img
            src="/saving.png"
            className="my-2 w-full rounded-lg shadow-lg"
            alt="insite"
          />
        </div>
      </div>
    </>
  );
}
