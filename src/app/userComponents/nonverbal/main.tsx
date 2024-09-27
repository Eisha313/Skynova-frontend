import React, { useState } from 'react';
import NonVerbalQuizList from './quizList'
import NonVerbalQuizAttempt from './quizAttempt';

interface QuizContainerProps {
    goToNextStep: () => void; 
}

const QuizContainerr: React.FC<QuizContainerProps> = ({ goToNextStep }) => {
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
                <NonVerbalQuizAttempt
                    quizId={selectedQuizId}
                    goBack={goBackToList}
                    goToNextStep={goToNextStep} 
                />
            ) : (
                <NonVerbalQuizList onSelectQuiz={handleQuizSelect} /> 
            )}
        </div>
    );
};

export default QuizContainerr;
