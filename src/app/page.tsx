'use client';

import Header from "./components/LandingPage/header";
import { CarouselPlugin } from "./components/LandingPage/carousel";
import Footer from "./components/LandingPage/footer";
import ServicesCarousel from "./components/LandingPage/services";
import ProcessSection from "./components/LandingPage/processSection";
import ResourceCarousel from "./components/LandingPage/resouceservice";
export default function Home() {
  return (
    <main className="relative  flex flex-col items-center justify-center min-h-screen ">
      <Header />
      <CarouselPlugin />
      <ServicesCarousel/>
      <ResourceCarousel/>
      <ProcessSection />

      <Footer/>
      
    </main>
  );
}
