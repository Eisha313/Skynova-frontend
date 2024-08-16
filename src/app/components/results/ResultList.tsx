
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Link from 'next/link';
// // import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// // interface Result {
// //   _id: string;
// //   type: string;
// //   description: string;
// //   marks: number;
// // }

// // const ResultList: React.FC = () => {
// //   const [results, setResults] = useState<Result[]>([]);

// //   useEffect(() => {
// //     const fetchResults = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:4000/results/viewResults');
// //         setResults(response.data);
// //       } catch (error) {
// //         console.error('Error fetching results:', error);
// //       }
// //     };
// //     fetchResults();
// //   }, []);

// //   const handleDelete = async (id: string) => {
// //     try {
// //       await axios.delete(`http://localhost:4000/results/deleteResult/${id}`);
// //       setResults(results.filter((result) => result._id !== id));
// //     } catch (error) {
// //       console.error('Error deleting result:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
// //       <h1 className="text-3xl font-bold text-gray-800 mb-6">Results List</h1>
// //       <div className="mb-4">
// //         <Link href="/results/addResults">
// //           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
// //             Create New Result
// //           </button>
// //         </Link>
// //       </div>
// //       <div className="space-y-4">
// //         {results.map((result) => (
// //           <div key={result._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
// //             <div>
// //               <h2 className="text-xl font-semibold text-gray-900">{result.type}</h2>
// //               <p className="text-gray-700">{result.description}</p>
// //               <p className="text-gray-500">Marks: {result.marks}</p>
// //             </div>
// //             <div className="flex space-x-3">
// //               <Link href={`/results/viewresults/${result._id}/detailResult`}className="text-blue-600 hover:text-blue-700">
               
// //                   <FaEye size={20} />
                
// //               </Link>
// //               <Link href={`/results/viewresults/${result._id}/editResult`} className="text-green-600 hover:text-green-700">
                
// //                   <FaEdit size={20} />
                
// //               </Link>
// //               <button
// //                 className="text-red-600 hover:text-red-700"
// //                 onClick={() => handleDelete(result._id)}
// //               >
// //                 <FaTrash size={20} />
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResultList;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// interface Result {
//   _id: string;
//   type: string;
//   description: string;
//   marks: number;
// }

// const ResultList: React.FC = () => {
//   const [results, setResults] = useState<Result[]>([]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults');
//         setResults(response.data);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       }
//     };
//     fetchResults();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/deleteResult/${id}`);
//       setResults(results.filter((result) => result._id !== id));
//     } catch (error) {
//       console.error('Error deleting result:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl">
//       <div className="flex justify-end mb-4">
//         <Link href="/results/addResults">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//             Create New Result
//           </button>
//         </Link>
//       </div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Results List</h1>
//       <div className="space-y-4">
//         {results.map((result) => (
//           <div key={result._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">{result.type}</h2>
//               <p className="text-gray-700">{result.description}</p>
//               <p className="text-gray-500">Marks: {result.marks}</p>
//             </div>
//             <div className="flex space-x-3">
//               <Link href={`/results/viewresults/${result._id}/detailResult`} className="text-blue-600 hover:text-blue-700">
//                 <FaEye size={20} />
//               </Link>
//               <Link href={`/results/viewresults/${result._id}/editResult`} className="text-green-600 hover:text-green-700">
//                 <FaEdit size={20} />
//               </Link>
//               <button
//                 className="text-red-600 hover:text-red-700"
//                 onClick={() => handleDelete(result._id)}
//               >
//                 <FaTrash size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
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

interface Result {
  _id: string;
  type: string;
  description: string;
  marks: number;
}

const ResultList: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults,setFilteredResults]=useState<Result[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof Result | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/deleteResult/${id}`);
      setResults(results.filter((result) => result._id !== id));
    } catch (error) {
      console.error('Error deleting result:', error);
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

  const sortedResults = [...results];
  if (sortConfig.key) {
    sortedResults.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedResults.length === results.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(results.map(result => result._id));
    }
  };
  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = results.filter(result =>
      result.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      result.description.toLowerCase().includes(lowerCaseSearchTerm) 
      // result.marks.toLowerCase().includes(lowerCaseSearchTerm) 
      // user.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      // user.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredResults(filtered);
  };

  const handleSelectResult = (id: string) => {
    if (selectedResults.includes(id)) {
      setSelectedResults(selectedResults.filter(selectedId => selectedId !== id));
    } else {
      setSelectedResults([...selectedResults, id]);
    }
  };

  const renderArrow = (key: keyof Result) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  // if (results.length === 0) return <p>No results found</p>;

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Users</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} />
          {/* <Filter onFilterChange={handleFilterChange} />
          <DownloadPDF users={filteredUsers}  /> */}
          <Link 
            href="/results/addResults" 
            className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center"
          
          >
            Add Results
          </Link>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b bg-eisha cursor-pointer">
              <input
                type="checkbox"
                checked={selectedResults.length === results.length}
                onChange={handleSelectAll}
              />
            </th>
            {['Type', 'Description', 'Marks', 'Actions'].map((header, index) => (
              <th
                key={header}
                className="py-2 px-4 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Result)}
              >
                {header} {index !== 3 && renderArrow(header.toLowerCase() as keyof Result)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result) => (
            <tr key={result._id}>
              <td className="py-2 px-4 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedResults.includes(result._id)}
                  onChange={() => handleSelectResult(result._id)}
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{
                                result.type
                              }</td>
                              <td className="py-2 px-4 border-b border-gray-200">{
                                result.description
                              }</td>
                              <td className="py-2 px-4 border-b border-gray-200">{
                                result.marks
                              }</td>
                              <td className="py-2 px-4 border-b border-gray-200 flex justify-center gap-2">
                                <Link href={`/results/view/${result._id}`}>
                                  <FaEye className="text-blue-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full border border-gray-400" />
                                </Link>
                                <Link href={`/results/edit/${result._id}`}>
                                  <FaEdit className="text-blue-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full border border-gray-400" />
                                </Link>
                                <FaTrash
                                  className="text-red-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full border border-gray-400"
                                  onClick={() => handleDelete(result._id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                };
                
                export default ResultList;
                
