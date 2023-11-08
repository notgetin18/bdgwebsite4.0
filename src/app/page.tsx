import {
  Blog,
  ClientSlider,
  HeroSection,
  ImageContainer,
  Marketing,
  Products,
  Promotional,
  Review,
  SuccessInvestment,
} from "@/components";
// import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Promotional />
      <Products />
      <ImageContainer />
      <Marketing />
      <SuccessInvestment />
      <ClientSlider />
      <Review />
      <Blog />
    </main>
  );
}
