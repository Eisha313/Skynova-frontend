
// // components/ReportDetails.tsx
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// interface Report {
//   id: string;
//   name: string;
//   description: string;
//   type: string;
//   date: string;
// }

// const ReportDetails: React.FC<{ id: string }> = ({ id }) => {
//   const [report, setReport] = useState<Report | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/reports/viewReport/${id}`);
//         setReport(response.data[0]);
//       } catch (error) {
//         console.error('Error fetching report:', error);
//       }
//     };
//     fetchReport();
//   }, [id]);

//   if (!report) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Report Details</h1>
//       <div className="bg-white p-4 rounded-md shadow-md">
//         <h2 className="text-xl font-semibold text-gray-900">{report.name}</h2>
//         <p className="text-gray-700">{report.description}</p>
//         <p className="text-gray-500 text-sm">{report.type}</p>
//         <p className="text-gray-500 text-sm">{new Date(report.date).toLocaleDateString()}</p>
//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           onClick={() => router.push('/reports')}
//         >
//           Back to Reports
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportDetails;
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Report {
  id: string;
  name: string;
  description: string;
  type: string;
  date: string;
}

const ReportDetails: React.FC<{ id: string }> = ({ id }) => {
  const [report, setReport] = useState<Report | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://192.168.18.54:3000/reports/viewReport/${id}`);
        setReport(response.data[0]);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    fetchReport();
  }, [id]);

  if (!report) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report Details</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{report.name}</h2>
          <p className="text-gray-700 text-lg mt-2">{report.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm font-medium">Type:</p>
          <p className="text-gray-700">{report.type}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-500 text-sm font-medium">Date:</p>
          <p className="text-gray-700">{new Date(report.date).toLocaleDateString()}</p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
          onClick={() => router.push('/reports/viewReports')}
        >
          Back to Reports
        </button>
      </div>
    </div>
  );
};

export default ReportDetails;
