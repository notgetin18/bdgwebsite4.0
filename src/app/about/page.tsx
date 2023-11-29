import {
  AboutFoot,
  HeroAbout,
  Info,
  Mission,
  Motive,
  Review,
  Succession,
} from "@/components";
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
