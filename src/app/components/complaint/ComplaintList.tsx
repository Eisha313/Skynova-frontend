// components/ComplaintList.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Complaint {
  _id: string;
  title: string;
  description: string;
}

const ComplaintList: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://sky-nova-8ccaddc754ce.herokuapp.com/complaints/viewComplaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://sky-nova-8ccaddc754ce.herokuapp.com/complaints/deleteComplaint/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Complaints List</h1>
        <Link href="/complaints/addComplaints">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create New Complaint
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{complaint.title}</h2>
              <p className="text-gray-700">{complaint.description}</p>
            </div>
            <div className="flex space-x-3">
              <Link href={`/complaints/viewComplaints/${complaint._id}`} className="text-blue-600 hover:text-blue-700">
                <FaEye size={20} />
              </Link>
              <Link href={`/complaints/viewComplaints/${complaint._id}/editComplaint`} className="text-green-600 hover:text-green-700">
               <FaEdit size={20} />
              </Link>
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDelete(complaint._id)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintList;
