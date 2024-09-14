'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SetPasswordForm: React.FC = () => {
  const [resetPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const resetCode = searchParams.get('resetCode') || '';

  useEffect(() => {
    if (!email || !resetCode) {
      router.push('/forgetpassword'); // Redirect if parameters are missing
    }
  }, [email, resetCode, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetPassword || !confirmPassword) {
      setErrors({ form: 'Both fields are required' });
      return;
    }
    if (resetPassword !== confirmPassword) {
      setErrors({ form: 'Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/users/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode, resetPassword }),
        credentials:'include'
      });

      if (response.ok) {
        router.push('/login');
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
      <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={resetPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors.form && (
            <p className="text-red-500 text-sm mt-1">{errors.form}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

const SetPassword: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SetPasswordForm />
  </Suspense>
);

export default SetPassword;
