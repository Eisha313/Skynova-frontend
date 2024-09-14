
'use client';
import { useState, useEffect } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import QuizModal from './verbalQuizModal';

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

interface Question {
  _id: string;
  text: string;
  options: string[];
  answer: string;
}

interface QuizDetail extends Quiz {
  questions: Question[];
}

interface ManageQuizzesProps {
  onAddQuiz: () => void;
}

const ManageQuizzes: React.FC<ManageQuizzesProps> = ({ onAddQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Quiz | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/viewVerbalQuizzes',{credentials:'include'});
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

  const handleSort = (key: keyof Quiz) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
  };

  const sortedQuizzes = [...quizzes];
  if (sortConfig.key) {
    sortedQuizzes.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleQuizClick = async (quizId: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/viewVerbalQuiz/${quizId}`,{credentials:'include'});
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
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/deleteVerbalQuiz/${quizId}`, {
        method: 'DELETE',
        credentials:'include'
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

  const renderArrow = (key: keyof Quiz) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
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

  {quizzes.length > 0 && (
    <table className="min-w-full bg-white border-collapse">
      <thead className="bg-eisha text-white">
        <tr>
          <th className="py-2 px-4 border-b border-gray-200 text-left w-12">Id</th>
          <th className="py-2 px-4 border-b border-gray-200 text-left">Title {renderArrow('title')}</th>
          <th className="py-2 px-4 border-b border-gray-200 text-left">Description {renderArrow('description')}</th>
          <th className="py-2 px-4 border-b border-gray-200 text-left w-32">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedQuizzes.map((quiz, index) => (
          <tr key={quiz._id}>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{index + 1}</td>
            <td className="py-2 px-4 border-b border-gray-200">{quiz.title}</td>
            <td className="py-2 px-4 border-b border-gray-200">{quiz.description}</td>
            <td className="py-2 px-4 border-b border-gray-200">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handleQuizClick(quiz._id)}
                  className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href={`verbalquiz/${quiz._id}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  <QuizModal isOpen={isModalOpen} onClose={handleCloseModal} quizDetails={selectedQuiz} />
</div>

  )}  

export default ManageQuizzes;
