

// import Header from '@/app/components/LandingPage/header';

// import HeroDetails from '@/app/userComponents/wings/heroDetails'
// const ViewQuestions=()=>{
//     return(
//         <div className='flex h-screen'>
        
//         <div className='flex-1 flex flex-col'>
//         <Header/>
//         <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
//         <HeroDetails/>
//         </main>
//         </div>
//         </div>
//     )
// }
// export default ViewQuestions;
import React from 'react';
import HeroDetails from '@/app/userComponents/wings/heroDetails';
import Header from '@/app/components/LandingPage/header';

const HeroDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
          <HeroDetails id={id} />
        </main>
      </div>
    </div>
  );
};

export default HeroDetailsPage;
