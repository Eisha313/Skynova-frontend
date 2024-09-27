// import React from 'react';
// import Header from '@/app/components/header';
// import Sidebar from '@/app/components/sidebarDashboard';



// import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

// const EditPage = ({ params }: { params: { id: string } }) => {
//     const { id } = params;
//     console.log('userTitle', id);
  
//     return (
//       <div className="flex h-screen">
//         <Sidebar />
  
//         <div className="flex-1 flex flex-col">
//           <Header />
  
//           <main className="flex-1 p-4 bg-white">
//             <QuizAttempt id={id} />
//           </main>
//         </div>
//       </div>
//     );
//   };
  
//   export default EditPage;
  // EditPage component (page.tsx)
import React from 'react';
import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebarDashboard';
import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

const EditPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Define dummy functions for goBack and goToNextStep to pass them as props.
  const goBack = () => {
    console.log("Going back");
  };

  const goToNextStep = () => {
    console.log("Going to the next step");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white">
          {/* Pass quizId, goBack, and goToNextStep props to QuizAttempt */}
          <QuizAttempt quizId={id} goBack={goBack} goToNextStep={goToNextStep} />
        </main>
      </div>
    </div>
  );
};

export default EditPage;
