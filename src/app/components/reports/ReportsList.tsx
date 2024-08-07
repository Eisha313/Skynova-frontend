
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// interface Report {
//     _id: string;
//     name: string;
//     description: string;
//     type: string;
//     date: string;
//   }
  

// const ReportsList: React.FC = () => {
//   const [reports, setReports] = useState<Report[]>([]);


// useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get('http://192.168.18.54:3000/reports/viewReport');
//         console.log(response.data); // Log the response data
//         setReports(response.data);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };
//     fetchReports();
//   }, []);
// const handleDelete = async (id: string) => {
//     console.log('Deleting report with id:', id); // Log the id
//     try {
//       await axios.delete(`http://192.168.18.54:3000/reports/deleteReport/${id}`);
//       setReports(reports.filter((report) => report._id !== id));
//     } catch (error) {
//       console.error('Error deleting report:', error);
//     }
//   };
  

//   return (
//     <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
//         <Link href="/reports/addReports">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             Create Report
//           </button>
//         </Link>
//       </div>
//       <div className="space-y-4">
//         {reports.map((report) => (
//           <div
//             key={report._id} // Ensure 'id' is unique
//             className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
//           >
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">{report.name}</h2>
//               <p className="text-gray-700">{report.description}</p>
//               <p className="text-gray-500 text-sm">{report.type}</p>
//               <p className="text-gray-500 text-sm">{new Date(report.date).toLocaleDateString()}</p>
//             </div>
//             <div className="flex space-x-2">
//               <Link href={`/reports/viewReports/${report._id}/editReport`}>
//                 <button className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
//                   Edit
//                 </button>
//               </Link>
//               <Link href={`/reports/viewReports/${report._id}/reportDetails`}>
//                 <button className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
//                   View
//                 </button>
//               </Link>
//               <button
//                 className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//                 onClick={() => handleDelete(report._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReportsList;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; // Importing the icons

interface Report {
  _id: string;
  name: string;
  description: string;
  type: string;
  date: string;
}

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://192.168.18.54:3000/reports/viewReport');
        console.log(response.data); // Log the response data
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    console.log('Deleting report with id:', id); // Log the id
    try {
      await axios.delete(`http://192.168.18.54:3000/reports/deleteReport/${id}`);
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
        <Link href="/reports/addReports">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Report
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report._id} // Ensure '_id' is unique
            className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{report.name}</h2>
              <p className="text-gray-700">{report.description}</p>
              <p className="text-gray-500 text-sm">{report.type}</p>
              <p className="text-gray-500 text-sm">{new Date(report.date).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/reports/viewReports/${report._id}/editReport`}>
                <button className="text-green-500 hover:text-green-700 transition">
                  <FaEdit />
                </button>
              </Link>
              <Link href={`/reports/viewReports/${report._id}/reportDetails`}>
                <button className="text-blue-500 hover:text-blue-700 transition">
                  <FaEye />
                </button>
              </Link>
              <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(report._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
