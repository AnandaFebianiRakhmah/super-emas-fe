'use client';

import HeroSection from "../src/legacy-pages/LandingPage/HeroSection";
import TableSection from "../src/legacy-pages/LandingPage/TableSection";
import AboutSection from "../src/legacy-pages/LandingPage/AboutSection";
import GuideSection from "../src/legacy-pages/LandingPage/GuideSection";
import StoreLocation from "../src/legacy-pages/LandingPage/StoreLocation";
import Footer from "../src/components/Footer";
import FloatingContact from "../src/components/FloatingContact";
import NextNavbar from "./NextNavbar";

export default function HomeClient({ children, initialPriceData, initialPriceDate, initialPriceTime }) {
  return (
    <>
      <NextNavbar />
      <HeroSection />
      <TableSection
        initialPriceData={initialPriceData}
        initialPriceDate={initialPriceDate}
        initialPriceTime={initialPriceTime}
      />
      <AboutSection />
      <GuideSection />
      {children}
      <StoreLocation />
      <Footer />
      <FloatingContact />
    </>
  );
}
