import {
  Blog,
  ClientSlider,
  DownloadApplication,
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
      <DownloadApplication />
      <SuccessInvestment />
      <ClientSlider />
      <Review />
      <Blog />
    </main>
  );
}
