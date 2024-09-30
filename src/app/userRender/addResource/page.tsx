
import Header from '@/app/components/LandingPage/header';

import Footer from '@/app/components/LandingPage/footer';


import ResourceForm from '@/app/components/addResources';

export default function addResource() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
    <Header />
    <main className=" flex  items-center justify-center mt-20 ">
      <ResourceForm />
    </main>
     <Footer />
     </div>
  );
}


