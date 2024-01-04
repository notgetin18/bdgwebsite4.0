import {
  AboutFoot,
  HeroAbout,
  Info,
  Mission,
  Motive,
  Succession,
} from "@/components";
import Review from "@/components/about/reviewAbout";
import React, { Suspense } from "react";

const About = () => {
  return (
    <main>
      <Suspense fallback={<p className="text-white">Loading feed...</p>}>
        <HeroAbout />
        <Info />
        <Mission />
        <Motive />
        <Succession />
        <Review />
        <AboutFoot />
      </Suspense>
    </main>
  );
};

export default About;
