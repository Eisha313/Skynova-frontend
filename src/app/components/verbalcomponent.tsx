'use client';
import { useState } from 'react';
import ManageQuizzes from './manageVerbalquiz';
import VerbalQuizForm from './verbalquizform';

const QuizManager = () => {
  const [showQuizForm, setShowQuizForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {showQuizForm ? (
        <VerbalQuizForm />
      ) : (
        <ManageQuizzes onAddQuiz={() => setShowQuizForm(true)} />
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
