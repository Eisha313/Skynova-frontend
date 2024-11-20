// import React from 'react';
// import NonVerbalQuizResult from './nonverbal/quizResult';
// import DetailedResult from './Quiz/quizResult';

// interface QuizResultProps {
//   id: string;
//   quizType: 'verbal' | 'non-verbal';
//   goBackToList: () => void
// }

// const QuizResult: React.FC<QuizResultProps> = ({ id, quizType,goBackToList }) => {
//   return (
//     <div>

// <button
// onClick={goBackToList}
// >
//   Back
// </button>

//       {quizType === 'verbal' ? (
//         <DetailedResult id={id} />
//       ) : (
//         <NonVerbalQuizResult id={id} />
//       )}
//     </div>
//   );
// };

// export default QuizResult;
import React from 'react';
import NonVerbalQuizResult from './nonverbal/quizResult';
import DetailedResult from './verbal/Result';

interface QuizResultProps {
  id: string;
  quizType: 'verbal' | 'non-verbal';
  goBackToList: () => void; 
}

const QuizResult: React.FC<QuizResultProps> = ({ id, quizType, goBackToList }) => {
  return (
    <div>
      <button onClick={goBackToList} className="bg-gray-500 px-4 py-2 rounded-lg">
        Back
      </button>
      {quizType === 'verbal' ? (
        <DetailedResult id={id} />
      ) : (
        <NonVerbalQuizResult id={id} goBackToList={goBackToList} />
      )}
    </div>
  );
};

export default QuizResult;
