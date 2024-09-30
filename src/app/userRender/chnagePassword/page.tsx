'use client';
import ContactInfo from '@/app/userComponents/Privacy/contactInfo';
import ContactForm from '@/app/userComponents/Privacy/contactForm';
import Header from '@/app/components/LandingPage/header';
import SocialContactUs from '@/app/userComponents/AboutUS/social';
import Footer from '@/app/components/LandingPage/footer';
import ChangePasswordForm from '@/app/components/changepassword';

export default function Home() {
  return (
    <main className=" mt-20 relative flex flex-col items-center justify-center min-h-screen">
      <Header />
      
      
      
  
        <div className="bg-eisha text-white p-8 rounded-md">
        <ChangePasswordForm/>
      </div>
      <Footer />
    </main>
  );
}
