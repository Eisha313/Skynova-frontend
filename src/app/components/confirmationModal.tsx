// import { Modal, Button } from '@mantine/core';
// import { useState } from 'react';

// const ConfirmationModal = ({ opened, onClose, onConfirm }) => (
//   <Modal opened={opened} onClose={onClose}>
//     <h2>Are you sure you want to delete this item?</h2>
//     <Button onClick={onConfirm} color="red">Yes, delete it</Button>
//     <Button onClick={onClose}>Cancel</Button>
//   </Modal>
// );
// DeleteConfirmationModal.tsx
import React from 'react';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this resource?</h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;