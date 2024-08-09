// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Notification {
//     id: string;
//     title: string;
//     description: string;
//     date: string;
// }

// const NotificationsList: React.FC = () => {
//     const [notifications, setNotifications] = useState<Notification[]>([]);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/notifications/viewNotifications');
//                 if (!response.ok) throw new Error('Failed to fetch notifications');
//                 const data = await response.json();
//                 const mappedNotifications: Notification[] = data.map((notification: any) => ({
//                     id: notification._id,
//                     title: notification.title,
//                     description: notification.description,
//                     date: new Date(notification.date).toLocaleDateString(),
//                 }));
//                 setNotifications(mappedNotifications);
//             } catch (error) {
//                 console.error('Error fetching notifications:', error);
//             }
//         };
//         fetchNotifications();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             const response = await fetch(`http://localhost:4000/notifications/deleteNotification/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete notification');
//             setNotifications(notifications.filter((notification) => notification.id !== id));
//         } catch (error) {
//             console.error('Error deleting notification:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
//             <div className="mb-6 flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
//                 <Link href="/notification/addNotification">
//                     <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                         Create Notification
//                     </button>
//                 </Link>
//             </div>
//             <div className="space-y-4">
//                 {notifications.map((notification) => (
//                     <div key={notification.id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
//                         <div>
//                             <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
//                             <p className="text-gray-700">{notification.description}</p>
//                             <p className="text-gray-500 text-sm">{notification.date}</p>
//                         </div>
//                         <div className="flex space-x-2">
//                             <Link href={`/notification/viewNotification/${notification.id}/editNotification`}>
//                                 <button className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
//                                     Edit
//                                 </button>
//                             </Link>
//                             <button
//                                 className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//                                 onClick={() => handleDelete(notification.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NotificationsList;
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Notification {
    id: string;
    title: string;
    description: string;
    date: string;
}

const NotificationsList: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/viewNotifications');
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const data = await response.json();
                const mappedNotifications: Notification[] = data.map((notification: any) => ({
                    id: notification._id,
                    title: notification.title,
                    description: notification.description,
                    date: new Date(notification.date).toLocaleDateString(),
                }));
                setNotifications(mappedNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/deleteNotification/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete notification');
            setNotifications(notifications.filter((notification) => notification.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
                <Link href="/notification/addNotification">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Create Notification
                    </button>
                </Link>
            </div>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-grow mb-4 md:mb-0">
                            <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
                            <p className="text-gray-700">{notification.description}</p>
                            <p className="text-gray-500 text-sm">{notification.date}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link href={`/notification/viewNotification/${notification.id}/editNotification`}>
                                <button className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                                    Edit
                                </button>
                            </Link>
                            <button
                                className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                onClick={() => handleDelete(notification.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsList;
