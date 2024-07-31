'use client'
import React, { useContext } from 'react';
import { FaSun, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';

// Example context for user authentication; replace with actual context or method
const UserContext = React.createContext<{ name: string; role: string } | null>(null);

const Header: React.FC = () => {
  const user = useContext(UserContext);
  const userName = user?.name || 'Eisha'; // Replace with dynamic user name if available
  const userRole = user?.role || 'Admin'; // Replace with dynamic user role if available

  return (
    <header className="flex items-center justify-between p-2 bg-white shadow-md">
      {/* Left Side */}
      <div className="flex items-center">
        <div className="flex border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 px-2 text-gray-700 flex-grow border-r text-sm"
          />
          <button
            className="bg-blue-500 text-white p-1 flex items-center justify-center"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-gray-600">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaSun className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 rounded-full hover:bg-blue-100">
          <FaBell className="w-5 h-5 text-blue-500" />
        </button>
        <div className="flex items-center space-x-3">
          <FaUserCircle className="w-7 h-7 text-gray-600" />
          <div className="text-sm">
            <div className="font-semibold">{userName}</div>
            <div className="text-gray-500">{userRole}</div>
          </div>
        </div>
        <button className="bg-gray-200 p-2 rounded-full flex items-center space-x-4">
          <FaCog className="w-5 h-5 text-gray-500" />
          <FaSignOutAlt className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
