// 'use client'
// import React from 'react';
// import Sidebar from '../components/sidebarDashboard';
// import Header from '../components/header';
// import QuizManager from '../components/verbalcomponent';
// import Link from 'next/link';
// import AviatorForm ,{ Aviator } from '../components/addaviator';
// import { useRouter } from 'next/router';
// import { useState } from 'react';






// const AddAviatorForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [redirect, setRedirect] = useState<boolean>(false);

//   const handleSave = async (aviator: Aviator) => {
//     try {
//       const response = await fetch('http://192.168.18.26:3000/aviators/createAviator', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(aviator),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save aviator');
//       }

   
//       setRedirect(true);
//     } catch (error) {
     
//       if (error instanceof Error) {
      
//         setError(error.message);
//       } else {
       
//         setError('An unexpected error occurred.');
//       }
//       console.error('Error saving aviator:', error);
//     }
//   };

//   if (redirect) {
   
//     if (typeof window !== 'undefined') {
//       window.location.href = '/viewuser';
//     }
//     return null; 
//   }

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-4 bg-white">
//           {error && (
//             <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
//               <p>Error: {error}</p>
//             </div>
//           )}
//           <AviatorForm onSave={handleSave} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddAviatorForm;
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import AviatorForm, { Aviator } from '../components/addaviator';
import { useRouter } from 'next/navigation';

const AddAviatorForm: React.FC<{ id: string }> = ({ id }) => {
  const [aviator, setAviator] = useState<Aviator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAviator = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviator/${id}`);
    
        if (response.ok) {
          const data = await response.json();
          setAviator(data);
        } else {
          const errorText = await response.text(); // Read the response as text
          console.error(`Error: ${response.status} ${response.statusText}`);
          console.error('Response:', errorText); // Log the response text
          setError('Failed to fetch aviator details.');
        }
      } catch (error) {
        console.error('Error fetching aviator:', error);
        setError('Failed to fetch aviator details.');
      }
    };

    fetchAviator();
  }, [id]);

  const handleSave = async (aviator: Aviator) => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/createAviator', {
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
    router.push('/viewuser');
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
          <AviatorForm aviator={aviator} onSave={handleSave} />
        </main>
      </div>
    </div>
  );
};

export default AddAviatorForm;
