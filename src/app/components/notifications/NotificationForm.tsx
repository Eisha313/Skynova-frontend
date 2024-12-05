
'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface NotificationFormProps {
    id?: string; 
}

const NotificationForm: React.FC<NotificationFormProps> = ({ id }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchNotification = async () => {
                try {
                    const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/viewNotification/${id}`,{credentials:'include',});
                    if (!response.ok) throw new Error('Failed to fetch notification');
                    const data = await response.json();
                    const notification = data[0];
                    setTitle(notification.title);
                    setDescription(notification.description);
                } catch (error) {
                    console.error('Error fetching notification:', error);
                }
            };
            fetchNotification();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                id ? `https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/updateNotification/${id}` : 'https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/createNotification',
                {
                    method: id ? 'PATCH' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description }),
                    credentials: 'include'
                }
            );
            if (!response.ok) throw new Error('Failed to submit notification');
            router.push('/notification/viewNotification');
        } catch (error) {
            console.error('Error submitting notification:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{id ? 'Update Notification' : 'Create Notification'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="border p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {id ? 'Update Notification' : 'Create Notification'}
                </button>
            </form>
        </div>
    );
};

export default NotificationForm;
