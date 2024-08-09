// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// export default function LoginForm() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [role, setRole] = useState<string>('admin');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationErrors: { [key: string]: string } = {};

//     if (!email) {
//       validationErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       validationErrors.email = 'Email is invalid';
//     }
//     if (!password) {
//       validationErrors.password = 'Password is required';
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.18.26:3000/users/login', { 
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, role }),
//       });

//       if (response.ok) {
//         router.push('/forgetpassword');
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
//       <form onSubmit={handleSubmit}>
//         <div className="flex justify-between items-center mb-7">
//           <h2 className="text-2xl font-bold mb-4">Log In</h2>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="Admin">Admin</option>
//             <option value="Aviator">Aviator</option>
//           </select>
//         </div>
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </div>
//         {errors.form && (
//           <p className="text-red-500 text-sm mt-2">{errors.form}</p>
//         )}
        
//           <a href="/forgetpassword" className="text-sm text-blue-600">
//             Forgot Password?
//           </a>
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-600 text-white rounded"
//           >
//             Log In
//           </button>
        
//       </form>
//       <p className="text-center text-sm text-gray-600 mt-2">or continue with</p>
//       <div className="flex justify-center mt-2">
//         <button className="p-2 bg-white text-white rounded mx-2">
//           <Image
//             src="/google.svg"
//             alt="Google"
//             width={20}
//             height={20}
//             className="rounded-full"
//           />
//         </button>
//         <button className="p-2 bg-white text-white rounded mx-2">
//           <Image
//             src="/facebook.svg"
//             alt="Facebook"
//             width={20}
//             height={20}
//             className="rounded-full"
//           />
//         </button>
//       </div>
//       <p className="text-center text-sm text-gray-600 mt-2">
//         Don't have an account? <a href="/signup" className="text-blue-600">Register for free</a>
//       </p>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('admin');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        router.push('/forgetpassword');
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.error });
      }
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Aviator">Aviator</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        {errors.form && (
          <p className="text-red-500 text-sm mt-2">{errors.form}</p>
        )}
        
        <a href="/forgetpassword" className="text-sm text-blue-600">
          Forgot Password?
        </a>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Log In
        </button>
        
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">or continue with</p>
      <div className="flex justify-center mt-2">
        <button className="p-2 bg-white text-white rounded mx-2">
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="rounded-full"
          />
        </button>
        <button className="p-2 bg-white text-white rounded mx-2">
          <Image
            src="/facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
            className="rounded-full"
          />
        </button>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account? <a href="/signup" className="text-blue-600">Register for free</a>
      </p>
    </div>
  );
}
