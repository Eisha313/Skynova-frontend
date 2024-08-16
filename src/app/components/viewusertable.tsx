// // 'use client'
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';

// // export interface User {
// //   id: number; 
// //   backendId: number;
// //   name: string;
// //   email: string;
// //   username: string;
// //   type: string;
// //   status: string;
// // }

// // interface UserTableProps {
// //   users: User[];
// //   onView: (user: User) => void;
// //   onDelete: (userId: number) => void;
// //   onUpdate: (userId: number, updatedData: Partial<User>) => void;
// //   onEdit: (user: User) => void;
// // }

// // const UserTable: React.FC<UserTableProps> = ({ users, onView, onDelete, onUpdate, onEdit }) => {
// //   const [sortConfig, setSortConfig] = useState<{ key: keyof User | null; direction: 'asc' | 'desc' }>({
// //     key: null,
// //     direction: 'asc'
// //   });

// //   const sortedUsers = [...users];
// //   if (sortConfig.key) {
// //     sortedUsers.sort((a, b) => {
// //       const aKey = a[sortConfig.key!];
// //       const bKey = b[sortConfig.key!];

// //       if (aKey < bKey) {
// //         return sortConfig.direction === 'asc' ? -1 : 1;
// //       }
// //       if (aKey > bKey) {
// //         return sortConfig.direction === 'asc' ? 1 : -1;
// //       }
// //       return 0;
// //     });
// //   }

// //   const handleSort = (key: keyof User) => {
// //     let direction: 'asc' | 'desc' = 'asc';
// //     if (sortConfig.key === key && sortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const renderArrow = (key: keyof User) => {
// //     if (sortConfig.key === key) {
// //       return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
// //     }
// //     return '↕️';
// //   };

// //   if (users.length === 0) return <p>No users found</p>;

// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="min-w-full bg-white">
// //         <thead>
// //           <tr>
// //             {['ID', 'Image', 'Name', 'Email', 'Username', 'Type', 'Status', 'Actions'].map((header, index) => (
// //               <th
// //                 key={header}
// //                 className="py-2 px-4 border-b border-gray-200 cursor-pointer"
// //                 onClick={() => handleSort(header.toLowerCase() as keyof User)}
// //               >
// //                 {header} {index !== 1 && renderArrow(header.toLowerCase() as keyof User)}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sortedUsers.map((user, index) => (
// //             <tr key={user.backendId}>
// //               <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
// //               <td className="py-2 px-4 border-b border-gray-200">
// //                 <Image
// //                   src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
// //                   alt={user.name}
// //                   width={33} 
// //                   height={33} 
// //                   className="rounded-full"
// //                 />
// //               </td>
// //               <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
// //               <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
// //               <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
// //               <td className="py-2 px-4 border-b border-gray-200">{user.type}</td>
// //               <td className="py-2 px-4 border-b border-gray-200">
// //                 <span className={`px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
// //                   {user.status}
// //                 </span>
// //               </td>
// //               <td className="py-2 px-4 border-b border-gray-200">
// //                 <button
// //                   onClick={() => onView(user)}
// //                   className="text-blue-500 hover:underline mr-2"
// //                 >
// //                   👁️
// //                 </button>
// //                 <Link href={`/viewuser/${user.backendId}/edit`} passHref>
// //                   <button
// //                     className="text-blue-500 hover:underline mr-2"
// //                   >
// //                     ✏️
// //                   </button>
// //                 </Link>
// //                 <button
// //                   onClick={() => onDelete(user.backendId)}
// //                   className="text-red-500 hover:underline"
// //                 >
// //                   🗑️
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default UserTable;
// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FaEye,FaEdit,FaTrash } from 'react-icons/fa';

// export interface User {
//   id: number; 
//   backendId: number;
//   name: string;
//   email: string;
//   username: string;
//   type: string;
//   status: string;
// }

// interface UserTableProps {
//   users: User[];
//   onView: (user: User) => void;
//   onDelete: (userId: number) => void;
//   onUpdate: (userId: number, updatedData: Partial<User>) => void;
//   onEdit: (user: User) => void;
// }

// const UserTable: React.FC<UserTableProps> = ({ users, onView, onDelete, onUpdate, onEdit }) => {
//   const [sortConfig, setSortConfig] = useState<{ key: keyof User | null; direction: 'asc' | 'desc' }>({
//     key: null,
//     direction: 'asc'
//   });
//   const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

//   const handleSort = (key: keyof User) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
//     if (a === b) return 0;
//     if (a == null) return 1; // Sort null/undefined to the end
//     if (b == null) return -1; // Sort null/undefined to the end
//     if (typeof a === 'string' && typeof b === 'string') {
//       return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
//     }
//     return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
//   };

//   const sortedUsers = [...users];
//   if (sortConfig.key) {
//     sortedUsers.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
//   }

//   const handleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(users.map(user => user.backendId));
//     }
//   };

//   const handleSelectUser = (backendId: number) => {
//     if (selectedUsers.includes(backendId)) {
//       setSelectedUsers(selectedUsers.filter(id => id !== backendId));
//     } else {
//       setSelectedUsers([...selectedUsers, backendId]);
//     }
//   };

