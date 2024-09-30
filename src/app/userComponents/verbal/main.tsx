
import React, { useState } from 'react';
import QuizList from './QuizList';
import QuizAttempt from './QuizAttempt';

interface QuizContainerProps {
    goToNextStep: () => void; 
}

const QuizContainer: React.FC<QuizContainerProps> = ({ goToNextStep }) => {
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

    const handleQuizSelect = (id: string) => {
        setSelectedQuizId(id);
    };

    const goBackToList = () => {
        setSelectedQuizId(null);
    };

    return (
        <div>
            {selectedQuizId ? (
                <QuizAttempt
                    quizId={selectedQuizId}
                    goBack={goBackToList}
                    goToNextStep={goToNextStep} 
                />
            ) : (
                <QuizList onSelectQuiz={handleQuizSelect} />
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
