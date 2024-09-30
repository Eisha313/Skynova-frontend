

// import React from 'react';
// import Header from '@/app/components/header';
// import Sidebar from '@/app/components/sidebarDashboard';
// import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

// interface EditPageProps {
//   params: {
//     id: string;
//   };
//   goToNextStep?: () => void; 
// }

// const EditPage = ({ params, goToNextStep }: EditPageProps) => {
//   const { id } = params;

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-4 bg-white">
//           <QuizAttempt quizId={id} goToNextStep={goToNextStep} /> 
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

interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white">
          <QuizAttempt quizId={id} /> {/* Removed goToNextStep */}
        </main>
      </div>
    </div>
  );
};

export default EditPage;
