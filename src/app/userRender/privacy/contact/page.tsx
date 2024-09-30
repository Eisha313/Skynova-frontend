'use client';
import ContactInfo from '@/app/userComponents/Privacy/contactInfo';
import ContactForm from '@/app/userComponents/Privacy/contactForm';
import Header from '@/app/components/LandingPage/header';
import SocialContactUs from '@/app/userComponents/AboutUS/social';
import Footer from '@/app/components/LandingPage/footer';
import { ContactCarousel } from '@/app/userComponents/Privacy/contactCarousel';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Header />
      <ContactCarousel />
      
      
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-eisha text-white p-8 rounded-md">
          <ContactInfo />
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <ContactForm />
        </div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-md">
      <SocialContactUs />
      </div>
      <Footer />
    </main>
  );
}
