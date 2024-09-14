
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface ReportFormProps {
//   id?: string; 
// }

// const ReportForm: React.FC<ReportFormProps> = ({ id }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [type, setType] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       const fetchReport = async () => {
//         try {
//           const response = await fetch(`http://localhost:4000/reports/viewReport/${id}`);
//           if (!response.ok) throw new Error('Failed to fetch report');
//           const data = await response.json();
//           const report = data[0];
//           setName(report.name);
//           setDescription(report.description);
//           setType(report.type);
//         } catch (error) {
//           console.error('Error fetching report:', error);
//         }
//       };
//       fetchReport();
//     }
//     console.log(id);
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         id ? `http://localhost:4000/reports/updateReport/${id}` : 'http://localhost:4000/reports/createReport',
//         {
//           method: id ? 'PATCH' : 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, description, type }),
//         }
//       );
//       if (!response.ok) throw new Error('Failed to submit report');
//       router.push('/reports/viewReports');
//     } catch (error) {
//       console.error('Error submitting report:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{id ? 'Update Report' : 'Create Report'}</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             className="border p-2 w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             className="border p-2 w-full"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
//           <input
//             type="text"
//             id="type"
//             className="border p-2 w-full"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           />
//         </div>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           {id ? 'Update Report' : 'Create Report'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReportForm;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ReportFormProps {
  id?: string; // id is optional
}

const ReportForm: React.FC<ReportFormProps> = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchReport = async () => {
        try {
          const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/reports/viewReport/${id}`,{credentials: 'include'});
          if (!response.ok) throw new Error('Failed to fetch report');
          const data = await response.json();
          const report = data[0];
          setName(report.name);
          setDescription(report.description);
          setType(report.type);
        } catch (error) {
          console.error('Error fetching report:', error);
        }
      };
      fetchReport();
    }
    console.log(id);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        id ? `https://sky-nova-8ccaddc754ce.herokuapp.com/reports/updateReport/${id}` : 'https://sky-nova-8ccaddc754ce.herokuapp.com/reports/createReport',
        {
          method: id ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, type }),
          credentials: 'include'
        }
      );
      if (!response.ok) throw new Error('Failed to submit report');
      router.push('/reports/viewReports');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{id ? 'Update Report' : 'Create Report'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            className="border p-2 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {id ? 'Update Report' : 'Create Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
