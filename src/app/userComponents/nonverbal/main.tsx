import React, { useEffect, useState } from "react";
import NonVerbalQuizList, { Quiz } from "./quizList";
import NonVerbalQuizAttempt from "./quizAttempt";

import NonVerbalQuizResult from "./quizResult";

interface QuizContainerProps {
  goToNextStep: () => void;
}

const QuizContainerr: React.FC<QuizContainerProps> = ({ goToNextStep }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [shouldGoToNextStep, setShouldGoToNextStep] = useState(false);
  const [shouldRecheckList, setShouldRecheckList] = useState(false);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const goBackToList = () => {
    setShouldRecheckList((prev) => !prev);
    setSelectedQuiz(null);
  };

  useEffect(() => {
    if (shouldGoToNextStep) {
      goToNextStep();
    }
  }, [shouldGoToNextStep]);
  return (
    <div>
      {selectedQuiz ? (
        selectedQuiz.attempted ? (
          <NonVerbalQuizResult
            id={selectedQuiz._id.toString()}
            goBackToList={goBackToList}


            //   goBackToList={goBackToList}
          />
        ) : (
          <NonVerbalQuizAttempt
            quizId={selectedQuiz._id.toString()}
            goBack={goBackToList}
            goToNextStep={goBackToList}
          />
        )
      ) : (
        <NonVerbalQuizList
          onSelectQuiz={handleQuizSelect}
          shouldRecheckList={shouldRecheckList}
          goToNextStep={goToNextStep}
        />
      )}
    </div>
  );
};

export default QuizContainerr;
// import React from 'react';
// import NonVerbalQuizList from './quizList';
// import NonVerbalQuizAttempt from './quizAttempt';

// interface QuizContainerrProps {
//     goToNextStep: () => void;
//     selectedQuizId: string | null;
//     handleQuizSelect: (id: string) => void;
//     goBackToList: () => void;
// }

// const QuizContainerr: React.FC<QuizContainerrProps> = ({
//     goToNextStep,
//     selectedQuizId,
//     handleQuizSelect,
//     goBackToList,
// }) => {
//     return (
//         <div>
//             {selectedQuizId ? (
//                 <NonVerbalQuizAttempt
//                     quizId={selectedQuizId}
//                     goBack={goBackToList}
//                     goToNextStep={goToNextStep}
//                 />
//             ) : (
//                 <NonVerbalQuizList onSelectQuiz={handleQuizSelect} />
//             )}
//         </div>
//     );
// };

// export default QuizContainerr;
