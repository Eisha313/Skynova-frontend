
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { AiOutlineDelete } from 'react-icons/ai';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import { MdDownload } from 'react-icons/md';
// import { ArrowUpDown } from 'lucide-react'; 
// import Search from '../Search';
// interface Question {
//   id: string;
//   title: string;
//   body: string;
// }

// const CommunityQuestions: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Question | null; direction: 'asc' | 'desc' }>({
//     key: null,
//     direction: 'asc',
//   });
  
//   const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions', {
//           credentials: 'include',
//         });
//         if (!response.ok) throw new Error('response was not okay');
//         const data = await response.json();
//         const mappedQuestions: Question[] = data.map((question: any) => ({
//           id: question._id,
//           title: question.title,
//           body: question.body,
//         }));
//         setQuestions(mappedQuestions);
//       } catch (error) {
//         console.log('error fetching the questions', error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/deleteCommunityQuestion/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (!response.ok) throw new Error('Failed to delete the question');
//       setQuestions(questions.filter((question) => question.id !== id));
//       setSelectedQuestions(selectedQuestions.filter((selectedId) => selectedId !== id));
//     } catch (error) {
//       console.log('Error deleting the question', error);
//     }
//   };

//   const handleSort = (key: keyof Question) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedQuestions = [...questions].sort((a, b) => {
//     if (sortConfig.key) {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
//       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredQuestions = sortedQuestions.filter(question =>
//     question.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
  

//   const indexOfLastQuestion = currentPage * itemsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
//   const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

//   const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedQuestions([]);
//     } else {
//       setSelectedQuestions(questions.map(question => question.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleSelectQuestion = (id: string) => {
//     if (selectedQuestions.includes(id)) {
//       setSelectedQuestions(selectedQuestions.filter(questionId => questionId !== id));
//     } else {
//       setSelectedQuestions([...selectedQuestions, id]);
//     }
//   };

//   const renderArrow = (key: keyof Question) => {
   
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? (
//         <ArrowUpDown className="h-4 w-4 inline ml-2" />
//       ) : (
//         <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
//       );
//     }
//     return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
//   };
//   const generatePDF = async () => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.text('Community Questions', 10, 10);
//     doc.setFontSize(12);
//     questions.forEach((q, index) => {
//       doc.text(`${index + 1}. ${q.title}`, 10, 20 + index * 10);
//       doc.text(`Body: ${q.body}`, 10, 25 + index * 10);
//     });
//     doc.save('community_questions.pdf');
//   };
//   const handleSearchChange = (term: string) => {
//     setSearchTerm(term);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//   };
//   return (
//     <div className="relative mx-auto max-w-4xl p-8 bg-gray-50 flex flex-col rounded-lg shadow-lg">
//       <div className="text-center mb-8 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Community Questions</h1>
//         <div className="flex items-center">
          
//         <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} clearSearch={clearSearch} />
//           <button onClick={generatePDF} className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300 ml-4">
//             <MdDownload />
//           </button>
//           <Link href={'/userRender/addCommunityQuestion'}>
//             <button className=" w-full px-4 py-2 ml-3 bg-eisha text-white rounded-lg hover:bg-blue-600 transition duration-300">
//               + Question
//             </button>
//           </Link>
//         </div>
//       </div>
//       {selectedQuestions.length > 0 && (
//         <button
//           onClick={() => selectedQuestions.forEach(handleDelete)}
//           className="mb-4 bg-red-500 text-white rounded-lg px-4 py-2"
//         >
//           Delete Selected
//         </button>
//       )}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-eisha text-white">
//             <tr>
//               <th className="py-2 px-4 border-b bg-gray-200">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               {['Title', 'Body', 'Actions'].map((header, index) => (
//                 <th
//                   key={header}
//                   className="py-2 px-4 border-b border-gray-200 cursor-pointer"
//                   onClick={() => handleSort(header.toLowerCase() as keyof Question)}
//                 >
//                   {header} {index !== 2 && renderArrow(header.toLowerCase() as keyof Question)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentQuestions.map((question) => (
//               <tr key={question.id} className="hover:bg-gray-100 transition duration-300">
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   <input
//                     type="checkbox"
//                     checked={selectedQuestions.includes(question.id)}
//                     onChange={() => handleSelectQuestion(question.id)}
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">{question.title}</td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   <Link href={`/community/${question.id}/questiondetail`} className="text-blue-600 hover:underline text-sm mr-2">
//                     Read more
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(question.id)}
//                     className="text-red-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
//                     aria-label="Delete question"
//                   >
//                     <AiOutlineDelete className="text-gray-700 w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <h2 className="text-2xl font-bold mt-6">Details</h2>
//       {/* Add more details logic here if needed */}
//     </div>
//   );
// };

// export default CommunityQuestions;
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { MdDownload } from 'react-icons/md';
import { ArrowUpDown } from 'lucide-react'; 
import Search from '../Search';
interface Question {
  id: string;
  title: string;
  body: string;
}

const CommunityQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Question | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('response was not okay');
        const data = await response.json();
        console.log(data)
        const mappedQuestions: Question[] = data.map((question: any) => ({
          id: question._id,
          title: question.title,
          body: question.body,
        }));
        setQuestions(mappedQuestions);
      } catch (error) {
        console.log('error fetching the questions', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/deleteCommunityQuestion/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete the question');
      setQuestions(questions.filter((question) => question.id !== id));
      setSelectedQuestions(selectedQuestions.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.log('Error deleting the question', error);
    }
  };

  const handleSort = (key: keyof Question) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredQuestions = sortedQuestions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map(question => question.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectQuestion = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(questionId => questionId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const renderArrow = (key: keyof Question) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Community Questions', 10, 10);
    doc.setFontSize(12);
    questions.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.title}`, 10, 20 + index * 10);
      doc.text(`Body: ${q.body}`, 10, 25 + index * 10);
    });
    doc.save('community_questions.pdf');
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative mx-auto max-w-4xl p-8 bg-gray-50 flex flex-col rounded-lg shadow-lg">
      <div className="text-center mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Community Questions</h1>
        <div className="flex items-center space-x-4">
          <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} clearSearch={clearSearch} />
          <button onClick={generatePDF} className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300">
            <MdDownload />
          </button>
          <Link href={'/userRender/addCommunityQuestion'}>
            <button className="px-4 py-2 bg-eisha text-white rounded-lg hover:bg-blue-600 transition duration-300">
              + Question
            </button>
          </Link>
        </div>
      </div>
      {selectedQuestions.length > 0 && (
        <button
          onClick={() => selectedQuestions.forEach(handleDelete)}
          className="mb-4 bg-red-500 text-white rounded-lg px-4 py-2"
        >
          Delete Selected
        </button>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-eisha text-white">
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('title')}>
                Title {renderArrow('title')}
              </th>
              <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('body')}>
                Body {renderArrow('body')}
              </th>
              <th className="py-2 px-4 border-b border-gray-200">
                Details
              </th>
              <th className="py-2 px-4 border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-100 transition duration-300">
                <td className="py-2 px-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleSelectQuestion(question.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{question.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link href={`/community/${question.id}/questiondetail`} className="text-blue-600 hover:underline text-sm mr-6">
                    Read more
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    aria-label="Delete question"
                  >
                    <AiOutlineDelete className="text-gray-700 w-5 h-5"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-lg ${index + 1 === currentPage ? 'bg-gray-300 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityQuestions;
