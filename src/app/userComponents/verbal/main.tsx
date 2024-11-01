import React, { useEffect, useState } from "react";
import QuizList, { Quiz } from "./QuizList";
import QuizAttempt from "./QuizAttempt";
import QuizResult from "../optionalresult";

interface QuizContainerProps {
  goToNextStep: () => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ goToNextStep }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [shouldGoToNextStep, setShouldGoToNextStep] = useState(false);
  const [shouldRecheckList, setShouldRecheckList] = useState(false);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const goBackToList = () => {
    setShouldRecheckList((prev)=> !prev);
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
          <QuizResult
            id={selectedQuiz._id}
            quizType="verbal"
            goBackToList={goBackToList}
          />
        ) : (
          <QuizAttempt
            quizId={selectedQuiz._id}
            goBack={goBackToList}
            goToNextStep={goBackToList}
          />
        )
      ) : (
        <QuizList onSelectQuiz={handleQuizSelect} 
        shouldRecheckList={shouldRecheckList}
        goToNextStep={goToNextStep}
        />
      )}
    </div>
  );
};

export default QuizContainer;
// import React from 'react';
// import QuizList from './QuizList';
// import QuizAttempt from './QuizAttempt';

// interface QuizContainerProps {
//     goToNextStep: () => void;
//     selectedQuizId: string | null;
//     handleQuizSelect: (id: string) => void;
//     goBackToList: () => void;
// }

// const QuizContainer: React.FC<QuizContainerProps> = ({
//     goToNextStep,
//     selectedQuizId,
//     handleQuizSelect,
//     goBackToList,
// }) => {

//     return (
//         <div>
//             {selectedQuizId ? (
//                 <QuizAttempt
//                     quizId={selectedQuizId}
//                     goBack={goBackToList}
//                     goToNextStep={goToNextStep}
//                 />
//             ) : (
//                 <QuizList onSelectQuiz={handleQuizSelect} />
//             )}
//         </div>
//     );
// };

// export default QuizContainer;
