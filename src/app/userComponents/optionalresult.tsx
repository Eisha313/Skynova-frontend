import React from 'react';
import NonVerbalQuizResult from './nonverbal/quizResult';
import DetailedResult from './Quiz/quizResult';

interface QuizResultProps {
  id: string;
  quizType: 'verbal' | 'non-verbal';
}

const QuizResult: React.FC<QuizResultProps> = ({ id, quizType }) => {
  return (
    <div>
      {quizType === 'verbal' ? (
        <DetailedResult id={id} />
      ) : (
        <NonVerbalQuizResult id={id} />
      )}
    </div>
  );
};

export default QuizResult;
