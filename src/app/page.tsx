'use client';

import Header from "./components/LandingPage/header";
import { CarouselPlugin } from "./components/LandingPage/carousel";
import Footer from "./components/LandingPage/footer";
import ServicesCarousel from "./components/LandingPage/services";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen ">
      <Header />
      <CarouselPlugin />
      <ServicesCarousel/>
      <Footer/>
      
    </main>
  );
}
