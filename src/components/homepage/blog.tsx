"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import "./styles.css";

const features = [
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Maximise-Your-Daily-Savings.png",
    name: "Maximise Daily Savings With Digital Gold",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/How-are-gold-prices-Determined.png",
    name: "How Are Gold Prices Determined?- Know Complete Information!",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Akshaya-Tritiya.png",
    name: "Make A Golden Investment On This Akshaya Tritiya",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Buying-gold-coins.png",
    name: "Buying Gold Coins- Important Things To Know!",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Minor-Steps-and-Great-Savings.png",
    name: "Minor Steps And Great Savings: How To Effectively Save And Invest On Low Earnings",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Things-to-Remember-Before-Buying-Gold-Jewellery.png",
    name: "Things To Remember Before Buying Gold Jewellery",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Involved-Risks-And-Their-Solutions.png",
    name: "Digital Gold Investment: Involved Risks And Their Solutions",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/blogs/Role-of-Technology.png",
    name: "The Future Is Now: Role Of Gold In Technology",
  },
];
import { EffectCoverflow, Navigation } from "swiper/modules";

export default function Blog() {
  return (
    <>
      <div className="bg-theme">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-center text-yellow-500 text-3xl extrabold mb-6">
            Our Blogs
          </h1>
          <Swiper
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
            style={{ padding: "0 20px !important" }}
          >
            {features.map((feature, index) => (
              <SwiperSlide
                key={`${index}-Slider`}
                className="relative swiper-slide p-4 pt-10"
              >
                <div className="bg-themeLight rounded-2xl h-44 sm:h-72 relative">
                  <div className=" flex justify-center">
                    <img
                      src={feature.img}
                      className="w-full rounded-2xl"
                      alt="insite"
                    />
                  </div>
                  <p className="mt-4 text-white text-xs sm:text-sm px-4">
                    {feature.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
