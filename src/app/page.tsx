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
import DownloadApplication from "@/components/homepage/downloadApp";
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
      <DownloadApplication />
      <Review />
      <Blog />
    </main>
  );
}
