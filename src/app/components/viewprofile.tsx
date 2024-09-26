
// import React, { useState } from 'react';
// import { useUser } from './context/userContext';
// import { useRouter } from 'next/navigation';

// interface ProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
//   const { firstName, lastName, email, role, profileImage } = useUser();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableUser, setEditableUser] = useState({ firstName, lastName, email });
//   const router = useRouter();

//   const handleEditClick = () => setIsEditing(true);
//   const handleSaveClick = () => {
    
//     setIsEditing(false);
//   };
//   const handlePasswordChange = () => {
//     router.push('/change-password'); // Navigate to change password page
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">X</button>
//         </div>

//         <div className="flex flex-col items-center">
//           <img
//             src={profileImage || '/default-profile.png'}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mb-4 object-cover"
//           />

//           {/* Profile Info */}
//           <div className="text-center space-y-2">
//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={editableUser.firstName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="First Name"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={editableUser.lastName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Last Name"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={editableUser.email}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Email"
//                 />
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-bold">{`${firstName} ${lastName}`}</h3>
//                 <p className="text-gray-600">{role}</p>
//                 <p className="text-gray-600">{email}</p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Button Section */}
//         <div className="flex justify-between mt-6">
//           {isEditing ? (
//             <button
//               onClick={handleSaveClick}
//               className="w-1/2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
//             >
//               Save
//             </button>
//           ) : (
//             <button
//               onClick={handleEditClick}
//               className="w-1/2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
//             >
//               Edit Profile
//             </button>
//           )}
//           <button
//             onClick={handlePasswordChange}
//             className="w-1/2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Change Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, TextInput, Button, Grid, Box, Title, Radio, PasswordInput, Image, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useUser } from './context/userContext';

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { firstName, lastName, email, role, profileImage, _id } = useUser();
  const [isEditing, setIsEditing] = useState(false); // State to switch between view and edit modes
  const [profileImg, setProfileImage] = useState<string | null>(profileImage || null); // For storing profile image
  const router = useRouter();

  // Form for editing user profile
  const form = useForm({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      role: role || '',
      profileImage: profileImage || '',
    },
    validate: {
      firstName: (value) =>
        value.length < 4
          ? 'First name must be at least 4 characters long'
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : 'First name must contain only letters',
      lastName: (value) =>
        value.length < 4
          ? 'Last name must be at least 4 characters long'
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : 'Last name must contain only letters',
      email: (value) =>
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Invalid email format',
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      role: role || '',
      profileImage: profileImage || '',
    });
    setProfileImage(profileImage || null);
  }, [firstName, lastName, email, role, profileImage]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        form.setFieldValue('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: User) => {
    try {
      const url = `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${_id}`;
      const requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
        profileImage: profileImg || values.profileImage,
      };

      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update user');
      }

      
      setIsEditing(false);
      onClose();
    } catch (error) {
      form.setErrors({ form: 'An error occurred while saving the user' });
    }
  };

  const handlePasswordChange = () => {
    router.push('/change-password');
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (!isOpen) return null;

  return (
    <Modal opened={isOpen} onClose={onClose} title={isEditing ? 'Edit Profile' : 'Profile Details'} size="lg">
      <Box p="md">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={profileImg || '/default-profile.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold">{`${firstName} ${lastName}`}</h3>
              <p className="text-gray-600">{role}</p>
              <p className="text-gray-600">{email}</p>
            </div>
            <div className="flex justify-between mt-6 w-full">
              <Button fullWidth onClick={toggleEditMode}>
                Edit Profile
              </Button>
              <Button fullWidth color="blue" onClick={handlePasswordChange}>
                Change Password
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput label="First Name" {...form.getInputProps('firstName')} required />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Last Name" {...form.getInputProps('lastName')} required />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Email" {...form.getInputProps('email')} required />
              </Grid.Col>
              <Grid.Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text>Profile Picture</Text>
                <Dropzone
                  onDrop={handleDrop}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={3 * 1024 ** 2}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '8px',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {profileImg ? (
                    <Image src={profileImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Text>Upload Image</Text>
                  )}
                </Dropzone>
              </Grid.Col>
            </Grid>
            <Button type="submit" fullWidth mt="md">
              Save Changes
            </Button>
            <Button fullWidth mt="sm" onClick={toggleEditMode}>
              Cancel
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
