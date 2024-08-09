'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    try {
      const response = await fetch('http://sky-nova-8ccaddc754ce.herokuapp.com/users/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset code sent successfully.');
        setErrors({});
        setTimeout(() => {
          router.push(`/codeverify?email=${encodeURIComponent(email)}`); // Redirect with email
        }, 1000); // Short delay for user experience
      } else {
        const errorData = await response.json();
        setErrors({ email: errorData.error });
      }
    } catch (error) {
      setErrors({ email: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
          <Image
            src="/padlock.svg" 
            alt="Padlock"
            width={40}
            height={40}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Send Code
        </button>
      </form>
      {successMessage && (
        <p className="text-green-600 text-sm text-center mt-2">{successMessage}</p>
      )}
      <p>Don&apos;t forget to reset your password.</p>
    </div>
  );
}
