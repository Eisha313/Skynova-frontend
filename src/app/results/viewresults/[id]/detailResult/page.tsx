
// import { useRouter } from 'next/navigation';
// import QuizResult from '@/app/userComponents/optionalresult'; // Adjust the import based on your file structure

// const ViewResultPage = () => {
//   const router = useRouter();
//   const { id, type } = router.query;

//   if (!id || !type) return <div>Loading...</div>;

//   return (
//     <div>
//       <QuizResult id={id as string} quizType={type as 'verbal' | 'non-verbal'} />
//     </div>
//   );
// };

// export default ViewResultPage;
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; 
import QuizResult from '@/app/userComponents/optionalresult'; 

const ViewResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id || !type) return <div>Loading...</div>;

  return (
    <div>
      <QuizResult id={id} quizType={type as 'verbal' | 'non-verbal'} />
    </div>
  );
};

export default ViewResultPage;
