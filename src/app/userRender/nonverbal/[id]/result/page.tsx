// import React from 'react';
// import Header from '@/app/components/LandingPage/header';

// import NonVerbalQuizResult from '@/app/userComponents/nonverbal/quizResult';

// const ResultPage = ({ params }: { params: { id: string } }) => {
//     const { id } = params;
//     console.log('userTitle', id);
  
//     return (
//         <div className='flex-1 flex flex-col'>
//         <Header/>
//         <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
//         <NonVerbalQuizResult id={id}/>
//         </main>
       
//         </div>
//     );
//   };
//   export default ResultPage;
  
import React from 'react';
import Header from '@/app/components/LandingPage/header';
import NonVerbalQuizResult from '@/app/userComponents/nonverbal/quizResult';

const ResultPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log('userTitle', id);

  // Define the goBackToList function
  const goBackToList = () => {
    // Redirect to the previous page or quiz list
    window.history.back();
  };

  return (
    <div className='flex-1 flex flex-col'>
      <Header />
      <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
        {/* Pass both id and goBackToList to NonVerbalQuizResult */}
        <NonVerbalQuizResult id={id} goBackToList={goBackToList} />
      </main>
    </div>
  );
};

export default ResultPage;
