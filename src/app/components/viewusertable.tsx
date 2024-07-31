import React from 'react';
import Link from 'next/link';

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
  onDelete: (userId: number) => void;
  onUpdate: (userId: number, updatedData: Partial<User>) => void;
  onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onView, onDelete, onUpdate, onEdit }) => {
  if (users.length === 0) return <p>No users found</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Image</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Username</th>
            <th className="py-2 px-4 border-b border-gray-200">Type</th>
            <th className="py-2 px-4 border-b border-gray-200">Status</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.backendId}>
              <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <img
                  src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`} // Adjust as necessary
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
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
                  className="text-blue-500 hover:underline mr-2"
                >
                  👁️
                </button>
                <Link href={`/viewuser/${user.backendId}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline mr-2"
                  >
                    ✏️
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(user.backendId)}
                  className="text-red-500 hover:underline"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
