import ResourceDetails from '@/app/userComponents/resources/resourceDetails';
import Header from '@/app/components/LandingPage/header';
import Footer from '@/app/components/LandingPage/footer';

const ResourceRender = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log('userTitle', id);

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />

     
      <div className="flex-1 p-4 bg-gray-100 w-full mt-24 overflow-y-auto">
       
        <ResourceDetails id={id} />
      </div>

      <Footer />
    </main>
  );
};

export default ResourceRender;
