// // components/ComplaintForm.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface Complaint {
//   id?: string;
//   title: string;
//   description: string;
// }

// const ComplaintForm: React.FC<{ id?: string }> = ({ id }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       setIsEditing(true);
//       const fetchComplaint = async () => {
//         try {
//           const response = await axios.get(`http://localhost:4000/complaints/viewComplaint/${id}`);
//           const complaint = response.data[0];
//           setTitle(complaint.title);
//           setDescription(complaint.description);
//         } catch (error) {
//           console.error('Error fetching complaint:', error);
//         }
//       };
//       fetchComplaint();
//     }
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const complaintData: Complaint = { title, description };

//     try {
//       if (isEditing) {
//         await axios.patch(`http://localhost:4000/complaints/updateComplaint/${id}`, complaintData);
//         alert('Complaint updated successfully');
//       } else {
//         await axios.post('http://localhost:4000/complaints/createComplaint', complaintData);
//         alert('Complaint created successfully');
//       }
//       router.push('/complaints/viewComplaints');
//     } catch (error) {
//       console.error('Error saving complaint:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {isEditing ? 'Edit Complaint' : 'Add Complaint'}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
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
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {isEditing ? 'Update Complaint' : 'Add Complaint'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ComplaintForm;
// components/ComplaintForm.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Complaint {
  title: string;
  description: string;
}

const ComplaintForm: React.FC<{ id?: string }> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchComplaint = async () => {
        try {
          const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/viewComplaint/${id}`);
          const complaint = response.data[0];
          setTitle(complaint.title);
          setDescription(complaint.description);
        } catch (error) {
          console.error('Error fetching complaint:', error);
        }
      };
      fetchComplaint();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const complaintData: Complaint = { title, description };

    try {
        if (isEditing) {
            await axios.patch(`https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/updateComplaint/${id}`, complaintData);
            alert('Complaint updated successfully');
        } else {
            await axios.post('https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/createComplaint', complaintData);
            alert('Complaint created successfully');
        }
        router.push('/complaints/viewComplaints');
    } catch (error) {
        console.error('Error saving complaint:', error);
    }
};

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Complaint' : 'Add Complaint'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Update Complaint' : 'Add Complaint'}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
