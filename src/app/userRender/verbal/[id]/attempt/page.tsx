
//   'use client'
// import React from 'react';
// import Header from '@/app/components/header';
// import Sidebar from '@/app/components/sidebarDashboard';
// import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

// const EditPage = ({ params }: { params: { id: string } }) => {
//   const { id } = params;

 

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-4 bg-white">
          
//           {/* <QuizAttempt quizId={id} goBack={goBack} goToNextStep={goToNextStep} /> */}
//           <QuizAttempt quizId={id}  />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditPage;

import React from 'react';
import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebarDashboard';
import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

interface EditPageProps {
  params: {
    id: string;
  };
  goToNextStep?: () => void; // Optional prop for stepper
}

const EditPage = ({ params, goToNextStep }: EditPageProps) => {
  const { id } = params;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white">
          <QuizAttempt quizId={id} goToNextStep={goToNextStep} /> 
        </main>
      </div>
    </div>
  );
};

export default EditPage;
