// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function EditProfile() {
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [currentPassword, setCurrentPassword] = useState<string>('');
//   const [newPassword, setNewPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch current user data and set state
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('http://192.168.18.26:3000/users/profile', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use appropriate auth mechanism
//           },
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           setFirstName(userData.firstName);
//           setLastName(userData.lastName);
//           setEmail(userData.email);
//         } else {
//           // Handle errors or redirect if not authenticated
//           setErrors({ form: 'Failed to fetch user data. Please try again later.' });
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setErrors({ form: 'An error occurred. Please try again.' });
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!firstName || !lastName || !email) {
//       setErrors({ form: 'All fields are required' });
//       return;
//     }

//     if (newPassword && !currentPassword) {
//       setErrors({ form: 'Current password is required to change password' });
//       return;
//     }

//     if (newPassword && newPassword !== confirmPassword) {
//       setErrors({ form: 'Passwords do not match' });
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.18.26:3000/users/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use appropriate auth mechanism
//         },
//         body: JSON.stringify({ firstName, lastName, email, currentPassword, newPassword }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Profile updated successfully.');
//         setErrors({});
//         // Optionally, redirect or update user state
//       } else {
//         const errorData = await response.json();
//         setErrors({ form: errorData.error });
//       }
//     } catch (error) {
//       setErrors({ form: 'An error occurred. Please try again.' });
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
//       <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">First Name</label>
//           <input
//             type="text"
//             placeholder="Enter your first name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Last Name</label>
//           <input
//             type="text"
//             placeholder="Enter your last name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Current Password (required for password change)</label>
//           <input
//             type="password"
//             placeholder="Enter current password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">New Password (optional)</label>
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         {errors.form && (
//           <p className="text-red-500 text-sm mt-1">{errors.form}</p>
//         )}
//         {successMessage && (
//           <p className="text-green-600 text-sm text-center mt-2">{successMessage}</p>
//         )}
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white rounded"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }
