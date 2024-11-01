import React from 'react';
import NonVerbalQuizResult from './nonverbal/quizResult';
import DetailedResult from './Quiz/quizResult';

interface QuizResultProps {
  id: string;
  quizType: 'verbal' | 'non-verbal';
  goBackToList: () => void
}

const QuizResult: React.FC<QuizResultProps> = ({ id, quizType,goBackToList }) => {
  return (
    <div>

<button
onClick={goBackToList}
>
  Back
</button>

      {quizType === 'verbal' ? (
        <DetailedResult id={id} />
      ) : (
        <NonVerbalQuizResult id={id} />
      )}
    </div>
  );
};

export default QuizResult;
