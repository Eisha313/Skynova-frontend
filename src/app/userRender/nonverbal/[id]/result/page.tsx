import React from 'react';
import Header from '@/app/components/LandingPage/header';

import NonVerbalQuizResult from '@/app/userComponents/nonverbal/quizResult';

const ResultPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    console.log('userTitle', id);
  
    return (
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
        <NonVerbalQuizResult id={id}/>
        </main>
       
        </div>
    );
  };
  export default ResultPage;
  
  