//   // const renderArrow = (key: keyof User) => {
//   //   if (sortConfig.key === key) {
//   //     return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
//   //   }
//   //   // return '↕️';
//   //   return '^'
//   // };
//   // const renderArrow = (key: keyof User) => {
//   //   if (sortConfig.key === key) {
//   //     return sortConfig.direction === 'asc' ? '↑' : '↓';
//   //   }
//   //   return ''; // No arrow when the column is not being sorted
//   // };
//   // const renderArrow = (key: keyof User) => {
//   //   if (sortConfig.key === key) {
//   //     return sortConfig.direction === 'asc' ? '▲' : '▼';
//   //   }
//   //   return '↕';
//   // };  
//   const renderArrow = (key: keyof User) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? '▲' : '▼'; // Filled arrows for sorting direction
//     }
//     return '▷'; // Unfilled arrow pointing to the right (default state)
//   };
//   // const renderArrow = (key: keyof User) => {
//   //   if (sortConfig.key === key) {
//   //     return sortConfig.direction === 'asc' ? '▲' : '▼';
//   //   }
//   //   return '▸'; // Unfilled arrow pointing to the right
//   // };
  

//   if (users.length === 0) return <p>No users found</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead className="bg-eisha text-white">
//           <tr>
//             <th className="py-2 px-4 border-b bg-eisha cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedUsers.length === users.length}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             {['ID', 'Image', 'Name', 'Email', 'Username', 'Type', 'Status', 'Actions'].map((header, index) => (
//               <th
//                 key={header}
//                 className="py-2 px-4 border-b border-gray-200 cursor-pointer"
//                 onClick={() => handleSort(header.toLowerCase() as keyof User)}
//               >
//                 {header} {index !== 1 && renderArrow(header.toLowerCase() as keyof User)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedUsers.map((user, index) => (
//             <tr key={user.backendId}>
//               <td className="py-2 px-4 border-b border-gray-200 font-small font-thin">
//                 <input
//                   type="checkbox"
//                   checked={selectedUsers.includes(user.backendId)}
//                   onChange={() => handleSelectUser(user.backendId)}
//                 />
//               </td>
//               <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
//               <td className="py-2 px-4 border-b border-gray-200">
//                 <Image
//                   src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
//                   alt={user.name}
//                   width={33} 
//                   height={33} 
//                   className="rounded-full"
//                 />
//               </td>
//               <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
//               <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
//               <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
//               <td className="py-2 px-4 border-b border-gray-200">{user.type}</td>
//               <td className="py-2 px-4 border-b border-gray-200">
//                 <span className={`px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
//                   {user.status}
//                 </span>
//               </td>
//               <td className="py-2 px-4 border-b border-gray-200">
//                 <button
//                   onClick={() => onView(user)}
//                   className="text-blue-500 hover:underline mr-2 mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
//                 >
//                   <FaEye className="text-gray-700" />
//                 </button>
//                 <Link href={`/viewuser/${user.backendId}/edit`} passHref>
//                   <button
//                     className="text-blue-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
//                   >
//                     <FaEdit className="text-gray-700" />
//                   </button>
//                 </Link>
               
//                 <button
//                   onClick={() => onDelete(user.backendId)}
//                   className="text-red-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
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

// export default UserTable;
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export interface User {
  id: number;
  backendId: number;
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onDelete: (userId: number) => Promise<void>;
  onUpdate: (userId: number, updatedData: Partial<User>) => Promise<void>;
  onEdit: (user: User) => void;
}


const UserTable: React.FC<UserTableProps> = ({ users, onView, onDelete, onUpdate, onEdit }) => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/aviators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, limit }),
      });

      const data = await response.json();
      setFetchedUsers(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSort = (key: keyof User) => {
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

  const sortedUsers = [...users];
  if (sortConfig.key) {
    sortedUsers.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.backendId));
    }
  };

  const handleSelectUser = (backendId: number) => {
    if (selectedUsers.includes(backendId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== backendId));
    } else {
      setSelectedUsers([...selectedUsers, backendId]);
    }
  };

  const renderArrow = (key: keyof User) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  if (users.length === 0) return <p>No users found</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b bg-eisha cursor-pointer">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length}
                onChange={handleSelectAll}
              />
            </th>
            {['ID', 'Image', 'Name', 'Email', 'Username', 'Type', 'Status', 'Actions'].map((header, index) => (
              <th
                key={header}
                className="py-2 px-4 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof User)}
              >
                {header} {index !== 1 && renderArrow(header.toLowerCase() as keyof User)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.backendId}>
              <td className="py-2 px-4 border-b border-gray-200 font-small font-thin">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.backendId)}
                  onChange={() => handleSelectUser(user.backendId)}
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <Image
                  src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
                  alt={user.name}
                  width={33}
                  height={33}
                  className="rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.type}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <span className={`px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {user.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
               <button
                  onClick={() => onView(user)}
                  className="text-blue-500 hover:underline mr-2 mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href={`/viewuser/${user.backendId}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
               
                <button
                  onClick={() => onDelete(user.backendId)}
                  className="text-red-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
