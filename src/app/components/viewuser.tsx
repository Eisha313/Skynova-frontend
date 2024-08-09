
// 'use client'
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Pagination from './Pagination';
// import Sort from './Sort';
// import Search from './Search';
// import Filter from './Filter';
// import DownloadPDF from './DownloadPDF';
// import UserTable from './viewusertable';
// import Modal from './Modal';
// import themeColors from './global/color'; // Import theme colors

// interface User {
//   id: number; 
//   backendId: number;
//   name: string;
//   email: string;
//   username: string;
//   type: string;
//   status: string;
// }

// const ManageUsers: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sortField, setSortField] = useState<keyof User | ''>('');
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://192.168.18.54:3000/aviators/viewAviators?page=${currentPage}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
        
//         const mappedUsers: User[] = data.map((user: any, index: number) => ({
//           id: index + 1, 
//           backendId: user._id, 
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//           username: `${user.firstName} ${user.lastName}`,
//           type: user.role,
//           status: 'Active'
//         }));
    
//         setUsers([...mappedUsers]);
//         setFilteredUsers([...mappedUsers]);
//         setTotalPages(data.totalPages);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
    
//     fetchUsers();
//   }, [currentPage]);

//   const handleSortChange = (sortField: keyof User) => {
//     setSortField(sortField);
//     const sortedUsers = [...users].sort((a, b) => {
//       if (a[sortField] < b[sortField]) return -1;
//       if (a[sortField] > b[sortField]) return 1;
//       return 0;
//     });
//     setFilteredUsers(sortedUsers);
//   };

//   const handleSearchChange = (searchTerm: string) => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const filtered = users.filter(user =>
//       user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
//       user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
//       user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
//       user.type.toLowerCase().includes(lowerCaseSearchTerm) ||
//       user.status.toLowerCase().includes(lowerCaseSearchTerm)
//     );
//     setFilteredUsers(filtered);
//   };

//   const handleFilterChange = (filter: string) => {
//     if (filter === '') {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter(user => user.status.toLowerCase() === filter.toLowerCase());
//       setFilteredUsers(filtered);
//     }
//   };

//   const handleDelete = async (userId: number) => {
//     try {
//       const response = await fetch(`http://192.168.18.54:3000/aviators/deleteAviator/${userId}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         const newUsers = users.filter(user => user.backendId !== userId);
//         setUsers(newUsers);
//         setFilteredUsers(newUsers);
//       } else {
//         console.error('Failed to delete user:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleUpdate = async (userId: number, updatedData: Partial<User>) => {
//     try {
//       const response = await fetch(`http://192.168.18.54:3000/aviators/updateAviator/${userId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedData)
//       });

//       if (response.ok) {
//         const updatedUsers = users.map(user => 
//           user.backendId === userId ? { ...user, ...updatedData } : user
//         );
//         setUsers(updatedUsers);
//         setFilteredUsers(updatedUsers);
//       } else {
//         console.error('Failed to update user:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleView = (user: User) => {
//     setSelectedUser(user);
//     setModalOpen(true);
//   };

//   const handleEdit = (user: User) => {
//     setSelectedUser(user);
//     setEditModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedUser(null);
//     setModalOpen(false);
//     setEditModalOpen(false);
//   };

//   return (
//     <div className="manage-users p-4 bg-gray-100">
//       <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
//         <h2 className="text-xl font-semibold">All Users</h2>
//         <div className="flex flex-1 justify-end space-x-2">
//           <Search onSearchChange={handleSearchChange} />
//           <Filter onFilterChange={handleFilterChange} />
//           <DownloadPDF users={filteredUsers} borderColor="primary" />
//           <Link href="/addaviator" className="bg-blue-500 text-white px-4 py-2 rounded-md text-center">+</Link>
//         </div>
//       </div>
//       <UserTable
//         users={filteredUsers}
//         onView={handleView}
//         onDelete={handleDelete}
//         onUpdate={handleUpdate}
//         onEdit={handleEdit}
//       />
//       {modalOpen && selectedUser && (
//         <Modal
//           user={selectedUser}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from './Pagination';
import Sort from './Sort';
import Search from './Search';
import Filter from './Filter';
import DownloadPDF from './DownloadPDF';
import UserTable from './viewusertable';
import Modal from './Modal';
import { themeColors } from './global/color'; // Correct import

interface User {
  id: number; 
  backendId: number;
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<keyof User | ''>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviators?page=${currentPage}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        const mappedUsers: User[] = data.map((user: any, index: number) => ({
          id: index + 1, 
          backendId: user._id, 
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          username: `${user.firstName} ${user.lastName}`,
          type: user.role,
          status: 'Active'
        }));
    
        setUsers([...mappedUsers]);
        setFilteredUsers([...mappedUsers]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, [currentPage]);

  const handleSortChange = (sortField: keyof User) => {
    setSortField(sortField);
    const sortedUsers = [...users].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filter: string) => {
    if (filter === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.status.toLowerCase() === filter.toLowerCase());
      setFilteredUsers(filtered);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/aviators/deleteAviator/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const newUsers = users.filter(user => user.backendId !== userId);
        setUsers(newUsers);
        setFilteredUsers(newUsers);
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async (userId: number, updatedData: Partial<User>) => {
    try {
      const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const updatedUsers = users.map(user => 
          user.backendId === userId ? { ...user, ...updatedData } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
    setEditModalOpen(false);
  };

  return (
    <div className="manage-users p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Users</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} />
          <Filter onFilterChange={handleFilterChange} />
          <DownloadPDF users={filteredUsers}  />
          <Link 
            href="/addaviator" 
            className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center"
          
          >
            Add User
          </Link>
        </div>
      </div>
      <UserTable
        users={filteredUsers}
        onView={handleView}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onEdit={handleEdit}
      />
      {modalOpen && selectedUser && (
        <Modal
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ManageUsers;
