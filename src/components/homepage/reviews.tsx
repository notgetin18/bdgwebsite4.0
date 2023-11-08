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
    img: "https://bdggold.s3.ap-south-1.amazonaws.com/testimonials/piyush-1688056828359.jpg",
    name: "Piyush Puri",
    pera: "This app has completely changed the way I manage my savings. I highly recommend this app to anyones who wants to transform their investment.",
  },
  {
    img: "https://bdggold.s3.ap-south-1.amazonaws.com/testimonials/Jyoti-1688056759609.jpg",
    name: "Jyoti Tiwari",
    pera: "I was hesitant at first to buy digital gold, but this app made the process so simple and easy. The interface is user friendly and instructions are very clear. I now feel confident in my investment.",
  },
  {
    img: "https://bdggold.s3.ap-south-1.amazonaws.com/testimonials/Minakshi-1688056955580.jpg",
    name: "Meenakshi Sharma",
    pera: "I recently invested in Gold and I would like to share my journey with you all. Bright DiGi Gold made my investment quick and easy. You can buy 24K pure gold with their safe and secure policies.",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/testimonials/Nitin_Gupta-1688570873331.jpg",
    name: "Nitin Gupta",
    pera: "I would like to share my hands-on experience with Bright DiGi Gold. I purchased 24k gold and I must say it has truly impressed me with its innovative approach to digital gold investment.",
  },
  {
    img: "https://brightdigigold.s3.ap-south-1.amazonaws.com/testimonials/sumit-1688570860780.jpg",
    name: "Sumit Singhal",
    pera: "Bright DiGi Gold is a wonderful app. I cannot believe that buying gold could be so easy and convenient. Anyone who wants to invest in gold can definitely go for it without any doubt.",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Review() {
  return (
    <>
      <div className="bg-theme">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
          <h1 className="text-center text-white text-3xl extrabold mb-12">
            Testimonials
          </h1>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide
                key={`${index}-Slider`}
                className="relative swiper-slide p-4 pt-10"
              >
                <div className="bg-themeLight rounded-2xl border-b-2 border-blue-400 h-72 p-4 relative">
                  <div className=" flex justify-center">
                    <img
                      src={feature.img}
                      className="rounded-full absolute -top-10 h-24 w-24"
                      alt="insite"
                    />
                  </div>
                  <p className="mt-16 text-center text-white extrabold text-sm">
                    {feature.name}
                  </p>
                  <p className="mt-6 text-center text-white text-sm">
                    {feature.pera}
                  </p>
                  <img
                    alt="user"
                    className="h-8 absolute bottom-2 right-6"
                    src="/images/testimonial2.png"
                  ></img>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
