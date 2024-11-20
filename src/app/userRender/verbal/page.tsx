
// 'use client';
// import Header from '@/app/components/header';
// import Sidebar from '@/app/components/sidebarDashboard';
// import QuizList from '@/app/userComponents/verbal/QuizList';
// import { useRouter } from 'next/navigation';

// const ResourceRender = () => {
//   const router = useRouter();

//   // Define the onSelectQuiz function
//   const handleSelectQuiz = (quizId: string) => {
//     // You can handle the quiz selection logic here, or navigate to a specific page
//     router.push(`/userRender/verbal/${quizId}/attempt`);
//   };

//   return (
//     <div className='flex h-screen'>
//       <Sidebar />
//       <div className='flex-1 flex flex-col'>
//         <Header />
//         <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
         
//           <QuizList onSelectQuiz={handleSelectQuiz} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ResourceRender;
'use client';
import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebarDashboard';
import QuizList from '@/app/userComponents/verbal/QuizList';
import { useRouter } from 'next/navigation';
import { Quiz } from '@/app/userComponents/verbal/QuizList'; 


const ResourceRender = () => {
  const router = useRouter();

  
  const handleSelectQuiz = (quiz: Quiz) => {
   
    router.push(`/userRender/verbal/${quiz._id}/attempt`);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Header />
        <main className="flex-1 p-4 justify-center h-screen overflow-auto">
          <QuizList onSelectQuiz={handleSelectQuiz} shouldRecheckList={false} goToNextStep={() => {}} />
        </main>
      </div>
    </div>
  );
};

export default ResourceRender;
