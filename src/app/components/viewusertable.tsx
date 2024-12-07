
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";

export interface User {
  id: number;
  backendId: number;
  username: string;
  email: string;
  type: string;
  status: string;
  profileImage?: string; 
}

interface UserTableProps {
  users: User[];
  onView: (user: User) => Promise<void>;
  onDelete: (userId: number) => Promise<void>;
  onUpdate: (userId: number, updatedData: Partial<User>) => Promise<void>;
  // onUpdate: (user: User) => Promise<void>;
  onEdit: (user: User) => Promise<void>;
  searchTerm: string; // Add this line
  onSearchChange: (term: string) => void; // Add this line if needed
 
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onView,
  onDelete,
  onUpdate,
  onEdit,
  searchTerm,
  onSearchChange,
}) => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

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

  const sortedUsers = [...fetchedUsers];
  if (sortConfig.key && sortConfig.key !== "id") {
    sortedUsers.sort((a, b) =>
      compareValues(
        a[sortConfig.key!],
        b[sortConfig.key!],
        sortConfig.direction
      )
    );
  }
  

  const handleSelectAll = () => {
    if (selectedUsers.length === fetchedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(fetchedUsers.map((user) => user.backendId));
    }
  };

  const handleSelectUser = (backendId: number) => {
    if (selectedUsers.includes(backendId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== backendId));
    } else {
      setSelectedUsers([...selectedUsers, backendId]);
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all selected users?")) {
      for (const userId of selectedUsers) {
        await onDelete(userId);
      }
      setSelectedUsers([]);
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
      ); 
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (fetchedUsers.length === 0) return <p>No users found</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b">
              <input
                type="checkbox"
                checked={selectedUsers.length === fetchedUsers.length}
                onChange={handleSelectAll}
              />
            </th>
            {["ID", "Image", "Name", "Email", "Type", "Status", "Actions"].map(
              (header, index) => (
                <th
                  key={header}
                  className="py-2 px-4 border-b cursor-pointer text-left"
                  onClick={() => handleSort(header.toLowerCase() as keyof User)}
                >
                  <div className="flex items-center">
                    {header}{" "}
                    {index !== 1 &&
                      renderArrow(header.toLowerCase() as keyof User)}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
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
                    user.profileImage ||
                    `https://via.placeholder.com/150`
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
                  style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <FaEye className="text-gray-700" />
                </button>
                <Link href={`/viewuser/${user.backendId}/edit`} passHref>
                  <button
                    className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                
                  onClick={() => onDelete(user.backendId)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
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
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
  
      {selectedUsers.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
}  

export default UserTable;

