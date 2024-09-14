// components/ResultDetails.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Result {
  id: string;
  type: string;
  description: string;
  marks: number;
}

const ResultDetails: React.FC<{ id: string }> = ({ id }) => {
  const [result, setResult] = useState<Result | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResult/${id}`,{withCredentials:true});
        setResult(response.data[0]);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };
    fetchResult();
  }, [id]);

  if (!result) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Result Details</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{result.type}</h2>
        <p className="text-gray-700 mb-2">{result.description}</p>
        <p className="text-gray-500 mb-4">Marks: {result.marks}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={() => router.push('/results/viewresults')}
        >
          Back to Results
        </button>
      </div>
    </div>
  );
};

export default ResultDetails;
