"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdDownload } from "react-icons/md";
import Select, { StylesConfig, OptionProps } from "react-select";
import DeleteConfirmationModal from "./confirmationModal";

export interface User {
  id: number;
  backendId: number;
  username: string;
  email: string;
  type: string;
  blocked: boolean;
  profileImage?: string;
}

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
  const [isModalOpenn, setIsModalOpenn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviators?page=${page}&limit=${limit}`
        );
        const jsonResponse = await response.json();

        const users = jsonResponse;
        if (Array.isArray(users)) {
          const mappedUsers = users.map((user) => ({
            id: user._id,
            backendId: user._id,
            username: `${user.firstName} ${user.lastName}`,
            email: user.email,
            type: user.role,
            status: "Active",
            profileImage: user.profileImage || `https://via.placeholder.com/150`,
            blocked: user.blocked || false,
          }));

          console.log("Mapped Users:", mappedUsers);
          setFetchedUsers(mappedUsers);
          setFilteredUsers(mappedUsers);
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

  const handleFilterChange = (newValue: { value: string; label: string } | null) => {
    // Check if newValue is not null (when user clears selection, it might be null)
    if (newValue) {
      const status = newValue.value;
      setFilterStatus(status);
      filterAndSearchUsers(searchTerm, status);
    } else {
      setFilterStatus("All");
      filterAndSearchUsers(searchTerm, "All");
    }
  };

  const filterAndSearchUsers = (searchTerm: string, status: string) => {
    let updatedUsers = [...fetchedUsers];

    // if (status !== "All") {
    //   updatedUsers = updatedUsers.filter((user) => user.
    // }
    if (status !== "All") {
      if (status === "Active") {
        updatedUsers = updatedUsers.filter((user) => !user.blocked);
      } else {
        updatedUsers = updatedUsers.filter((user) => user.blocked);
      }
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
    setPage(1);
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
    sortedUsers.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }
  const onView = (user: User) => {
    console.log("View Modal is being opened");
    setIsModalOpen(true);
    setSelectedUser(user);
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

  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpenn(true);
  };

  const onConfirmDelete = () => {
    if (selectedUserId === null) return;

    fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/deleteAviator/${selectedUserId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("User deleted successfully.");
          setFetchedUsers((prevUsers) => prevUsers.filter((user) => user.backendId !== selectedUserId));
          setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.backendId !== selectedUserId));
        } else {
          alert("Failed to delete user. Please try again.");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        setIsModalOpenn(false);
        setSelectedUserId(null);
      });
  };

  const onCancelDelete = () => {
    setIsModalOpenn(false);
    setSelectedUserId(null);
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

  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: "#ffffff4d",
      padding: "8px 12px",
      borderRadius: "1rem",
      color: "blue",
      ":hover": {
        borderColor: "#ffffff",
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#fffff",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#5AA0BC" : "transparent",
      color: isSelected ? "#ffffff" : "#ffffffb3",
      padding: "10px 20px",
      borderRadius: "0.5rem",
      ":active": {
        backgroundColor: "#5AA0BC",
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderRadius: "1rem",
      padding: "4px 0",
    }),
  };

  interface DropdownProps {
    filterStatus: string;
    handleFilterChange: (selectedOption: { value: string; label: string }) => void;
  }

  const toggleStatus = async (user: User) => {
    const newStatus = user.blocked ? "Active" : "Inactive";
    const confirmMessage = user.blocked
      ? "Are you sure you want to activate this user?"
      : "Are you sure you want to deactivate this user?";
    if (!window.confirm(confirmMessage)) return;

    try {
      let URL = `https://sky-nova-8ccaddc754ce.herokuapp.com/users/block/${user.backendId}`;

      if (newStatus === "Active") {
        URL = URL.replace("block", "unblock");
      }

      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setFetchedUsers((prev) =>
        prev.map((u) => (u.backendId === user.backendId ? { ...u, blocked: user.blocked ? false : true } : u))
      );
      setFilteredUsers((prev) =>
        prev.map((u) => (u.backendId === user.backendId ? { ...u, blocked: user.blocked ? false : true } : u))
      );
      alert(`User status updated to ${newStatus}.`);
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("An error occurred while updating the user status. Please try again.");
    }
  };

  const indexOfLastUser = page * limit;
  const indexOfFirstUser = indexOfLastUser - limit;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalFilteredPages = Math.ceil(sortedUsers.length / limit);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 16);
    const tableColumn = ["ID", "Name", "Email", "Type", "Status"];
    const tableRows: any[] = [];

    sortedUsers.forEach((user, index) => {
      const userData = [index + 1, user.username, user.email, user.type, user.blocked ? "Inactive" : "Active"];
      tableRows.push(userData);
    });

    // @ts-ignore
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("user_list.pdf");
  };

  const UserModal = ({ user, onClose }: { user: User | null; onClose: () => void }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-custom-image text-white p-8 rounded-lg w-1/3 max-w-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">User Details</h2>
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex justify-center">
              <Image
                src={user.profileImage!}
                alt={user.username}
                width={250}
                height={250}
                className="rounded-full   object-cover w-[250px] h-[250px]"
              />
            </div>
          </div>

          <div className="text-lg space-y-5">
            <p>
              <strong className="font-bold">User:</strong> {user.username}
            </p>
            <p>
              <strong className="font-bold">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="font-bold">Role:</strong> {user.type}
            </p>
            <p>
              <strong className="font-bold">Status:</strong> {user.blocked ? "Inactive" : "Active"}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
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
    <div className=" p-4 w-full bg-hassan">
      <h2 className="text-2xl font-semibold text-white">All Users</h2>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0 w-full">
        <div className="overflow-x-auto w-full">
          <div className="flex flex-col md:flex-row md:justify-between items-right mb-4 space-y-4 md:space-y-0">
            <div className="flex space-x-2 flex-1 justify-end ">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              />

              <Select
                value={{ label: filterStatus, value: filterStatus }}
                onChange={(value) => {
                  handleFilterChange(value as { label: string; value: string });
                }}
                options={[
                  { label: "All Statuses", value: "All" },
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ]}
                styles={customStyles}
              />

              <button
                onClick={downloadPDF}
                className="text-white px-4 py-2 rounded-md flex items-center justify-center  border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              >
                <MdDownload />
              </button>
              <Link href="/addaviator" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center">
                Add User
              </Link>
            </div>
          </div>

          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-eisha text-white">
              <tr>
                {["Id", "Profile", "Username", "Email", "Role", "Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="py-2 px-4 border-b text-center cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase() as keyof User)}
                  >
                    <div className="flex items-center justify-center">
                      {header}
                      {(header === "Username" || header === "Email" || header === "Role") &&
                        renderArrow(header.toLowerCase() as keyof User)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-[#212C44] text-white items-center justify-center">
              {currentUsers.map((user, index) => (
                <tr key={user.backendId}>
                  <td className="py-2 px-4 border-b text-center">{(page - 1) * limit + index + 1}</td>
                  <td className="py-2 px-4 border-b ">
                    <div className="flex justify-center align-center">
                      <div className="w-[50px] h-[50px] align-center rounded-full overflow-hidden bg-gray-300">
                        {user.profileImage ? (
                          <Image
                            src={user.profileImage!}
                            alt={user.username}
                            width={50}
                            height={50}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-sm text-gray-600">`https://via.placeholder.com/150`</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center">{user.username}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">{user.type}</td>

                  <td className="py-2 px-4 border-b ">
                    <div className="flex items-center space-x-2 flex justify-center">
                      <span
                        className={`px-2 py-1 rounded ${
                          !user.blocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {user.blocked ? "Inactive" : "Active"}
                      </span>

                      <button
                        onClick={() => toggleStatus(user)}
                        disabled={loadingUserId === user.backendId}
                        className={`text-white p-2 rounded hover:bg-[#5AA0BC] border border-gray-400 ${
                          !user.blocked ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{
                          height: "33px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {!user.blocked ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>

                  <td className="py-2 px-4 border-b  min-h-full ">
                    <div className="flex space-x-2 items-center flex justify-center">
                      <button
                        onClick={() => {
                          console.log("Im being clicked");
                          onView(user);
                        }}
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
                        onClick={() => handleDeleteClick(user.backendId)}
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
                    </div>
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
              onClick={() => setPage((prev) => (prev < totalFilteredPages ? prev + 1 : prev))}
              disabled={page === totalFilteredPages}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}

      {isModalOpenn && <DeleteConfirmationModal onConfirm={onConfirmDelete} onCancel={onCancelDelete} />}
    </div>
  );
};

export default ManageUsers;
