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
    <div className="flex items-center justify-center min-h-screen ">
    <div className="mb-4 p-4 bg-[#212C44] rounded-lg shadow-md">
      <h2 className='text-center text-white font-bold'>Quiz</h2>
      
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // className="border p-2 mb-2 w-full"
        className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        // className="border p-2 mb-2 w-full"
        className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-10"
        onClick={handleSubmit}
      >
        Create Quiz
      </button>
    </div>
    </div>
  );
};

export default QuizCreation;
