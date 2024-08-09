'use client';
import { useState, useEffect } from 'react';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import NonverbalQuizModal from './nonverbalQuizModal';

interface Quiz {
  _id: string;
  title: string;
}

interface Question {
  _id: string;
  text: string;
  options: string[];
  answer: string;
}

interface QuizDetail extends Quiz {
  description: string;
  questions: Question[];
}

interface ManageQuizzesProps {
  onAddQuiz: () => void;
}

const ManageNonverbalQuizzes: React.FC<ManageQuizzesProps> = ({ onAddQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes');
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Error fetching quizzes');
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = async (quizId: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuiz/${quizId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedQuiz(data);
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch quiz details');
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/deleteNonVerbalQuiz/${quizId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-300">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{quizzes.length === 0 ? 'No Quizzes Yet' : 'Available Quizzes'}</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:border-2 hover:border-white"
          onClick={onAddQuiz}
        >
          Add Quiz
        </button>
      </div>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="flex items-center justify-between mb-2 border-b pb-2">
            <span>{quiz.title}</span>
            <div className="flex space-x-2">
              <div
                className="text-green-500 hover:text-green-700 cursor-pointer"
                onClick={() => handleQuizClick(quiz._id)}
              >
                <FaEye />
              </div>
              <Link href={`nonverbalquiz/${quiz._id}/edit`}>
                <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <FaEdit />
                </div>
              </Link>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteQuiz(quiz._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <NonverbalQuizModal isOpen={isModalOpen} onClose={handleCloseModal} quizDetails={selectedQuiz} />
    </div>
  );
};

export default ManageNonverbalQuizzes;
