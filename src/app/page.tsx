import {
  Blog,
  ClientSlider,
  Ecom,
  Faq,
  HeroSection,
  HowItWorks,
  Marketing,
  OfferSlider,
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
      {/* <OfferSlider /> */}
      <Promotional />
      <Products />
      <HowItWorks />
      <Ecom />
      <Marketing />
      <ClientSlider />
      <Blog />
      <Review />
      <Faq />
    </main>
  );
}
