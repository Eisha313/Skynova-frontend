'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Resource {
    _id: string;
    title: string;
    type: string;
    description: string;
}

const ResourceList: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://192.168.18.54:3000/resources/viewResources');
                setResources(response.data);
            } catch (error) {
                setError('Failed to fetch resources.');
            }
        };

        fetchResources();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://192.168.18.54:3000/resources/deleteResource/${id}`);
            setResources(resources.filter(resource => resource._id !== id));
        } catch (error) {
            setError('Failed to delete resource.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="text-2xl font-bold mb-4">Resource List</h1>
            <div className="overflow-x-auto">
                <div className="mb-4">
                    <Link href="/addResource" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
                        Add Resource
                    </Link>
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left">Title</th>
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map(resource => (
                            <tr key={resource._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{resource.title}</td>
                                <td className="py-2 px-4">{resource.type}</td>
                                <td className="py-2 px-4">{resource.description}</td>
                                <td className="py-2 px-4 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <Link href={`/view-resource/${resource._id}/resourceDetails`}>
                                            <FaEye className="text-blue-500 cursor-pointer" />
                                        </Link>
                                        <Link href={`/view-resource/${resource._id}/editResource`}>
                                            <FaEdit className="text-yellow-500 cursor-pointer" />
                                        </Link>
                                        <FaTrash
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(resource._id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResourceList;
