'use client';
import { useState } from 'react';
import ManageNonverbalQuizzes from './manageNonverbalQuizzes';
import NonverbalQuizForm from './nonverbalform';

const NonverbalQuizManager = () => {
  const [showQuizForm, setShowQuizForm] = useState(false);

  return (
    <div className=" mx-auto p-4">
      {showQuizForm ? (
        <NonverbalQuizForm />
      ) : (
        <ManageNonverbalQuizzes onAddQuiz={() => setShowQuizForm(true)} />
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

export default NonverbalQuizManager;
