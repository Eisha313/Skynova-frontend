
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import Search from '../Search';
// import { ArrowUpDown } from 'lucide-react';
// import { useRouter } from 'next/router';
// import { useUser } from '@/app/components/context/userContext';

// interface Result {
//   _id: string;
//   userId: {
//     firstName: string;
//     lastName: string;
//   };
//   type: string;
//   dateAttempted: string; // Original format: ISO string or similar
//   marks: number;
// }

// const ResultList: React.FC = () => {
//   const [results, setResults] = useState<Result[]>([]);
//   const [filteredResults, setFilteredResults] = useState<Result[]>([]);
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Result | null; direction: 'asc' | 'desc' }>({
//     key: null,
//     direction: 'asc',
//   });
//   const [selectedResults, setSelectedResults] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState<string>('all'); // New filter state
//   const { token } = useUser();
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const [verbalResponse, nonVerbalResponse] = await Promise.all([
//           axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults', { withCredentials: true }),
//           axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResults', { withCredentials: true }),
//         ]);

//         const combinedResults = [
//           ...verbalResponse.data.map((result: Result) => ({ ...result, type: 'Verbal' })),
//           ...nonVerbalResponse.data.map((result: Result) => ({ ...result, type: 'Nonverbal' })),
//         ];

//         setResults(combinedResults);
//         setFilteredResults(combinedResults);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       }
//     };

//     fetchResults();
//   }, []);

//   const handleDelete = async (id: string, type: string) => {
//     const endpoint = type === 'verbal'
//       ? `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/delete/${id}`
//       : `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/delete/${id}`;

//     const response = await fetch(endpoint, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       // Remove the deleted result from the state
//       setResults(prevResults => prevResults.filter(result => result._id !== id));
//     } else {
//       console.error('Failed to delete result');
//     }
//   };

//   const handleSort = (key: keyof Result) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
//     if (a === b) return 0;
//     if (a == null) return 1;
//     if (b == null) return -1;
//     if (typeof a === 'string' && typeof b === 'string') {
//       return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
//     }
//     return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
//   };

//   const sortedResults = [...filteredResults];
//   if (sortConfig.key) {
//     sortedResults.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
//   }

//   const handleSelectAll = () => {
//     if (selectedResults.length === results.length) {
//       setSelectedResults([]);
//     } else {
//       setSelectedResults(results.map((result) => result._id));
//     }
//   };

//   const handleSearchChange = (searchTerm: string) => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const filtered = results.filter(
//       (result) =>
//         result.type.toLowerCase().includes(lowerCaseSearchTerm) ||
//         result.dateAttempted.toLowerCase().includes(lowerCaseSearchTerm) ||
//         
//     );
//     setFilteredResults(filtered);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setFilteredResults(results);
//   };

//   const handleSelectResult = (id: string) => {
//     if (selectedResults.includes(id)) {
//       setSelectedResults(selectedResults.filter((selectedId) => selectedId !== id));
//     } else {
//       setSelectedResults([...selectedResults, id]);
//     }
//   };

//   const renderArrow = (key: keyof Result) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? (
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       ) : (
//         <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
//       );
//     }
//     return <ArrowUpDown className="ml-2 h-4 w-4" />;
//   };

//   const handleFilterChange = (filter: string) => {
//     setFilterType(filter);
//     if (filter === 'all') {
//       setFilteredResults(results);
//     } else {
//       setFilteredResults(results.filter((result) => result.type.toLowerCase() === filter.toLowerCase()));
//     }
//   };

//   // Function to format date from YYYY-MM-DDTHH:mm:ssZ to DD-MM-YYYY
//   const formatDate = (date: string) => {
//     const dateObj = new Date(date);
//     const day = String(dateObj.getDate()).padStart(2, '0');
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = dateObj.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Function to determine the status based on marks
//   const determineStatus = (marks: number): string => {
//     if (marks == 0) return 'Failed';
//     return marks > 0 ? 'Passed' : 'Failed';
//   };

//   return (
//     <div className="overflow-x-auto">
//       <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
//         <h2 className="text-xl font-semibold">Quiz Results</h2>
//         <div className="flex flex-1 justify-end space-x-2">
//           <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
//           <select
//             value={filterType}
//             onChange={(e) => handleFilterChange(e.target.value)}
//             className="px-4 py-2 rounded-md text-center bg-eisha text-white"
//           >
//             <option value="all">All</option>
//             <option value="verbal">Verbal</option>
//             <option value="nonverbal">Nonverbal</option>
//           </select>
//           <Link href="/results/addResults" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center">
//             Add Results
//           </Link>
//         </div>
//       </div>
//       <table className="min-w-full bg-white">
//         <thead className="bg-eisha text-white">
//           <tr>
//             <th className="py-2 px-4 border-b bg-eisha cursor-pointer">
//               <input type="checkbox" checked={selectedResults.length === results.length} onChange={handleSelectAll} />
//             </th>
//             {['Username', 'Type', 'Date Attempted', 'Marks', 'Status', 'Actions'].map((header) => (
//               <th
//                 key={header}
//                 className="py-2 px-8 border-b border-gray-200 cursor-pointer" // Increased padding to shift right
//                 onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Result)}
//               >
//                 <div className="flex items-center justify-center">
//                   {header}
//                   {(header === 'Username' || header === 'Type' || header === 'Date Attempted') && renderArrow(header.toLowerCase().replace(' ', '') as keyof Result)}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedResults.map((result) => (
//             <tr key={result._id}>
//               <td className="py-2 px-4 border-b border-gray-200">
//                 <input type="checkbox" checked={selectedResults.includes(result._id)} onChange={() => handleSelectResult(result._id)} />
//               </td>
//               <td className="py-2 px-8 border-b border-gray-200">
//                 {result.userId ? `${result.userId.firstName} ${result.userId.lastName}` : 'Unknown User'}
//               </td>
//               <td className="py-2 px-8 border-b border-gray-200">{result.type}</td>
//               <td className="py-2 px-8 border-b border-gray-200">{formatDate(result.dateAttempted)}</td>
//               <td className="py-2 px-8 border-b border-gray-200">{result.marks}</td>
              
//               <td className="py-2 px-8 border-b border-gray-200">{determineStatus(result.marks)}</td>
//               <td className="py-2 px-8 border-b border-gray-200 flex justify-center space-x-2">
//                 <Link href={`/results/viewResult/${result._id}/detailResult?type=${result.type}`} className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
//                   <FaEye  className="text-gray-700"  />
//                 </Link>
                
//                 {/* <Link href={`/results/editResult/${result._id}`} className="text-green-600 hover:text-green-800">
//                   <FaEdit />
//                 </Link> */}
                
//                 <button
                
//                   onClick={() => handleDelete(result._id,result.type)}
//                   className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
//                   style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
//                 >
//                   <FaTrash className="text-gray-700" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResultList;

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Search from '../Search';
import { ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { useUser } from '@/app/components/context/userContext';

interface Result {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  type: string;
  dateAttempted: string; 
  marks: number;
}

const ResultList: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Result | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { token } = useUser();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [verbalResponse, nonVerbalResponse] = await Promise.all([
          axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults', { withCredentials: true }),
          axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResults', { withCredentials: true }),
        ]);

        const combinedResults = [
          ...verbalResponse.data.map((result: Result) => ({ ...result, type: 'Verbal' })),
          ...nonVerbalResponse.data.map((result: Result) => ({ ...result, type: 'Nonverbal' })),
        ];

        setResults(combinedResults);
        setFilteredResults(combinedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleDelete = async (id: string, type: string) => {
    const endpoint = type === 'verbal'
      ? `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/delete/${id}`
      : `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/delete/${id}`;

    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Remove the deleted result from the state
      setResults(prevResults => prevResults.filter(result => result._id !== id));
      setFilteredResults(prevResults => prevResults.filter(result => result._id !== id));
    } else {
      console.error('Failed to delete result');
    }
  };

  const handleSort = (key: keyof Result) => {
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

  const sortedResults = [...filteredResults];
  if (sortConfig.key) {
    sortedResults.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedResults.length === results.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(results.map((result) => result._id));
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term); // Set search term to display in the search bar
    const lowerCaseSearchTerm = term.toLowerCase();
    const filtered = results.filter(
      (result) =>
        result.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        result.dateAttempted.toLowerCase().includes(lowerCaseSearchTerm) ||
        (result.userId && `${result.userId.firstName.toLowerCase()} ${result.userId.lastName.toLowerCase()}`.includes(lowerCaseSearchTerm))
        // `${result.userId.firstName.toLowerCase()} ${result.userId.lastName.toLowerCase()}`.includes(lowerCaseSearchTerm)
    );
    setFilteredResults(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const clearSearch = () => {
    setSearchTerm(''); // Clear the search term
    setFilteredResults(results); // Reset the filtered results to original data
  };

  const handleSelectResult = (id: string) => {
    if (selectedResults.includes(id)) {
      setSelectedResults(selectedResults.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedResults([...selectedResults, id]);
    }
  };

  const renderArrow = (key: keyof Result) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
    if (filter === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((result) => result.type.toLowerCase() === filter.toLowerCase()));
    }
    setCurrentPage(1); // Reset to the first page after filter
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const determineStatus = (marks: number): string => {
    if (marks == 0) return 'Failed';
    return marks > 0 ? 'Passed' : 'Failed';
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstResult, indexOfLastResult);
  
  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">Quiz Results</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 rounded-md text-center bg-eisha text-white"
          >
            <option value="all">All</option>
            <option value="verbal">Verbal</option>
            <option value="nonverbal">Nonverbal</option>
          </select>
          <Link href="/results/addResults" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center">
            Add Results
          </Link>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead className="px-6 py-3 text-left font-bold bg-eisha text-white ">
          <tr>
            <th className="px-6 py-3 text-left font-bold ">
              <div onClick={() => handleSort('userId')} className="cursor-pointer flex items-center">
                Name {renderArrow('userId')}
              </div>
            </th>
            <th className="px-6 py-3 text-left font-bold">
              <div onClick={() => handleSort('type')} className="cursor-pointer flex items-center">
                Quiz Type {renderArrow('type')}
              </div>
            </th>
            <th className="px-6 py-3 text-left font-bold">
              <div onClick={() => handleSort('dateAttempted')} className="cursor-pointer flex items-center">
                Date Attempted {renderArrow('dateAttempted')}
              </div>
            </th>
            <th className="px-6 py-3 text-left font-bold">
              <div onClick={() => handleSort('marks')} className="cursor-pointer flex items-center">
                Marks {renderArrow('marks')}
              </div>
            </th>
            <th className="px-6 py-3 text-left font-bold">
              Status
            </th>
            <th className="px-6 py-3 text-left font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result) => (
            <tr key={result._id} className="border-t border-gray-300">
              <td className="px-6 py-4">
                {/* {result.userId.firstName} {result.userId.lastName} */}
                {result.userId ? `${result.userId.firstName} ${result.userId.lastName}` : 'Unknown User'}
              </td>
              <td className="px-6 py-4">{result.type}</td>
              <td className="px-6 py-4">{formatDate(result.dateAttempted)}</td>
              <td className="px-6 py-4">{result.marks}</td>
              <td className="px-6 py-4">{determineStatus(result.marks)}</td>
              <td className="py-2 px-8 border-b border-gray-200 flex justify-center space-x-2">
               <Link href={`/results/viewresults/${result._id}/detailResult?type=${result.type}`} className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                 <FaEye  className="text-gray-700"  />
               </Link>
                
               
                                 <button
                
                  onClick={() => handleDelete(result._id,result.type)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-100"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultList;
