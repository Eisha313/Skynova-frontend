'use client';

import { useState } from 'react';
import AddEditJetForm from '../components/AddEditJetForm';
import Link from 'next/link';

const ManageJets: React.FC = () => {
  const [editingJet, setEditingJet] = useState<any | null>(null);

  const handleSaveJet = async (formData: FormData) => {
    try {
      const response = editingJet
        ? await fetch(`http://192.168.18.54:3000/jets/${editingJet._id}`, {
            method: 'PUT',
            body: formData,
          })
        : await fetch('http://192.168.18.54:3000/jets/createJet', {
            method: 'POST',
            body: formData,
          });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedJet = await response.json();
      setEditingJet(null);
      alert('Jet saved successfully!');
    } catch (error) {
      console.error('Error saving jet:', error);
      alert('Error saving jet.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black rounded-lg shadow-md">
      <AddEditJetForm initialJetData={editingJet} onSave={handleSaveJet} />
      <div className="mt-8 ">
        <Link href="/viewjets">
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
            Back to View Jet
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ManageJets;
