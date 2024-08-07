
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Resource {
  _id: string;
  title: string;
  type: string;
  description: string;
  // Add other fields based on your resource model
}

interface ResourceDetailsProps {
  id: string;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ id }) => {
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`http://192.168.18.54:3000/resources/viewResource/${id}`);
        console.log(response.data); // Debugging
        const resourceData = response.data.length > 0 ? response.data[0] : null;
        setResource(resourceData);
      } catch (err) {
        console.error(err); // Debugging
        setError('Failed to fetch resource');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 border rounded-md bg-gray-50 shadow-lg max-w-3xl mx-auto">
      {resource ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">{resource.title}</h1>
          <p className="mb-4"><strong>Type:</strong> {resource.type}</p>
          <p className="mb-4"><strong>Description:</strong> {resource.description}</p>
          {/* Render other fields here */}
          <Link href="/view-resource">
            <div className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
              Back to Resources
            </div>
          </Link>
        </div>
      ) : (
        <p>No resource found</p>
      )}
    </div>
  );
};

export default ResourceDetails;