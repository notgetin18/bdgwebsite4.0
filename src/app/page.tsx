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
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      {/* <OfferSlider /> */}
      <HeroSection />
      <OfferSlider />
      <Promotional />
      <Products />
      <HowItWorks />
      {/* <Ecom /> */}
      <Marketing />
      <ClientSlider />
      <Blog />
      <Review />
      <Faq />
    </Suspense>
  );
}
