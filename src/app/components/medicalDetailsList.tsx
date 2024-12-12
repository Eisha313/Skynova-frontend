"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Search from "./Search";
import { ArrowUpDown } from "lucide-react";
import { MdDownload } from "react-icons/md";
import DeleteConfirmationModal from "./confirmationModal";

interface medicalDetails {
  _id: string;
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  eyesight: string;
  medicalReport?: string;
  userId?: {
    firstName: string;
    lastName: string;
  };
}

const MedicalList: React.FC = () => {
  const [medicalDetails, setMedicalDetails] = useState<medicalDetails[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof medicalDetails | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenn, setIsModalOpenn] = useState(false);

  const [selectedDetails, setSelectedDetails] = useState<medicalDetails | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(
        "https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails",
        { withCredentials: true }
      );
      setMedicalDetails(response.data);
      console.log("resources are", response);
      //   console.log(medicalDetails.userId.firstName)
    } catch (error) {
      setError("Failed to fetch resources.");
    }
  };

  const handleSort = (key: keyof medicalDetails) => {
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
    return direction === "asc" ? (a < b ? -1 : 1) : a > b ? -1 : 1;
  };

  const sortedResources = [...medicalDetails].sort((a, b) => {
    if (sortConfig.key) {
      return compareValues(a[sortConfig.key], b[sortConfig.key], sortConfig.direction);
    }
    return 0;
  });

  const handleDelete = async () => {
    if (!selectedDetails) return;
    try {
      await axios.delete(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/deleteMedicalDetails/${selectedDetails._id}`,
        {
          withCredentials: true,
        }
      );
      setMedicalDetails(medicalDetails.filter((medicalDetails) => medicalDetails._id !== selectedDetails._id));
      setIsModalOpenn(false);
    } catch (error) {
      setError("Failed to delete resource.");
    }
  };

  const confirmDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedResources.map((id) =>
          axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/deleteResource/${id}`, {
            withCredentials: true,
          })
        )
      );
      setMedicalDetails(medicalDetails.filter((resource) => !selectedResources.includes(resource._id)));
      setSelectedResources([]);
    } catch (error) {
      setError("Failed to delete selected resources.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredResources = sortedResources.filter(
    (resource) =>
      resource.userId?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.userId?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.height.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.weight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.eyesight.toLowerCase().includes(searchTerm.toLowerCase())
    // (filterType ? resource.type === filterType : true)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //   const generatePDF = () => {
  //     const doc = new jsPDF();
  //     doc.text('Resource List', 20, 20);
  //     const headers = [['Title', 'Type', 'Description']];
  //     const data = filteredResources.map(resource => [resource.title, resource.type, resource.description]);

  //     autoTable(doc, {
  //       head: headers,
  //       body: data,
  //       startY: 30,
  //     });
  //     doc.save('resources.pdf');
  //   };

  const renderArrow = (key: keyof medicalDetails) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetails(null);
  };

  return (
    <div className=" mx-auto  p-4 bg-hassan">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex mt-24 flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-white text-center ">All MedicalDetails</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} clearSearch={clearSearch} />
          {/* <button onClick={generatePDF}
          className="text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"
          >
          <MdDownload  />
          </button> */}
          {/* <Link href="/addResource" className="px-4 py-2 rounded-md text-center bg-eisha text-white">
            Add Resource
          </Link> */}
          {selectedResources.length > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 rounded-md text-center bg-red-600 text-white"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete the selected resources?</h3>
            <div className="flex justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={confirmDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-6 px-4 border-b">
              <input
                type="checkbox"
                checked={selectedResources.length === medicalDetails.length}
                onChange={() =>
                  setSelectedResources(
                    selectedResources.length === medicalDetails.length
                      ? []
                      : medicalDetails.map((medicalDetail) => medicalDetail._id)
                  )
                }
              />
            </th>
            {["Name", "Height", "Weight", "Eye Sight", "Medical Report", "Actions"].map((header) => (
              <th
                key={header}
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof medicalDetails)}
              >
                <div className="flex items-center justify-center">
                  {header}
                  {(header === "Title" || header === "Type" || header === "Description") &&
                    renderArrow(header.toLowerCase() as keyof medicalDetails)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#212C44] py-4 text-white">
          {currentResources.length > 0 ? (
            currentResources.map((resource) => (
              <tr key={resource._id} className="border-b">
                <td className="py-2 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedResources.includes(resource._id)}
                    onChange={() =>
                      setSelectedResources(
                        selectedResources.includes(resource._id)
                          ? selectedResources.filter((id) => id !== resource._id)
                          : [...selectedResources, resource._id]
                      )
                    }
                  />
                  <td className="py-2 px-4 text-center">
                    {/* {resource.userId ? `${resource.userId.firstName} ${resource.userId.lastName}` : "Not Available"} */}
                  </td>
                </td>
                <td className="py-2 px-4 text-center">
                  {resource.userId != null
                    ? `${resource.userId.firstName} ${resource.userId.lastName}`
                    : "Not Available"}
                </td>
                <td className="py-2 px-4 text-center">
                  {resource.height} {resource.heightUnit || "cm"}
                </td>
                <td className="py-2 px-4 text-center">
                  {resource.weight} {resource.weightUnit || "kg"}
                </td>
                <td className="py-2 px-4 text-center max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                  {resource.eyesight.includes("/") ? resource.eyesight : resource.eyesight + "/20"}
                </td>
                <td className="py-2 px-4 text-center">
                  {resource.medicalReport ? (
                    <a href={resource.medicalReport} target="_blank" rel="noreferrer">
                      Download Report
                    </a>
                  ) : (
                    "Not Uploaded"
                  )}
                </td>

                <div className="flex justify-center">
                  <td className="py-2 px-4   flex space-x-2 ">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedDetails(resource);
                      }}
                      className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <FaEye className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpenn(true);
                        setSelectedDetails(resource);
                      }}
                      className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <FaTrash className="text-gray-700" />
                    </button>
                  </td>
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-center">
                No resources found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredResources.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && <UserModal user={selectedDetails} onClose={closeModal} />}
      {isModalOpenn && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => {
            setIsModalOpenn(false);
            setSelectedDetails(null);
          }}
        />
      )}
    </div>
  );
};

const UserModal = ({ user, onClose }: { user: medicalDetails | null; onClose: () => void }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-custom-image text-white p-8 rounded-lg w-1/3 max-w-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">User Details</h2>
        <div className="flex items-center justify-center space-x-6 mb-6"></div>

        <div className="text-lg space-y-5">
          {/* <p>
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
          </p> */}

          <p>
            <strong className="font-bold">Name:</strong>{" "}
            {user.userId ? `${user.userId.firstName} ${user.userId.lastName}` : "Not Available"}
          </p>

          <p>
            <strong className="font-bold">Height:</strong> {user.height} {user.heightUnit || "cm"}
          </p>
          <p>
            <strong className="font-bold">Weight:</strong> {user.weight} {user.weightUnit || "kg"}
          </p>
          <p>
            <strong className="font-bold">Eye Sight:</strong>{" "}
            {user.eyesight.includes("/") ? user.eyesight : user.eyesight + "/20"}
          </p>
          <p>
            <strong className="font-bold">Medical Report:</strong>{" "}
            {user.medicalReport ? (
              <a href={user.medicalReport} target="_blank" rel="noreferrer">
                Download Report
              </a>
            ) : (
              "Not Uploaded"
            )}
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

export default MedicalList;
