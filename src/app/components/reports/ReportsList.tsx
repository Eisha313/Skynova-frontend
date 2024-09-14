
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Link from 'next/link';
// // import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; // Importing the icons

// // interface Report {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   type: string;
// //   date: string;
// // }

// // const ReportsList: React.FC = () => {
// //   const [reports, setReports] = useState<Report[]>([]);

// //   useEffect(() => {
// //     const fetchReports = async () => {
// //       try {
// //         const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/reports/viewReport');
// //         console.log(response.data); // Log the response data
// //         setReports(response.data);
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       }
// //     };
// //     fetchReports();
// //   }, []);

// //   const handleDelete = async (id: string) => {
// //     console.log('Deleting report with id:', id); // Log the id
// //     try {
// //       await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/reports/deleteReport/${id}`);
// //       setReports(reports.filter((report) => report._id !== id));
// //     } catch (error) {
// //       console.error('Error deleting report:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
// //       <div className="mb-6 flex justify-between items-center">
// //         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
// //         <Link href="/reports/addReports">
// //           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
// //             Create Report
// //           </button>
// //         </Link>
// //       </div>
// //       <div className="space-y-4">
// //         {reports.map((report) => (
// //           <div
// //             key={report._id} // Ensure '_id' is unique
// //             className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
// //           >
// //             <div>
// //               <h2 className="text-xl font-semibold text-gray-900">{report.name}</h2>
// //               <p className="text-gray-700">{report.description}</p>
// //               <p className="text-gray-500 text-sm">{report.type}</p>
// //               <p className="text-gray-500 text-sm">{new Date(report.date).toLocaleDateString()}</p>
// //             </div>
// //             <div className="flex space-x-2">
// //               <Link href={`/reports/viewReports/${report._id}/editReport`}>
// //                 <button className="text-green-500 hover:text-green-700 transition">
// //                   <FaEdit />
// //                 </button>
// //               </Link>
// //               <Link href={`/reports/viewReports/${report._id}/reportDetails`}>
// //                 <button className="text-blue-500 hover:text-blue-700 transition">
// //                   <FaEye />
// //                 </button>
// //               </Link>
// //               <button
// //                 className="text-red-500 hover:text-red-700 transition"
// //                 onClick={() => handleDelete(report._id)}
// //               >
// //                 <FaTrash />
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportsList;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// interface Report {
//   _id: string;
//   name: string;
//   description: string;
//   type: string;
//   date: string;
// }

// const ReportsList: React.FC = () => {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Report | null; direction: 'asc' | 'desc' }>({
//     key: null,
//     direction: 'asc',
//   });
//   const [selectedReports, setSelectedReports] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/reports/viewReport');
//         setReports(response.data);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };
//     fetchReports();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/reports/deleteReport/${id}`);
//       setReports(reports.filter((report) => report._id !== id));
//     } catch (error) {
//       console.error('Error deleting report:', error);
//     }
//   };

//   const handleSort = (key: keyof Report) => {
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

//   const sortedReports = [...reports];
//   if (sortConfig.key) {
//     sortedReports.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
//   }

//   const handleSelectAll = () => {
//     if (selectedReports.length === reports.length) {
//       setSelectedReports([]);
//     } else {
//       setSelectedReports(reports.map(report => report._id));
//     }
//   };

//   const handleSelectReport = (id: string) => {
//     if (selectedReports.includes(id)) {
//       setSelectedReports(selectedReports.filter(selectedId => selectedId !== id));
//     } else {
//       setSelectedReports([...selectedReports, id]);
//     }
//   };

//   const renderArrow = (key: keyof Report) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? '▲' : '▼';
//     }
//     return '▷';
//   };

