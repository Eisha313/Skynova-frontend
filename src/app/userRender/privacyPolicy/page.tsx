


import Header from '@/app/components/LandingPage/header';

import Footer from '@/app/components/LandingPage/footer';

import PrivacyPolicy from '@/app/userComponents/Privacy/privacyPolicy';

export default function Policy() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
    <Header />
    <main className=" flex  items-center justify-center ">
     
     
      <PrivacyPolicy />

     
    </main>
     <Footer />
     </div>
  );
}
