// components/ComplaintDetail.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Complaint {
  _id: string;
  title: string;
  description: string;
}

const ComplaintDetail: React.FC<{ id: string }> = ({ id }) => {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/viewComplaint/${id}`);
        setComplaint(response.data[0]);
      } catch (error) {
        console.error('Error fetching complaint:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  if (!complaint) {
    return <div className="container mx-auto p-6 text-center">Complaint not found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{complaint.title}</h1>
      <p className="text-gray-700 mb-4">{complaint.description}</p>
      <div className="flex justify-end">
        <Link href="/complaints/viewcomplaints">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Back to Complaints
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComplaintDetail;
