'use client'
import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import QuizManager from '../components/verbalcomponent';
import Link from 'next/link';
import AviatorForm ,{ Aviator } from '../components/addaviator';
import { useRouter } from 'next/router';
import { useState } from 'react';






const AddAviatorForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSave = async (aviator: Aviator) => {
    try {
      const response = await fetch('http://192.168.18.26:3000/aviators/createAviator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aviator),
      });

      if (!response.ok) {
        throw new Error('Failed to save aviator');
      }

   
      setRedirect(true);
    } catch (error) {
     
      if (error instanceof Error) {
      
        setError(error.message);
      } else {
       
        setError('An unexpected error occurred.');
      }
      console.error('Error saving aviator:', error);
    }
  };

  if (redirect) {
   
    if (typeof window !== 'undefined') {
      window.location.href = '/viewuser';
    }
    return null; 
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              <p>Error: {error}</p>
            </div>
          )}
          <AviatorForm onSave={handleSave} />
        </main>
      </div>
    </div>
  );
};

export default AddAviatorForm;
