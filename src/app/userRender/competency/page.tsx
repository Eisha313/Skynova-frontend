
'use client';

import Header from '@/app/components/LandingPage/header';
import Footer from '@/app/components/LandingPage/footer';
import CompetencyEvaluation from '@/app/userComponents/competencyEvaluation/frontpage';

const Home = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />

     
      <div className="flex-1 p-4 w-full mt-24 overflow-y-auto">
       
        <CompetencyEvaluation id={id} />
      </div>

      <Footer />
    </main>
  );
}

export default Home;
