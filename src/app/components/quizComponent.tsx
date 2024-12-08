'use client';
import { useState } from 'react';
import ManageQuiz from './manageQuiz';
import QuizForm from './quizform'

const QuizManager = () => {
  const [showQuizForm, setShowQuizForm] = useState(false);

  return (
    <div className="mx-auto p-4">
      {showQuizForm ? (
        <QuizForm />
      ) : (
        <ManageQuiz onAddQuiz={() => setShowQuizForm(true)} />
      )}
      {showQuizForm && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setShowQuizForm(false)}
        >
          Back 
        </button>
      )}
    </div>
  );
};

export default QuizManager;
