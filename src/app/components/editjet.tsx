// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import AddEditJetForm from '../components/AddEditJetForm';

// interface Jet {
//     name: string;
//     description: string;
//     jetImage?: string; // assuming jetImage is a URL string, update as necessary
//   }

// const EditJetPage= ({ id }: { id: string }) => {
//   const router = useRouter();
 
//   const [initialJetData, setInitialJetData] = useState<Jet | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJetData = async () => {
//       try {
//         const response = await fetch(`http://192.168.18.26:3000/jets/viewJet/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('data is',data)
//         setInitialJetData({
//           name: data.name,
//           description: data.description,
//           jetImage: data.imageURL,
//         });
//         console.log('imageurl data',data.imageURL)
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching jet data:', error);
//         setLoading(false);
//       }
//     };

//     fetchJetData();
//   }, [id]);

//   const handleSaveJet = async (formData: FormData) => {
//     try {
//       const response = await fetch(`http://192.168.18.26:3000/jets/updateJet${id}`, {
//         method: 'PATCH',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert('Jet updated successfully!');
//       router.push('/viewjets');
//     } catch (error) {
//       console.error('Error updating jet:', error);
//       alert('Error updating jet.');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
   
        
//         <main className="flex-1 p-4 bg-white">
//           {initialJetData && <AddEditJetForm initialJetData={initialJetData} onSave={handleSaveJet} />}
//         </main>
   
//   );
// };

// export default EditJetPage;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddEditJetForm from '../components/AddEditJetForm';

interface Jet {
    name: string;
    description: string;
    jetImage?: string; 
}

const EditJetPage = ({ id }: { id: string }) => {
    const router = useRouter();
    const [initialJetData, setInitialJetData] = useState<Jet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJetData = async () => {
            try {
                const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/jets/viewJet/${id}`,{ credentials: 'include',});
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setInitialJetData({
                    name: data.name,
                    description: data.description,
                    jetImage: data.imageURL,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jet data:', error);
                setLoading(false);
            }
        };

        fetchJetData();
    }, [id]);

    const handleSaveJet = async (formData: FormData) => {
        try {
            const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/jets/updateJet/${id}`, {
                method: 'PATCH',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert('Jet updated successfully!');
            router.push('/viewjets');
        } catch (error) {
            console.error('Error updating jet:', error);
            alert('Error updating jet.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex-1 p-4 bg-white">
            {initialJetData && <AddEditJetForm initialJetData={initialJetData} onSave={handleSaveJet} />}
        </main>
    );
};

export default EditJetPage;
