'use client';

import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import AddEditJetForm from '../components/AddEditJetForm';
import { useRouter } from 'next/navigation';

const AddJet: React.FC = () => {
  const router = useRouter();

  const handleSaveJet = async (formData: FormData) => {
    try {
      const response = await fetch('https://192.168.18.54:3000/jets/createJet', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Jet saved successfully!');
      router.push('/viewjets');
    } catch (error) {
      console.error('Error saving jet:', error);
      alert('Error saving jet.');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        <main className="flex-1 p-4 bg-white">
          <AddEditJetForm onSave={handleSaveJet} />
        </main>
      </div>
    </div>
  );
};

export default AddJet;
