// import React, { useState } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   username: string;
//   type: string;
//   status: string;
// }

// interface ModalProps {
//   user: User;
//   onClose: () => void;
//   onDelete: () => void;
//   onUpdate: (updatedData: Partial<User>) => void;
// }

// const Modal: React.FC<ModalProps> = ({ user, onClose, onDelete, onUpdate }) => {
//   const [editedUser, setEditedUser] = useState<User>(user);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-xl font-bold mb-4">User Details</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={editedUser.name}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={editedUser.email}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={editedUser.username}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Type:</label>
//           <input
//             type="text"
//             name="type"
//             value={editedUser.type}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Status:</label>
//           <input
//             type="text"
//             name="status"
//             value={editedUser.status}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>          <button 
//             onClick={() => {
//               onUpdate(editedUser);
//               onClose();
//             }}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Update
//           </button>
//           <button 
//             onClick={() => {
//               onDelete();
//               onClose();
//             }}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from 'react';
import Image from 'next/image';

interface User {
  id: number;
  email: string;
  username: string;
  type: string;
  status: string;
}

interface ModalProps {
  user: User;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Aviator Details</h2>
        <div className="mb-4">
          <Image
            src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`} // Adjust as necessary
            alt={user.username}
            width={32}
            height={32}
            className="w-24 h-24 rounded-full mb-4"
          />
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Type:</strong> {user.type}</p>
          <p><strong>Status:</strong> {user.status}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
