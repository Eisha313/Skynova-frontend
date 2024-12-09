'use client';
import ContactInfo from '@/app/userComponents/Privacy/contactInfo';
import ContactForm from '@/app/userComponents/Privacy/contactForm';
import Header from '@/app/components/LandingPage/header';
import SocialContactUs from '@/app/userComponents/AboutUS/social';
import Footer from '@/app/components/LandingPage/footer';
import { ContactCarousel } from '@/app/userComponents/Privacy/contactCarousel';

export default function Home() {
  return (
    <main className="relative bg-custom-image flex flex-col items-center justify-center min-h-screen">
      <Header />
      {/* <ContactCarousel /> */}
      
      
      <div className="container mt-28 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" text-white p-8 rounded-md">
          <ContactInfo />
        </div>
        <div className="bg-[#293347] p-6 rounded-md shadow-md mt-24">
          <ContactForm />
        </div>
      </div>
      <div className=" p-6 rounded-md shadow-md mt-20">
      <SocialContactUs />
      </div>
      <Footer />
    </main>
  );
}
