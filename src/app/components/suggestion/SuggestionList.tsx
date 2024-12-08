"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

interface Suggestion {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message?: string;
}

const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Suggestion | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion?page=${page}&limit=${limit}');
        const response = await axios.get("https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion", {
          withCredentials: true,
        });
        setSuggestions(response.data);
        // setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [page, limit]);

  const handleSort = (key: keyof Suggestion) => {
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
    if (typeof a === "string" && typeof b === "string") {
      return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    }
    return direction === "asc" ? (a < b ? -1 : 1) : a > b ? -1 : 1;
  };

  const sortedSuggestions: Suggestion[] = [...(suggestions || [])];

  if (sortConfig.key) {
    sortedSuggestions.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (suggestions?.length > 0 && selectedSuggestions.length === suggestions.length) {
      setSelectedSuggestions([]);
    } else {
      setSelectedSuggestions(suggestions?.map((suggestion) => suggestion._id) || []);
    }
  };

  const handleSelectSuggestion = (id: string) => {
    if (selectedSuggestions.includes(id)) {
      setSelectedSuggestions(selectedSuggestions.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedSuggestions([...selectedSuggestions, id]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/deleteSuggestion/${id}`, {
        withCredentials: true,
      });
      setSuggestions(suggestions.filter((suggestion) => suggestion._id !== id));
    } catch (error) {
      console.error("Error deleting suggestion:", error);
    }
  };

  const renderArrow = (key: keyof Suggestion) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const onView = (suggestion: Suggestion) => {
    console.log("View Modal is being opened");
    setIsModalOpen(true);
    setSelectedSuggestion(suggestion);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuggestion(null);
  };

  return (
    <div className="overflow-x-auto p-4 w-full bg-hassan">
      <div className="flex justify-between mb-4">
        {/* <Link href="/suggestion/addsuggestion">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add Suggestion
          </button>
        </Link> */}
        {/* <div className="flex items-center">
          <button onClick={() => handleSelectAll()} className="px-4 py-2 bg-gray-200 rounded">
            {selectedSuggestions.length === (suggestions?.length || 0) ? "Deselect All" : "Select All"}
          </button>
        </div> */}
      </div>
      {/* <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
            <tr>
                <th className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedSuggestions.length === (suggestions?.length || 0)}
                        onChange={handleSelectAll}
                    />
                </th>
                <th onClick={() => handleSort('title')} className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    Title {renderArrow('title')}
                </th>
                <th onClick={() => handleSort('description')} className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    Description {renderArrow('description')}
                </th>
                <th className="py-2 px-4 border-b bg-gray-700">Actions</th>
            </tr>
        </thead>
        <tbody>
            {sortedSuggestions.map(suggestion => (
                <tr key={suggestion._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                        <input
                            type="checkbox"
                            checked={selectedSuggestions.includes(suggestion._id)}
                            onChange={() => handleSelectSuggestion(suggestion._id)}
                        />
                    </td>
                    <td className="py-2 px-4 border-b">{suggestion.title}</td>
                    <td className="py-2 px-4 border-b">{suggestion.description}</td>
                    <td className="py-2 px-4 border-b flex items-center space-x-2">
                        <Link href={`/suggestion/editsuggestion/${suggestion._id}`}>
                            <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                        </Link>
                        <FaEye
                            onClick={() => router.push(`/suggestion/viewsuggestion/${suggestion._id}`)}
                            className="text-green-500 cursor-pointer hover:text-green-700"
                        />
                        <FaTrash
                            onClick={() => handleDelete(suggestion._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </table> */}

      <table className="min-w-full border-collapse">
        <thead className="bg-eisha text-white">
          <tr>
            {["Id", "User Name", "Email", "Subject", "Message", "Actions"].map((header) => (
              <th key={header} className="py-2 px-4 border-b text-center cursor-pointer" onClick={() => {}}>
                <div className="flex items-center justify-center">
                  {header}
                  {(header === "Username" || header === "Email" || header === "Role") &&
                    renderArrow(header.toLowerCase() as keyof Suggestion)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#212C44] text-white items-center justify-center">
          {suggestions.map((suggestion, index) => (
            <tr key={suggestion._id}>
              <td className="py-2 px-4 border-b text-center">{(page - 1) * limit + index + 1}</td>

              <td className="py-2 px-4 border-b text-center">{suggestion.name}</td>
              <td className="py-2 px-4 border-b text-center">{suggestion.email}</td>
              <td className="py-2 px-4 border-b text-center">{suggestion.subject}</td>
              <td className="py-2 px-4 border-b text-center">{suggestion.message}</td>

              <td className="py-2 px-4 border-b  min-h-full ">
                <div className="flex space-x-2 items-center flex justify-center">
                  <button
                    onClick={() => {
                      console.log("Im being clicked");
                      onView(suggestion);
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
                  <button
                    onClick={() => {
                      handleDelete(suggestion._id);
                    }}
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

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Next
        </button>
      </div>

      {isModalOpen && <SuggestionModal suggestion={selectedSuggestion} onClose={closeModal} />}
    </div>
  );
};

const SuggestionModal = ({ suggestion, onClose }: { suggestion: Suggestion | null; onClose: () => void }) => {
  if (!suggestion) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-custom-image text-white p-8 rounded-lg w-1/3 max-w-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Suggestion Details</h2>

        <div className="text-lg space-y-5">
          <p>
            <strong className="font-bold">User Name:</strong> {suggestion.name}
          </p>
          <p>
            <strong className="font-bold">Email:</strong> {suggestion.email}
          </p>
          <p>
            <strong className="font-bold">Subject:</strong> {suggestion.subject}
          </p>
          <p>
            <strong className="font-bold">Message:</strong> {suggestion.message || "N/A"}
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

export default SuggestionsList;
