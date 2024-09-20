'use client';
import Header from "@/app/components/LandingPage/header";
import { CarouselPlugin } from "@/app/components/LandingPage/carousel";

import Footer from "@/app/components/LandingPage/footer";
import ServicesCarousel from "@/app/components/LandingPage/services";

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
