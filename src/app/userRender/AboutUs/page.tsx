import React from 'react';
import ObjectivesCarousel from '@/app/userComponents/AboutUS/carousel';
import SupervisorProfile from '@/app/userComponents/AboutUS/supervisor';
import MyProfile from '@/app/userComponents/AboutUS/eisha';
import MyProfilee from '@/app/userComponents/AboutUS/hamza';
import MyProfileee from '@/app/userComponents/AboutUS/hassan';
import Header from '@/app/components/LandingPage/header';
import Footer from '@/app/components/LandingPage/footer';

const AboutUsPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Header />
      <ObjectivesCarousel />
      <div className="container mx-auto p-6">
       
        <div className="mt-8">
          <SupervisorProfile />
        </div>
        
        
        
        <div className="mt-8">
          <MyProfilee />
        </div>
        <div className="mt-8">
          <MyProfileee />
        </div>
        <div className="mt-8">
          <MyProfile />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutUsPage;
