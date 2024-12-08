
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

//   return (
//     <div className="mb-4 p-4 bg-[#212C44] rounded-lg shadow-md text-white align-center  justify-center ">
      
//       <label className="block mt-7 font-medium">Title
//       <span className="text-red-500"> *</span>
//       </label><input
//         type="text"
//         placeholder="Quiz Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
       
//         className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
//       />
//       <label className="block mt-7 font-medium">Description
//       <span className="text-red-500"> *</span>
//       </label>
//       <textarea
//         placeholder="Quiz Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//          className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
//       />
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? 'Creating...' : 'Create Quiz'}
//       </button>
//     </div>
//   );
// };
return (
  <div className="flex items-center justify-center min-h-screen ">
    <div className="mb-4 p-4 bg-[#212C44] rounded-lg shadow-md text-white">
      <label className="block mt-7 font-medium">
        Title
        <span className="text-red-500"> *</span>
      </label>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
      />
      <label className="block mt-7 font-medium">
        Description
        <span className="text-red-500"> *</span>
      </label>
      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
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
  </div>
);
};
export default QuizCreation;
