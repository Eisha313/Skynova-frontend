
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('admin');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};

    if (!firstName) {
      validationErrors.firstName = 'First name is required';
    }
    if (!lastName) {
      validationErrors.lastName = 'Last name is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const dataToSend = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      try {
        const response = await fetch('http://sky-nova-8ccaddc754ce.herokuapp.com/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          // Successfully signed up
          router.push('/login');
        } else {
          const errorData = await response.json();
          // Handle specific error messages from backend
          if (errorData.error) {
            setErrors({ form: errorData.error });
          } else if (errorData.errors) {
            setErrors(errorData.errors);
          } else {
            setErrors({ form: 'An error occurred. Please try again.' });
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        setErrors({ form: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-2 rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
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
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Sign Up
        </button>
        {errors.form && (
          <p className="text-red-500 text-sm mt-2 text-center">{errors.form}</p>
        )}
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">or continue with</p>
      <div className="flex justify-center mt-2">
        <button className="p-2 bg-white text-white rounded mx-2">
          <Image
            src="/google.svg"
            alt="google"
            width={20}
            height={20}
            className="rounded-full mr-2"
          />
        </button>
        <button className="p-2 bg-white text-white rounded mx-2">
          <Image
            src="/facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
            className="rounded-full mr-2"
          />
        </button>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
}
