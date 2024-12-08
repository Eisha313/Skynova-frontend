
"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import NonverbalQuizModal from "./nonverbalQuizModal";
import { ArrowUpDown } from "lucide-react";
import { MdDownload } from "react-icons/md";


interface Quiz {
  _id: string;
  title: string;
}
export interface Option {
  label: string;
  image: string;
  _id?: string;
}
interface Question {
  _id: string;
  text: string;
 options:Option[]
  answer: string;
}

interface QuizDetail extends Quiz {
  description: string;
  
  questions: Question[];
}

interface ManageNonverbalQuizzesProps {
  onAddQuiz: () => void;
}

const ManageNonverbalQuizzes: React.FC<ManageNonverbalQuizzesProps> = ({
  onAddQuiz,
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState<Set<string>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Quiz | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quizzesPerPage] = useState<number>(5); 

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes",
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Error fetching quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  // const handleQuizClick = async (quizId: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuiz/${quizId}`,
  //       { credentials: "include" }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSelectedQuiz(data);
  //       setIsModalOpen(true);
  //     } else {
  //       console.error("Failed to fetch quiz details");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching quiz details:", error);
  //   }
  // };
  const handleQuizClick = async (quizId: string) => {
    try {
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuiz/${quizId}`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
  
        // Transform API response to match expected type
        const transformedData = {
          ...data,
          questions: data.questions.map((q: any) => ({
            ...q,
            options: q.option, // Map 'option' to 'options'
          })),
        };
  
        setSelectedQuiz(transformedData);
        setIsModalOpen(true);
      } else {
        console.error("Failed to fetch quiz details");
      }
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/deleteNonVerbalQuiz/${quizId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } else {
        console.error("Failed to delete quiz");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectedQuizzes.size === quizzes.length) {
      setSelectedQuizzes(new Set());
    } else {
      setSelectedQuizzes(new Set(quizzes.map((quiz) => quiz._id)));
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
  const renderArrow = (key: keyof Quiz) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };
  const handleSort = (key: keyof Quiz) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const compareValues = (a: any, b: any, direction: "asc" | "desc") => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === "string" && typeof b === "string") {
      return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    }
    return direction === "asc" ? (a < b ? -1 : 1) : a > b ? -1 : 1;
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedQuizzes = [...filteredQuizzes];
  if (sortConfig.key) {
    sortedQuizzes.sort((a, b) =>
      compareValues(
        a[sortConfig.key!],
        b[sortConfig.key!],
        sortConfig.direction
      )
    );
  }

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = sortedQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const downloadPDF = async () => {
    // Implement PDF download logic here
    const response = await fetch("YOUR_PDF_DOWNLOAD_API_URL", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "quizzes.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Failed to download PDF");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-1 justify-end space-x-2">
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Title"
            // className="border border-gray-300 px-4 py-2 rounded"
          className="text-white px-4 py-2 rounded-md flex items-center justify-center border-2  border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 rounded"
            >
              &times;
            </button>
          )}
        </div>
        <button
          onClick={downloadPDF}
          // className="ml-2 px-4 py-2 border border-eisha text-gray rounded"
          className="text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"

        >
          <MdDownload className="inline" />
        </button>
        <button
          onClick={onAddQuiz}
          className="px-4 py-2 bg-eisha text-white rounded"
        >
          Add Quiz
        </button>
      </div>
      <table className="min-w-full bg-white mt-5 ">
      <thead className="bg-eisha text-white">
  <tr>
    <th className="py-2 px-4 border-b cursor-pointer text-center">
      <input
        type="checkbox"
        checked={selectedQuizzes.size === quizzes.length}
        onChange={handleSelectAll}
      />
    </th>
    <th className="py-2 px-4 border-b cursor-pointer text-center">
      Serial No.
    </th>
    <th
      className="py-2 px-4 border-b cursor-pointer text-center"
      onClick={() => handleSort("title")}
    >
      Title {renderArrow("title")}
    </th>
    <th className="py-2 px-4 border-b text-center">Actions</th>
  </tr>
</thead>
<tbody className="text-white bg-[#212C44]">
  {currentQuizzes.map((quiz, index) => (
    <tr key={quiz._id}>
      <td className="py-2 px-4  text-center">
        <input
          type="checkbox"
          checked={selectedQuizzes.has(quiz._id)}
          onChange={() => handleSelectQuiz(quiz._id)}
        />
      </td>
      <td className="py-2 px-4 text-center">{indexOfFirstQuiz + index + 1}</td>
      <td className="py-2 px-4  text-center">{quiz.title}</td>
      <td className="py-2 px-4  flex justify-center space-x-2">
                <button
                  className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400 flex items-center justify-center"
                  onClick={() => handleQuizClick(quiz._id)}
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href=
                // {`/editQuiz/${quiz._id}`} 
                {`/nonverbalquiz/${quiz._id}/edit`}
                passHref>
                  <button
                    className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400 flex items-center justify-center"
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400 flex items-center justify-center"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastQuiz >= sortedQuizzes.length}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedQuiz && (
        <NonverbalQuizModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          quiz={selectedQuiz}
          // quiz={selectedQuiz as NonverbalQuizModalProps['quiz']}
        />
      )}
    </div>
  );
};

export default ManageNonverbalQuizzes;
