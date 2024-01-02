import {
  AboutFoot,
  HeroAbout,
  Info,
  Mission,
  Motive,
  Succession,
} from "@/components";
import Review from "@/components/about/reviewAbout";
import React from "react";

const About = () => {
  return (
    <main>
      <HeroAbout />
      <Info />
      <Mission />
      <Motive />
      <Succession />
      <Review />
      <AboutFoot />
    </main>
  );
};

export default About;
