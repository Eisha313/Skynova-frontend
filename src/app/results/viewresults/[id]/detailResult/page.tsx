
// 'use client'
// import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation'; 
// import QuizResult from '@/app/userComponents/optionalresult'; 

// const ViewResultPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

  
//   const id = searchParams.get('id');
//   const type = searchParams.get('type');

//   if (!id || !type) return <div>Loading...</div>;

//   return (
//     <div>
//       <QuizResult id={id} quizType={type as 'verbal' | 'non-verbal'} />
//     </div>
//   );
// };

// export default ViewResultPage;
'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; 
import QuizResult from '@/app/userComponents/optionalresult'; 

const ViewResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id || !type) return <div>Loading...</div>;

  // Define the goBackToList function
  const goBackToList = () => {
    router.push('/results'); // Adjust this path based on your application
  };

  return (
    <div>
      <QuizResult 
        id={id} 
        quizType={type as 'verbal' | 'non-verbal'} 
        goBackToList={goBackToList} // Pass the function here
      />
    </div>
  );
};

export default ViewResultPage;