//   if (reports.length === 0) return <p>No reports found</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="py-2 px-4 border-b">
//               <input
//                 type="checkbox"
//                 checked={selectedReports.length === reports.length}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             {['Name', 'Description', 'Type', 'Date', 'Actions'].map((header, index) => (
//               <th
//                 key={header}
//                 className="py-2 px-4 border-b cursor-pointer"
//                 onClick={() => handleSort(header.toLowerCase() as keyof Report)}
//               >
//                 {header} {index !== 4 && renderArrow(header.toLowerCase() as keyof Report)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedReports.map((report) => (
//             <tr key={report._id} className="hover:bg-gray-100">
//               <td className="py-2 px-4 border-b">
//                 <input
//                   type="checkbox"
//                   checked={selectedReports.includes(report._id)}
//                   onChange={() => handleSelectReport(report._id)}
//                 />
//               </td>
//               <td className="py-2 px-4 border-b">{report.name}</td>
//               <td className="py-2 px-4 border-b">{report.description}</td>
//               <td className="py-2 px-4 border-b">{report.type}</td>
//               <td className="py-2 px-4 border-b">{new Date(report.date).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b text-center">
//                 <div className="flex justify-center space-x-2">
//                   <Link href={`/reports/viewReports/${report._id}/reportDetails`} passHref>
//                     <button className="text-blue-500 hover:bg-gray-200 p-2 rounded-full">
//                       <FaEye className="text-gray-700" />
//                     </button>
//                   </Link>
//                   <Link href={`/reports/viewReports/${report._id}/editReport`} passHref>
//                     <button className="text-blue-500 hover:bg-gray-200 p-2 rounded-full">
//                       <FaEdit className="text-gray-700" />
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(report._id)}
//                     className="text-red-500 hover:bg-gray-200 p-2 rounded-full"
//                   >
//                     <FaTrash className="text-gray-700" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportsList;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Search from '../Search';

interface Report {
  _id: string;
  name: string;
  description: string;
  type: string;
  date: string;
}

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Report | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [filteredReports,setFilteredReports]=useState<Report[]>([])
  

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/reports/viewReport',{withCredentials:true});
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);
  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = reports.filter(report =>
        report.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.date.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.date.toLowerCase().includes(lowerCaseSearchTerm)


    );
    setFilteredReports(filtered);
  };
  const handleDelete = async (id: string) => {
        try {
          await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/reports/deleteReport/${id}`,{withCredentials:true});
          setReports(reports.filter((report) => report._id !== id));
        } catch (error) {
          console.error('Error deleting report:', error);
        }
      };

  const handleSort = (key: keyof Report) => {
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

  const sortedReports = [...reports];
  if (sortConfig.key) {
    sortedReports.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedReports.size === reports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(reports.map(report => report._id)));
    }
  };

  const handleSelectReport = (id: string) => {
    setSelectedReports(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const renderArrow = (key: keyof Report) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  return (
    <div className="overflow-x-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
      {/* <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
        <Link href="/reports/addReports">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Report
          </button>
        </Link>
      </div> */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Notifications</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} />
          <Link href="/notification/addNotification" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center">
            Add Notification
          </Link>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              <input
                type="checkbox"
                checked={selectedReports.size === reports.length}
                onChange={handleSelectAll}
              />
            </th>
            {['Name', 'Description', 'Type', 'Date', 'Actions'].map((header, index) => (
              <th
                key={header}
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Report)}
              >
                {header} {index !== 4 && renderArrow(header.toLowerCase() as keyof Report)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedReports.map((report) => (
            <tr key={report._id} className="border-b">
              <td className="py-2 px-4 text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedReports.has(report._id)}
                  onChange={() => handleSelectReport(report._id)}
                />
              </td>
              <td className="py-2 px-4 text-gray-800">{report.name}</td>
              <td className="py-2 px-4 text-gray-800">{report.description}</td>
              <td className="py-2 px-4 text-gray-800">{report.type}</td>
              <td className="py-2 px-4 text-gray-800">{new Date(report.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center">
                <Link href={`/reports/viewReports/${report._id}/reportDetails`}>
                  <button className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                    <FaEye className="text-gray-700" />
                  </button>
                </Link>
                <Link href={`/reports/viewReports/${report._id}/editReport`} passHref>
                  <button className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
