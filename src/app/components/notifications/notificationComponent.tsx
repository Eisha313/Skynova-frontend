
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Search from '../Search';
import NotificationModal from './notificationModal'; 
import { ArrowUpDown } from 'lucide-react'; // Import the NotificationModal

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
}

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Notification | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/notifications/viewNotifications',{credentials:'include',});
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
        credentials:'include'
      });
      if (!response.ok) throw new Error('Failed to delete notification');
      setNotifications(notifications.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleSort = (key: keyof Notification) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
  };

  const sortedNotifications = [...notifications];
  if (sortConfig.key) {
    sortedNotifications.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map(notification => notification.id));
    }
  };

  const handleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(selectedId => selectedId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };
  

  const renderArrow = (key: keyof Notification) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };

  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = notifications.filter(notification =>
        notification.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        notification.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        notification.date.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredNotifications(filtered);
  };

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredNotifications(notifications); // Reset filtered notifications to full list
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Notifications</h2>
        <div className="flex flex-1 justify-end space-x-2">
        <Search 
  onSearchChange={handleSearchChange} 
  searchTerm={searchTerm} 
  clearSearch={clearSearch} 
/>

          <Link href="/notification/addNotification" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center">
            Add Notification
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-eisha text-white">
            <tr>
              <th className="py-3 px-4 border-b bg-eisha text-left align-middle">
                <input
                  type="checkbox"
                  checked={selectedNotifications.length === notifications.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3 px-4 border-b bg-eisha text-left align-middle cursor-pointer" onClick={() => handleSort('title')}>
                Title {renderArrow('title')}
              </th>
              <th className="py-3 px-4 border-b bg-eisha text-left align-middle cursor-pointer" onClick={() => handleSort('description')}>
                Description {renderArrow('description')}
              </th>
              <th className="py-3 px-4 border-b bg-eisha text-left align-middle cursor-pointer" onClick={() => handleSort('date')}>
                Date {renderArrow('date')}
              </th>
              <th className="py-3 px-4 border-b bg-eisha text-center align-middle">
  Actions
</th>

            </tr>
          </thead>
          <tbody>
            {sortedNotifications.map((notification) => (
              <tr key={notification.id}>
                <td className="py-3 px-4 border-b border-gray-200 text-left align-middle">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left align-middle">
                  {notification.title}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left align-middle">
                  {notification.description}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left align-middle">
                  {notification.date}
                </td>
                {/* <td className="py-3 px-4 border-b border-gray-200 text-left align-middle flex space-x-2">
                  <button
                    onClick={() => handleViewNotification(notification)}
                    className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEye className="text-gray-700" />
                  </button>
                  <Link href={`/notification/viewNotification/${notification.id}/editNotification`}>
                    <button className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                      <FaEdit className="text-gray-700" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaTrash className="text-gray-700" />
                  </button>
                </td> */}
              <td className="py-3 px-4 border-b border-gray-200 text-center align-middle">
  <div className="flex items-center justify-center space-x-2">
    <Link href={`/notification/viewNotification/${notification.id}/editNotification`}>
      <button className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
        <FaEdit className="text-gray-700" />
      </button>
    </Link>
    <button
      onClick={() => handleDelete(notification.id)}
      className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
    >
      <FaTrash className="text-gray-700" />
    </button>
    <button
      onClick={() => handleViewNotification(notification)}
      className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
    >
      <FaEye className="text-gray-700" />
    </button>
  </div>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        notification={selectedNotification}
      />
    </div>
  );
};

export default NotificationsList;
