// import Header from '@/app/components/LandingPage/header';

// import NonVerbalQuizList from '@/app/userComponents/nonverbal/quizList';
// const ResourceRender=()=>{
//     return(
        
//         <div className='flex-1 flex flex-col'>
//         <Header/>
//         <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
//         <NonVerbalQuizList/>
//         </main>
       
//         </div>
//     )
// }
// export default ResourceRender;
'use client'
import React from 'react';
import Header from '@/app/components/LandingPage/header';
import NonVerbalQuizList from '@/app/userComponents/nonverbal/quizList';

const ResourceRender = () => {
  // Define the required props
  const shouldRecheckList = true; // Or use some condition based on your logic
  const goToNextStep = () => {
    // Define the action for going to the next step
    console.log('Going to the next step');
  };

  return (
    <div className='flex-1 flex flex-col'>
      <Header />
      <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
        {/* Pass the missing props to NonVerbalQuizList */}
        <NonVerbalQuizList shouldRecheckList={shouldRecheckList} goToNextStep={goToNextStep} />
      </main>
    </div>
  );
};

export default ResourceRender;
