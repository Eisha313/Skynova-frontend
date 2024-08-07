// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface Result {
//   id?: string;
//   type: string;
//   description: string;
//   marks: number;
// }

// const ResultForm: React.FC<{ id?: string }> = ({ id }) => {
//   const [type, setType] = useState('');
//   const [description, setDescription] = useState('');
//   const [marks, setMarks] = useState<number>(0); // Initialize with 0
//   const [isEditing, setIsEditing] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       setIsEditing(true);
//       const fetchResult = async () => {
//         try {
//           const response = await axios.get(`http://localhost:4000/results/viewResult/${id}`);
//           const result = response.data[0];
//           setType(result.type);
//           setDescription(result.description);
//           setMarks(result.marks);
//         } catch (error) {
//           console.error('Error fetching result:', error);
//         }
//       };
//       fetchResult();
//     }
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const resultData: Result = { type, description, marks };

//     try {
//       if (isEditing) {
//         await axios.patch(`http://localhost:4000/results/updateResult/${id}`, resultData);
//         alert('Result updated successfully');
//       } else {
//         await axios.post('http://localhost:4000/results/createResults', resultData);
//         alert('Result created successfully');
//       }
//       router.push('/results/viewresults');
//     } catch (error) {
//       console.error('Error saving result:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {isEditing ? 'Edit Result' : 'Add Result'}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-1">Type</label>
//           <input
//             type="text"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             rows={4}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Marks</label>
//           <input
//             type="number"
//             value={marks}
//             onChange={(e) => setMarks(Number(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {isEditing ? 'Update Result' : 'Add Result'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResultForm;
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaSave, FaEdit } from 'react-icons/fa';

interface Result {
  id?: string;
  type: string;
  description: string;
  marks: number;
}

const ResultForm: React.FC<{ id?: string }> = ({ id }) => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchResult = async () => {
        try {
          const response = await axios.get(`http://192.168.18.54:3000/results/viewResult/${id}`);
          const result = response.data[0];
          setType(result.type);
          setDescription(result.description);
          setMarks(result.marks);
        } catch (error) {
          console.error('Error fetching result:', error);
        }
      };
      fetchResult();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultData: Result = { type, description, marks };

    try {
      if (isEditing) {
        await axios.patch(`http://192.168.18.54:3000/results/updateResult/${id}`, resultData);
        alert('Result updated successfully');
      } else {
        await axios.post('http://192.168.18.54:3000/results/createResults', resultData);
        alert('Result created successfully');
      }
      router.push('/results');
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {isEditing ? 'Edit Result' : 'Add Result'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? <FaEdit /> : <FaSave />}
          {isEditing ? 'Update Result' : 'Add Result'}
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
