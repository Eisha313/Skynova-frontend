import React, { useState, useEffect } from 'react';
import AviatorForm from './addaviator';
import { useRouter } from 'next/router';
interface Aviator {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }
  
const ManageAviator: React.FC = () => {
  const [aviator, setAviator] = useState<Aviator | null>(null);
  const router = useRouter();
  const { id } = router.query;
  

  useEffect(() => {
    if (id) {
      const fetchAviator = async () => {
        try {
          const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviator/${id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setAviator({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: '', // Do not fetch password
            confirmPassword: '', // Do not fetch confirm password
            role: data.role,
          });
        } catch (error) {
          console.error('Error fetching aviator:', error);
        }
      };

      fetchAviator();
    }
  }, [id]);

  const handleSaveAviator = async (aviator: Aviator) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/${aviator.id ? `updateAviator/${aviator.id}` : 'addAviator'}`, {
        method: aviator.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aviator),
      });
      if (!response.ok) throw new Error('Failed to save aviator');
      router.push('/manage-aviators'); // Redirect to the list page after saving
    } catch (error) {
      console.error('Error saving aviator:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">{aviator ? 'Edit Aviator' : 'Add Aviator'}</h1>
      <AviatorForm aviator={aviator || undefined} onSave={handleSaveAviator} />
    </div>
  );
};

export default ManageAviator;
