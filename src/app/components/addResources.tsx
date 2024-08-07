
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Resource = {
  _id?: string;
  title: string;
  type: string;
  resourceURL?: string;
  description?: string;
};

type ResourceFormProps = {
  id?: string;
};

const ResourceForm: React.FC<ResourceFormProps> = ({ id }) => {
  const [resource, setResource] = useState<Resource>({ title: '', type: '', description: '' });
  const [showResource, setShowResource] = useState(false);
  const [generatedResource, setGeneratedResource] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.18.54:3000/resources/viewResource/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setResource(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching resource:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('title', resource.title);
    formData.append('type', resource.type);
    if (resource.description) formData.append('description', resource.description);

    // Log form data for debugging
    console.log('Form Data:', Array.from(formData.entries()));

    try {
      // Determine request method and URL
      const method = id ? 'PATCH' : 'POST';
      const url = id 
        ? `http://192.168.18.54:3000/resources/updateResource/${id}` 
        : 'http://192.168.18.54:3000/resources/createResource';
      
      // Make API request
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle successful response
      setGeneratedResource(response.data);
      setShowResource(true);
      router.push('/view-resource');
    } catch (error) {
      // Enhanced error handling
      console.error('Error saving resource:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          // Request was made but no response received
          setError('No response received from server.');
        } else {
          // Error setting up the request
          setError('Error in request setup.');
        }
      } else {
        // Non-Axios error
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:max-w-lg">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{id ? 'Edit Resource' : 'Create Resource'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={resource.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700 text-sm font-medium">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={resource.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={resource.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            {id ? 'Update Resource' : 'Create Resource'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        {showResource && generatedResource && (
          <div className="mt-8 bg-white border border-gray-300 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{generatedResource.title}</h3>
            <p className="text-gray-600">Type: {generatedResource.type}</p>
            <p className="text-gray-600">Description: {generatedResource.description}</p>
            {generatedResource.resourceURL && (
              <a href={generatedResource.resourceURL} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Resource</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceForm;
