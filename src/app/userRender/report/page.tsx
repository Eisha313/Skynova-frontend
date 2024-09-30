
// 'use client';

// import Header from '@/app/components/LandingPage/header';

// import Footer from '@/app/components/LandingPage/footer';
// import CompetencyEvaluation from '@/app/userComponents/competencyEvaluation/frontpage'
// const Home=({ params }: { params: { id: string } }) => {
//     const { id } = params;
//   return (
//     <main className="relative flex flex-col items-center justify-center min-h-screen">
//       <Header />
   
      
      
//       <main className="flex-1 p-4 bg-gray  h-screen overflow-y-auto mt-30">
//        <CompetencyEvaluation id ={id}/>
//        </main>

//       <Footer />
//     </main>
//   );
// }
// export default Home;
'use client';

import Header from '@/app/components/LandingPage/header';
import Footer from '@/app/components/LandingPage/footer';
import CompetencyEvaluation from '@/app/userComponents/competencyEvaluation/frontpage';
import QuizReport from '@/app/userComponents/competencyEvaluation/report';

const Home = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />

     
      <div className="flex-1 p-4 bg-gray-100 w-full mt-24 overflow-y-auto">
       
        <QuizReport  />
      </div>

      <Footer />
    </main>
  );
}

export default Home;
