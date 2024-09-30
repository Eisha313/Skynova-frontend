


"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdDownload } from 'react-icons/md';

export interface User {
  id: number;
  backendId: number;
  username: string;
  email: string;
  type: string;
  status: string;
  profileImage?: string;
}

// interface UserTableProps {
  // users: User[];
  // onView: (user: User) => Promise<void>;
  // onDelete: (userId: number) => Promise<void>;
  // onUpdate: (userId: number, updatedData: Partial<User>) => Promise<void>;
  // onEdit: (user: User) => Promise<void>;
// }

const ManageUsers: React.FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New states for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviators?page=${page}&limit=${limit}`
        );
        const jsonResponse = await response.json();

        const users = jsonResponse.data;
        console.log("Fetched Data:", users);
        if (Array.isArray(users)) {
          const mappedUsers = users.map((user) => ({
            id: user._id,
            backendId: user._id,
            username: `${user.firstName} ${user.lastName}`,
            email: user.email,
            type: user.role,
            status: "Active",
            profileImage:
              user.profileImage ||
              `https://randomuser.me/api/portraits/men/${user._id}.jpg`,
          }));

          console.log("Mapped Users:", mappedUsers);
          setFetchedUsers(mappedUsers);
          setFilteredUsers(mappedUsers); // Initialize filteredUsers
          setTotalPages(jsonResponse.totalPages || 1);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, limit]);
  
  const onUpdate = async (backendId: number, updateData: Partial<User>) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${backendId}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update user with id ${backendId}`);
      }
  
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error; 
    }
  };
  

 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterAndSearchUsers(term, filterStatus);
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setFilterStatus(status);
    filterAndSearchUsers(searchTerm, status);
  };

  // Function to filter and search users
  const filterAndSearchUsers = (searchTerm: string, status: string) => {
    let updatedUsers = [...fetchedUsers];

    if (status !== "All") {
      updatedUsers = updatedUsers.filter((user) => user.status === status);
    }

    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseTerm) ||
          user.email.toLowerCase().includes(lowerCaseTerm) ||
          user.type.toLowerCase().includes(lowerCaseTerm)
      );
    }

    setFilteredUsers(updatedUsers);
    setPage(1); // Reset to first page
  };

  const handleSort = (key: keyof User) => {
    if (key === "id") return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const compareValues = (a: any, b: any, direction: "asc" | "desc") => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (typeof a === "number" && typeof b === "number") {
      return direction === "asc" ? a - b : b - a;
    }

    if (typeof a === "string" && typeof b === "string") {
      return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    }

    return direction === "asc" ? (a < b ? -1 : 1) : a > b ? -1 : 1;
  };

  const sortedUsers = [...filteredUsers];
  if (sortConfig.key && sortConfig.key !== "id") {
    sortedUsers.sort((a, b) =>
      compareValues(
        a[sortConfig.key!],
        b[sortConfig.key!],
        sortConfig.direction
      )
    );
  }
  const onView = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.backendId));
    }
  };

  const handleSelectUser = (backendId: number) => {
    if (selectedUsers.includes(backendId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== backendId));
    } else {
      setSelectedUsers([...selectedUsers, backendId]);
    }
  };
  const onDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/deleteAviator/${userId}`, {
        method: "DELETE",
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            alert("User deleted successfully.");
            // Update the users state to remove the deleted user
            setFetchedUsers((prevUsers) => prevUsers.filter((user) => user.backendId !== userId));
            setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.backendId !== userId));
          } else {
            alert("Failed to delete user. Please try again.");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again.");
          console.error("Error deleting user:", error);
        });
    }
  };
  
  
  

  const renderArrow = (key: keyof User) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

 
  const toggleStatus = async (user: User) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
  
    try {
      await onUpdate(user.backendId, { status: newStatus });
      
      setFetchedUsers((prev) =>
        prev.map((u) =>
          u.backendId === user.backendId ? { ...u, status: newStatus } : u
        )
      ); // Optimistically update the status in the UI
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  

  // Pagination logic
  const indexOfLastUser = page * limit;
  const indexOfFirstUser = indexOfLastUser - limit;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalFilteredPages = Math.ceil(sortedUsers.length / limit);

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 16);
    const tableColumn = ["ID", "Name", "Email", "Type", "Status"];
    const tableRows: any[] = [];

    sortedUsers.forEach((user, index) => {
      const userData = [
        index + 1,
        user.username,
        user.email,
        user.type,
        user.status,
      ];
      tableRows.push(userData);
    });

    // @ts-ignore
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("user_list.pdf");
  };
  const UserModal = ({ user, onClose }: { user: User | null; onClose: () => void }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={user.profileImage!}
              alt={user.username}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <p><strong>Role:</strong> {user.type}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  if (fetchedUsers.length === 0) return <p>No users found</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
       <h2 className="text-2xl font-semibold">All Users</h2>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
     
    <div className="overflow-x-auto">
      
      <div className="flex flex-col md:flex-row md:justify-between items-right mb-4 space-y-4 md:space-y-0">
        <div className="flex space-x-2 flex flex-1 justify-end">
          {/* Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md"
          />
          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          
          <button onClick={downloadPDF} className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300">
          <MdDownload  />
          </button>
          <Link
            href="/addaviator"
            className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center"
          >
            Add User
          </Link> 
        </div>
      
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b">
              <input
                type="checkbox"
                checked={
                  selectedUsers.length === currentUsers.length &&
                  selectedUsers.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            
             {['Id', 'Profile', 'Username', 'Email','Role','Status','Actions'].map(header => (
              <th
                key={header}
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof User)}
              >
                <div className="flex items-center justify-center">
                  {header}
                  {(header === 'Username' || header === 'Email' || header === 'Role') && renderArrow(header.toLowerCase() as keyof User)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.backendId}>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.backendId)}
                  onChange={() => handleSelectUser(user.backendId)}
                />
              </td>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                <Image
                  src={
                    user.profileImage || `https://via.placeholder.com/150`
                  }
                  alt={user.username}
                  width={33}
                  height={33}
                  className="rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.type}</td>
              <td className="py-2 px-4 border-b">
               
<div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {user.status}
                  </span>
                  <button
                    onClick={() => toggleStatus(user)}
                    className={`text-white p-2 rounded hover:bg-gray-300 border border-gray-400 ${
                      user.status === "Active" ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </td>
              <td className="py-2 px-4 border-b flex space-x-2 items-center">
                <button
                  onClick={() => onView(user)}
                  className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href={`/viewuser/${user.backendId}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    style={{
                      height: "33px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(user.backendId)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
          Page {page} of {totalFilteredPages}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < totalFilteredPages ? prev + 1 : prev
            )
          }
          disabled={page === totalFilteredPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* {selectedUsers.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )} */}
    </div>
    </div>
    {isModalOpen && (
        <UserModal user={selectedUser} onClose={closeModal} />
      )}
    </div>

  );
};

export default ManageUsers;



















