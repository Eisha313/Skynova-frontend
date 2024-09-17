
'use client';

import { useState ,useEffect} from 'react';
import { PasswordInput } from '@mantine/core'; // Import Mantine's PasswordInput
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from './context/userContext';
import { signIn ,useSession} from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Admin');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { setUser } = useUser();

 
  
  const { data: session, status } = useSession(); 

  
  const handleOAuthSignIn = async (provider: string) => {
    const result = await signIn(provider, { redirect: false });

    if (result?.ok && result?.status === 200) {
      
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      
      if (session?.user) {
       
        setUser({
          _id: session.user._id,
          firstName: session.user?.name?.split(' ')[0] || '',
          lastName: session.user?.name?.split(' ')[1] || '',
          role: session.user.role,
          email: session.user.email,
          token:session.user.accessToken,
          profileImage:  session.user.image , 
        });
        console.log('googleAuth',setUser)

      
        if (session.user.role === 'Aviator') {
          // router.push('/userRender/viewCommunityQuestions');
          router.push('/'); 
        } else if (session.user.role === 'Admin') {
          router.push('/dashboard');
        } else {
          router.push('/'); 
        }
      }
    } else {
  
      console.error('OAuth login failed');
    }
  };
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
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
  
        const token = data.token;
        const userRole = data.role;
  
      
        localStorage.setItem('token', token);
  
        
        const user = {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          email: data.email,
          token:data.token,
          profileImage:data.profileImage
        };
        
        setUser(user); 
  
        localStorage.setItem('user', JSON.stringify(user)); 
  
        
        if (userRole === 'Aviator') {
          router.push('/userRender/viewCommunityQuestions');
        } else if (userRole === 'Admin') {
          router.push('/dashboard');
        }
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.error || 'Login failed. Please check your credentials.' });
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
          <label className="block text-sm font-medium mb-1">Password</label>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            error={errors.password && errors.password}
          />
        </div>
        {errors.form && (
          <p className="text-red-500 text-sm mt-2">{errors.form}</p>
        )}

        <a href="/forgetpassword" className="text-sm text-blue-600">
          Forgot Password?
        </a>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded mt-4"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">or continue with</p>
      <div className="flex justify-center mt-2">
        <button onClick={() => handleOAuthSignIn('google')} className="p-2 bg-white text-white rounded mx-2">
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="rounded-full"
          />
        </button>
        <button onClick={() => handleOAuthSignIn('github')} className="p-2 bg-white text-white rounded mx-2">
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
