
'use client';
import { useState, useEffect } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import QuizModal from './quizModall'
import Search from './Search';
import DeleteConfirmationModal from './confirmationModal';

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

export interface QuizDetail extends Quiz {
  description: string;
  questions: Question[];
}

interface ManageQuizzesProps {
  onAddQuiz: () => void;
}

const ManageQuiz: React.FC<ManageQuizzesProps> = ({ onAddQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Quiz | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes',{credentials:'include'});
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
          setFilteredQuizzes(data);  
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

  // const handleQuizClick = async (quizId: string) => {
  //   try {
  //     const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuiz/${quizId}`,{credentials:'include'});
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSelectedQuiz(data);
  //       setIsModalOpen(true);
  //     } else {
  //       console.error('Failed to fetch quiz details');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching quiz details:', error);
  //   }
  // };
  const handleQuizClick = async (quizId: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuiz/${quizId}`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSelectedQuiz(data[0]); 
          setIsModalOpen(true);
        } else {
          console.error('No quiz data found.');
        }
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
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const lowerCaseSearchTerm = term.toLowerCase();
    const filtered = quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredQuizzes(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredQuizzes(quizzes); 
  };
  
  // const handleDeleteQuiz = async (quizId: string) => {
  //   try {
  //     const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/deleteQuiz/${quizId}`, {
  //       method: 'DELETE',
  //       credentials:'include'
  //     });
  //     if (response.ok) {
  //       setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
  //       setFilteredQuizzes(filteredQuizzes.filter((quiz) => quiz._id !== quizId));
  //       setSelectedQuizzes(selectedQuizzes.filter((id) => id !== quizId));
  //     } else {
  //       console.error('Failed to delete quiz');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting quiz:', error);
  //   }
  // };
  
  const openDeleteConfirmationModal = (quizId: string) => {
    setQuizToDelete(quizId); // Save the quiz ID
    setIsDeleteModalOpen(true); // Open the modal
  };
  
 
   
  const closeDeleteConfirmationModal = () => {
    setQuizToDelete(null);
    setIsDeleteModalOpen(false);
};



  const confirmDeleteQuiz = async () => {
    if (!quizToDelete) return;

    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/deleteQuiz/${quizToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizToDelete));
        setFilteredQuizzes(filteredQuizzes.filter((quiz) => quiz._id !== quizToDelete));
        setSelectedQuizzes(selectedQuizzes.filter((id) => id !== quizToDelete));
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    } finally {
      closeDeleteConfirmationModal();
    }
  };
  const handleSelectAll = () => {
    if (selectedQuizzes.length === filteredQuizzes.length) {
      setSelectedQuizzes([]);
    } else {
      setSelectedQuizzes(filteredQuizzes.map((quiz) => quiz._id));
    }
  };

  const handleSelectQuiz = (id: string) => {
    if (selectedQuizzes.includes(id)) {
      setSelectedQuizzes(selectedQuizzes.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedQuizzes([...selectedQuizzes, id]);
    }
  };
  

  const renderArrow = (key: keyof Quiz) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  const sortedQuizzes = [...filteredQuizzes];
  if (sortConfig.key) {
    sortedQuizzes.sort((a, b) => {
      const valueA = a[sortConfig.key!];
      const valueB = b[sortConfig.key!];
      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Quizzes</h2>
        <div className="flex flex-1 justify-end space-x-2">
        <Search 
          onSearchChange={handleSearchChange} 
          searchTerm={searchTerm} 
          clearSearch={clearSearch} 
        />
          <Link 
            href="/quizPage/addQuiz" 
            className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center"
          >
            Add Quiz
          </Link>
        </div>
      </div>
  
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="p-4 border-b text-left">
              <input
                type="checkbox"
                checked={selectedQuizzes.length === filteredQuizzes.length}
                onChange={handleSelectAll}
                className="form-checkbox"
              />
            </th>
            <th className="p-4 border-b text-left cursor-pointer" onClick={() => handleSort('title')}>
              Title {renderArrow('title')}
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedQuizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td className="p-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedQuizzes.includes(quiz._id)}
                  onChange={() => handleSelectQuiz(quiz._id)}
                  className="form-checkbox"
                />
              </td>
              <td className="p-4 border-b">{quiz.title}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                <button
                  onClick={() => handleQuizClick(quiz._id)}
                  className="text-blue-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href={`quizPage/${quiz._id}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  // onClick={() => confirmDeleteQuiz(quiz._id)}
                  onClick={() => openDeleteConfirmationModal(quiz._id)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteModalOpen && (
  <DeleteConfirmationModal
    onConfirm={confirmDeleteQuiz}
    onCancel={closeDeleteConfirmationModal}
  />
)}

  
      {isModalOpen && selectedQuiz && (
        <QuizModal
          quizDetails={selectedQuiz} 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ManageQuiz;
