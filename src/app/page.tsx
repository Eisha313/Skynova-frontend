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
import OurTeam from "./components/LandingPage/ourTeam"
import Stats from "./components/LandingPage/stats"
import Testimonials from "./components/LandingPage/testimonials"
import Background from "./components/LandingPage/skyvideo"
export default function Home() {
  return (
    <main className="relative  flex flex-col items-stretch justify-center min-h-screen ">
      <Header />
      {/* <CarouselPlugin />
      <ServicesCarousel/>
      <ResourceCarousel/> */}
     < Background/>
      <SkyNovaOffers></SkyNovaOffers>
      <WelcomeAviators/>
      <SkyNovaSection/>
      <VirtualAvionics/>
      {/* <ProcessSection /> */}
      <VRMissions/>
      <Carousel/>
      <OurTeam/>
      <Stats/>
      <Testimonials/>

      <Footer/>
      
    </main>
  );
}
