"use client";

// import ResourceDetails from '@/app/userComponents/resources/resourceDetails';
// import ResourceDetails from '@/app/userComponents/resources/resourceDetails';
const ResourceDetails = dynamic(() => import("@/app/userComponents/resources/resourceDetails"), { ssr: false });
import Header from "@/app/components/LandingPage/header";
import Footer from "@/app/components/LandingPage/footer";
import dynamic from "next/dynamic";

const ResourceRender = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("userTitle", id);

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 p-4  w-full mt-24 overflow-y-auto">
        <ResourceDetails id={id} />
      </div>

      <Footer />
    </main>
  );
};

export default ResourceRender;
