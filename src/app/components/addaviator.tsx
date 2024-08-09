

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export interface Aviator {
//   id?: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   role: string;
// }

// interface AviatorFormProps {
//   aviator?: Aviator;
//   onSave: (aviator: Aviator) => void;
// }

// const AviatorForm: React.FC<AviatorFormProps> = ({ aviator, onSave }) => {
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Aviator>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//   });
//   const router = useRouter();

//   useEffect(() => {
//     if (aviator) {
//       setFormData({
//         firstName: aviator.firstName || '',
//         lastName: aviator.lastName || '',
//         email: aviator.email || '',
//         password: '', 
//         confirmPassword: '',
//         role: aviator.role || '',
//       });
//     }
//   }, [aviator]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:4000/aviators/createAviator', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to create aviator');
//       }
  
//       const result = await response.json();
//       console.log('Aviator created successfully:', result);
//       router.push('/viewuser');
  
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         role: '',
//       });
//     } catch (error) {
//       console.error('Error creating aviator:', error);
//       setError('An error occurred while creating the aviator');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-xl">
//       <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Aviator Form</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
//             First Name <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="John"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
//             Last Name <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Doe"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-800">
//             Email <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="example@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="role" className="block text-sm font-medium text-gray-800">
//             Role <span className="text-red-600">*</span>
//           </label>
//           <select
//             id="role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="Aviator">Aviator</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-800">
//             Password {aviator ? '' : <span className="text-red-600">*</span>}
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="••••••••"
//             required={!aviator}
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800">
//             Confirm Password {aviator ? '' : <span className="text-red-600">*</span>}
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="••••••••"
//             required={!aviator}
//           />
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
//       <div className="flex justify-between mt-8">
//         <button
//           type="submit"
//           className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//         >
//           {aviator ? 'Save Changes' : 'Create Aviator'}
//         </button>
//         <Link href="/viewuser" className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300">
         
//             Cancel
          
//         </Link>
//       </div>
//     </form>
//   );
// };

// export default AviatorForm;
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface Aviator {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface AviatorFormProps {
  aviator?: Aviator | null; // Allow aviator to be null
  onSave: (aviator: Aviator) => void;
}

const AviatorForm: React.FC<AviatorFormProps> = ({ aviator, onSave }) => {
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Aviator>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (aviator) {
      setFormData({
        firstName: aviator.firstName || '',
        lastName: aviator.lastName || '',
        email: aviator.email || '',
        password: '',
        confirmPassword: '',
        role: aviator.role || '',
      });
    }
  }, [aviator]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      // Prepare the data for submission
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/createAviator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create aviator');
      }
  
      // Handle successful response
      const result = await response.json();
      console.log('Aviator created successfully:', result);
      router.push('/viewuser')
  
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    } catch (error) {
      console.error('Error creating aviator:', error);
      setError('An error occurred while creating the aviator');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Aviator Form</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="example@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-800">
            Role <span className="text-red-600">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Aviator">Aviator</option>
          </select>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-800">
            Password {aviator ? '' : <span className="text-red-600">*</span>}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            required={!aviator}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800">
            Confirm Password {aviator ? '' : <span className="text-red-600">*</span>}
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            required={!aviator}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-4">
        <Link href="/viewuser">
          <button type="button" className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          <p>Error: {error}</p>
        </div>
      )}
    </form>
  );
};

export default AviatorForm;

