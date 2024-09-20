

'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { signIn ,useSession} from 'next-auth/react';
import { useUser } from './context/userContext';

export default function SignupForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [role, setRole] = useState<string>('Admin');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { setUser } = useUser();
  const validateField = (name: string, value: string) => {
    const validationErrors: { [key: string]: string } = { ...errors };

    switch (name) {
      case 'firstName':
        if (value.length < 4) {
          validationErrors.firstName = 'First name must be at least 4 characters long';
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          validationErrors.firstName = 'First name must start with a letter and contain no special characters';
        } else {
          delete validationErrors.firstName;
        }
        break;

      case 'lastName':
        if (value.length < 4) {
          validationErrors.lastName = 'Last name must be at least 4 characters long';
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          validationErrors.lastName = 'Last name must start with a letter and contain no special characters';
        } else {
          delete validationErrors.lastName;
        }
        break;

      case 'email':
        if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          validationErrors.email = 'Invalid email format. Must be like user@example.com';
        } else {
          delete validationErrors.email;
        }
        break;

      case 'password':
        const minLength = 6;
        const startsWithLetter = /^[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&#]/.test(value);

        if (value.length < minLength) {
          validationErrors.password = `Password must be at least ${minLength} characters long`;
        } else if (!startsWithLetter) {
          validationErrors.password = 'Password must start with a letter';
        } else if (!hasNumber) {
          validationErrors.password = 'Password must include at least one number';
        } else if (!hasSpecialChar) {
          validationErrors.password = 'Password must include at least one special character';
        } else {
          delete validationErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== password) {
          validationErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete validationErrors.confirmPassword;
        }
        break;
    }

    setErrors(validationErrors);
  };

  const validateInputs = () => {
    const validationErrors: { [key: string]: string } = {};

    validateField('firstName', firstName);
    validateField('lastName', lastName);
    validateField('email', email);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);

    return validationErrors;
  };
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
          profileImage:session.user.image
        });
        console.log('googleAuth',setUser)

      
        if (session.user.role === 'Aviator') {
          router.push('/userRender/viewCommunityQuestions');
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
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const dataToSend = {
      firstName,
      lastName,
      email,
      password,
      role,
      profileImage,
    };

    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
        credentials:'include'
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || { form: 'An error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    }
  };

  const handleImageUpload = (files: File[]) => {
    setProfileImage(files[0]);
  };

  const getInputBorderClass = (field: string) => {
    return errors[field] ? 'border-red-500' : 'border-gray-200';
  };

  return (
    <div className="w-full max-w-md bg-white p-2 rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`p-2 border rounded ${getInputBorderClass('role')}`}
          >
            <option value="Admin">Admin</option>
            <option value="Aviator">Aviator</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateField('firstName', e.target.value);
            }}
            className={`w-full p-2 rounded ${getInputBorderClass('firstName')}`}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateField('lastName', e.target.value);
            }}
            className={`w-full p-2 rounded ${getInputBorderClass('lastName')}`}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <TextInput
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            className={`w-full p-2 rounded ${getInputBorderClass('email')}`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField('password', e.target.value);
            }}
            className={`w-full p-2 rounded ${getInputBorderClass('password')}`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField('confirmPassword', e.target.value);
            }}
            className={`w-full p-2 rounded ${getInputBorderClass('confirmPassword')}`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="mb-2">
           <label className="block text-sm font-medium mb-1">Profile Image</label>
          <Dropzone onDrop={handleImageUpload} maxFiles={1} style={{
               
                borderRadius: '8px',
                border: '2px dashed #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
              }}
          
          
          
          
          
          
          accept={["image/*"]}>
            {profileImage ? (
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile Image"
                width={80}
                height={80}
              />
            ) : (
              <div className="p-2 border border-dashed rounded">Upload Image</div>
            )}
          </Dropzone>
         </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-eisha"
          >
            Sign Up
          </button>
        </div>
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
        </button>    </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
}
