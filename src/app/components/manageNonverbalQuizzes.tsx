// 'use client';
// import { useState, useEffect } from 'react';
// import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
// import Link from 'next/link';
// import NonverbalQuizModal from './nonverbalQuizModal';

// interface Quiz {
//   _id: string;
//   title: string;
// }

// interface Question {
//   _id: string;
//   text: string;
//   options: string[];
//   answer: string;
// }

// interface QuizDetail extends Quiz {
//   description: string;
//   questions: Question[];
// }

// interface ManageQuizzesProps {
//   onAddQuiz: () => void;
// }

// const ManageNonverbalQuizzes: React.FC<ManageQuizzesProps> = ({ onAddQuiz }) => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes');
//         if (response.ok) {
//           const data = await response.json();
//           setQuizzes(data);
//         } else {
//           console.error('Failed to fetch quizzes');
//         }
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//         setError('Error fetching quizzes');
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const handleQuizClick = async (quizId: string) => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuiz/${quizId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSelectedQuiz(data);
//         setIsModalOpen(true);
//       } else {
//         console.error('Failed to fetch quiz details');
//       }
//     } catch (error) {
//       console.error('Error fetching quiz details:', error);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuiz(null);
//   };

//   const handleDeleteQuiz = async (quizId: string) => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/deleteNonVerbalQuiz/${quizId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
//       } else {
//         console.error('Failed to delete quiz');
//       }
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-300">
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">{quizzes.length === 0 ? 'No Quizzes Yet' : 'Available Quizzes'}</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:border-2 hover:border-white"
//           onClick={onAddQuiz}
//         >
//           Add Quiz
//         </button>
//       </div>
//       <ul>
//         {quizzes.map((quiz) => (
//           <li key={quiz._id} className="flex items-center justify-between mb-2 border-b pb-2">
//             <span>{quiz.title}</span>
//             <div className="flex space-x-2">
//               <div
//                 className="text-green-500 hover:text-green-700 cursor-pointer"
//                 onClick={() => handleQuizClick(quiz._id)}
//               >
//                 <FaEye />
//               </div>
//               <Link href={`nonverbalquiz/${quiz._id}/edit`}>
//                 <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
//                   <FaEdit />
//                 </div>
//               </Link>
//               <button
//                 className="text-red-500 hover:text-red-700"
//                 onClick={() => handleDeleteQuiz(quiz._id)}
//               >
//                 <FaTrashAlt />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <NonverbalQuizModal isOpen={isModalOpen} onClose={handleCloseModal} quizDetails={selectedQuiz} />
//     </div>
//   );
// };

// export default ManageNonverbalQuizzes;
'use client';
import React, { useState, useEffect } from 'react';
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

interface ManageNonverbalQuizzesProps {
  onAddQuiz: () => void;
}

const ManageNonverbalQuizzes: React.FC<ManageNonverbalQuizzesProps> = ({ onAddQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Quiz | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

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

  const handleSelectAll = () => {
    if (selectedQuizzes.size === quizzes.length) {
      setSelectedQuizzes(new Set());
    } else {
      setSelectedQuizzes(new Set(quizzes.map(quiz => quiz._id)));
    }
  };

  const handleSelectQuiz = (quizId: string) => {
    const updatedSelection = new Set(selectedQuizzes);
    if (selectedQuizzes.has(quizId)) {
      updatedSelection.delete(quizId);
    } else {
      updatedSelection.add(quizId);
    }
    setSelectedQuizzes(updatedSelection);
  };

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

  const renderArrow = (key: keyof Quiz) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  if (error) return <p>{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes found</p>;

  return (
    <div className="overflow-x-auto">
      <button
        onClick={onAddQuiz}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Quiz
      </button>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer">
              <input
                type="checkbox"
                checked={selectedQuizzes.size === quizzes.length}
                onChange={handleSelectAll}
              />
            </th>
            {['ID', 'Title', 'Actions'].map((header, index) => (
              <th
                key={header}
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Quiz)}
              >
                {header} {index > 0 && renderArrow(header.toLowerCase() as keyof Quiz)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedQuizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedQuizzes.has(quiz._id)}
                  onChange={() => handleSelectQuiz(quiz._id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{quiz.title}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleQuizClick(quiz._id)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaEye />
                </button>
                <Link href={`/editQuiz/${quiz._id}`} passHref>
                  <button
                    className="text-blue-500 hover:underline mr-2"
                  >
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedQuiz && (
  <NonverbalQuizModal
    isOpen={isModalOpen} // Provide isOpen prop
    onClose={handleCloseModal}
    quiz={selectedQuiz} // Make sure this prop matches the NonverbalQuizModalProps
  />
)}
    </div>
  );
};

export default ManageNonverbalQuizzes;
