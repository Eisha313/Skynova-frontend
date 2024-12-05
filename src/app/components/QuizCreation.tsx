
'use client';

import { useState } from 'react';

interface QuizCreationProps {
  onCreateQuiz: (title: string, description: string) => Promise<void>;
}

const QuizCreation: React.FC<QuizCreationProps> = ({ onCreateQuiz }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleSubmit = async () => {
    setError(null); 
    if (!title.trim() || !description.trim()) {
      setError('Title and description cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes'
      );
      const quizzes = await response.json();

      const isTitleUnique = !quizzes.some(
        (quiz: { title: string }) => quiz.title.toLowerCase() === title.toLowerCase()
      );

      if (!isTitleUnique) {
        setError('A quiz with this title already exists. Please choose another title.');
        setLoading(false);
        return;
      }

     
      await onCreateQuiz(title, description);
    } catch (error) {
      setError('An error occurred while checking quiz titles. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Quiz'}
      </button>
    </div>
  );
};

export default QuizCreation;
