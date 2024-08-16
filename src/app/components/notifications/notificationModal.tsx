// NotificationModal.tsx
'use client';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-lg w-full">
        <button
          className="text-gray-600 hover:text-gray-800 absolute top-2 right-2"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">{notification.title}</h2>
        <p className="mb-4">{notification.description}</p>
        <p className="text-gray-500"><strong>Date:</strong> {notification.date}</p>
      </div>
    </div>
  );
};

export default NotificationModal;
