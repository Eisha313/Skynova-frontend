
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
//         const response = await axios.get('http://localhost:4000/results/viewResults');
//         setResults(response.data);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       }
//     };
//     fetchResults();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:4000/results/deleteResult/${id}`);
//       setResults(results.filter((result) => result._id !== id));
//     } catch (error) {
//       console.error('Error deleting result:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Results List</h1>
//       <div className="mb-4">
//         <Link href="/results/addResults">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//             Create New Result
//           </button>
//         </Link>
//       </div>
//       <div className="space-y-4">
//         {results.map((result) => (
//           <div key={result._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">{result.type}</h2>
//               <p className="text-gray-700">{result.description}</p>
//               <p className="text-gray-500">Marks: {result.marks}</p>
//             </div>
//             <div className="flex space-x-3">
//               <Link href={`/results/viewresults/${result._id}/detailResult`}className="text-blue-600 hover:text-blue-700">
               
//                   <FaEye size={20} />
                
//               </Link>
//               <Link href={`/results/viewresults/${result._id}/editResult`} className="text-green-600 hover:text-green-700">
                
//                   <FaEdit size={20} />
                
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

interface Result {
  _id: string;
  type: string;
  description: string;
  marks: number;
}

const ResultList: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://sky-nova-8ccaddc754ce.herokuapp.com/results/deleteResult/${id}`);
      setResults(results.filter((result) => result._id !== id));
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl">
      <div className="flex justify-end mb-4">
        <Link href="/results/addResults">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create New Result
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Results List</h1>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{result.type}</h2>
              <p className="text-gray-700">{result.description}</p>
              <p className="text-gray-500">Marks: {result.marks}</p>
            </div>
            <div className="flex space-x-3">
              <Link href={`/results/viewresults/${result._id}/detailResult`} className="text-blue-600 hover:text-blue-700">
                <FaEye size={20} />
              </Link>
              <Link href={`/results/viewresults/${result._id}/editResult`} className="text-green-600 hover:text-green-700">
                <FaEdit size={20} />
              </Link>
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDelete(result._id)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
