'use client';

import Header from "./components/LandingPage/header";
import { CarouselPlugin } from "./components/LandingPage/carousel";
import Footer from "./components/LandingPage/footer";
import ServicesCarousel from "./components/LandingPage/services";
import ProcessSection from "./components/LandingPage/processSection";
import ResourceCarousel from "./components/LandingPage/resouceservice";
import SkyNovaOffers from "./components/LandingPage/skyNovaOffers";
import WelcomeAviators from './components/LandingPage/welcomeAviators'
import VirtualAvionics from "./components/LandingPage/avionicsInterface"
import VRMissions from "./components/LandingPage/missions"
import SkyNovaSection from "./components/LandingPage/skyNovaSection"
import Carousel from "./components/LandingPage/toolsTechnology"
export default function Home() {
  return (
    <main className="relative  flex flex-col items-center justify-center min-h-screen ">
      <Header />
      <CarouselPlugin />
      <ServicesCarousel/>
      <ResourceCarousel/>
      <SkyNovaOffers></SkyNovaOffers>
      <WelcomeAviators/>
      <SkyNovaSection/>
      <VirtualAvionics/>
      <ProcessSection />
      <VRMissions/>
      <Carousel/>

      <Footer/>
      
    </main>
  );
}
