
// "use client";

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import AviatorForm, { Aviator } from './addaviator';

// const EditUser = ({ id }: { id: string }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<Aviator | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       fetch(`http://192.168.18.26:3000/aviators/viewAviator/${id}`)
//         .then(response => response.json())
//         .then(data => {
//           setUser(data);
//           setLoading(false);
//         })
//         .catch(err => {
//           setError('Error fetching user data');
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleSave = async (aviator: Aviator) => {
//     try {
//       await fetch(`http://192.168.18.26:3000/aviators/updateAviator/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'formData' },
//         body: JSON.stringify(aviator),
//       });

//       router.push('/viewuser');
//     } catch (err) {
//       console.error('Error updating user:', err);
//       setError('An error occurred while updating the user');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return user ? <AviatorForm aviator={user} onSave={handleSave} isEdit /> : <div>No user found</div>;
// };

// export default EditUser;
