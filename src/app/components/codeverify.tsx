'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const CodeVerificationForm: React.FC = () => {
  const [resetCode, setCode] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || ''; // Retrieve email from query parameter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetCode) {
      setErrors({ resetCode: 'Verification code is required' });
      return;
    }

    try {
      const response = await fetch('http://192.168.18.54:3000/users/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetCode, email }), 
      });

      if (response.ok) {
        setSuccessMessage('Code verified successfully.');
        setErrors({});
        setTimeout(() => {
          router.push(`/setpassword?email=${email}&resetCode=${resetCode}`); // Ensure resetCode is passed to the next page
        }, 1000); 
      } else {
        const errorData = await response.json();
        setErrors({ resetCode: errorData.error });
      }
    } catch (error) {
      setErrors({ resetCode: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify Code</h2>
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
          <label className="block text-sm font-medium mb-1">Verification Code</label>
          <input
            type="text"
            placeholder="Enter the code sent to your email"
            value={resetCode}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.resetCode && (
            <p className="text-red-500 text-sm mt-1">{errors.resetCode}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Verify Code
        </button>
      </form>
      {successMessage && (
        <p className="text-green-600 text-sm text-center mt-2">{successMessage}</p>
      )}
    </div>
  );
};

const CodeVerification: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CodeVerificationForm />
  </Suspense>
);

export default CodeVerification;
