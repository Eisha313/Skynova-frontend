'use client';
import { useState } from 'react';

interface QuizCreationProps {
  onCreateQuiz: (title: string, description: string) => Promise<void>;
}

const QuizCreation: React.FC<QuizCreationProps> = ({ onCreateQuiz }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onCreateQuiz(title, description);
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Create Quiz
      </button>
    </div>
  );
};

export default QuizCreation;
