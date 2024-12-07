
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Radio, Button, Box, Image, Text, Grid ,Title} from '@mantine/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';


export interface Aviator {
  id?: string; 
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  profileImage?: string;
}


interface AviatorFormProps {
  id?: string;
  aviator?: Aviator; 
  
  onSave?: (values: Aviator) => void;
  
  
 
}

const AviatorForm: React.FC<AviatorFormProps> = ({ id,aviator,onSave}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      profileImage: '',
    },
    validate: {
      firstName: (value) =>
        value.length < 4
          ? 'First name must be at least 4 characters long'
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : 'First name must start with a letter and contain no special characters',
      lastName: (value) =>
        value.length < 4
          ? 'Last name must be at least 4 characters long'
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : 'Last name must start with a letter and contain no special characters',
      email: (value) =>
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Invalid email format. Must be like user@example.com',
      password: (value) => 
        id // Skip validation if updating (i.e., id is present)
          ? null 
          : (() => { // Apply validation only for new users (no id)
              const minLength = 6;
              const startsWithLetter = /^[a-zA-Z]/.test(value);
              const hasNumber = /\d/.test(value);
              const hasSpecialChar = /[@$!%*?&#]/.test(value);
              if (value.length < minLength) return `Password must be at least ${minLength} characters long`;
              if (!startsWithLetter) return 'Password must start with a letter';
              if (!hasNumber) return 'Password must include at least one number';
              if (!hasSpecialChar) return 'Password must include at least one special character';
              return null;
            })(),
      confirmPassword: (value, values) =>
        id // Skip validation if updating
          ? null
          : value !== values.password
          ? 'Passwords do not match'
          : null,
    },
  });
  

  console.log(form.errors)

  useEffect(() => {
    if (id) {
      fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviator/${id}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched Aviator Data:', data);
          form.setValues({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            role: data.role || '',
            profileImage: data.profileImage || '',
          });
          setProfileImage(data.profileImage || null); 
        })
        .catch((error) => {
          console.error('Error fetching aviator:', error);
          form.setErrors({ form: 'An error occurred while fetching aviator details' });
        });
    }
  }, [id]);
  

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

  
  
      
  
  
  

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/checkEmail?email=${email}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result.exists; 
    } catch (error) {
      console.error('Error checking email:', error);
      return false; 
    }
  };
  
 
  
  const handleSubmit = async (values: Aviator) => {
    try {
   
      if (!id || (id && values.email !== aviator?.email)) {
        const emailExists = await checkEmailExists(values.email);
        if (emailExists) {
          form.setErrors({ email: 'Email already exists' });
          return; 
        }
      }
  
      const method = id ? 'PATCH' : 'POST';
      const url = id
        ? `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${id}`
        : 'https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/createAviator';
  
      const requestBody: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
        profileImage: profileImage || values.profileImage,
      };
  
      
      if (!id && values.password) {
        requestBody.password = values.password;
      }
      if(id)
{
  delete requestBody.email
}  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(errorText || 'Failed to save aviator');
      }
  
      await onSave?.(values); 
      router.push('/viewuser');
    } catch (error) {
      console.error('Error:', error);
      form.setErrors({ form: 'An error occurred while saving the aviator' });
    }
  };
  

  
  

  return (
    <Box maw={800} mx="auto" p="md" 
    style={{
      display: 'flex',
      borderRadius: '8px',
      justifyContent:'center',
      alignItems:'center'
    }} >
      <form onSubmit={form.onSubmit(handleSubmit)} className="bg-[#212C44] p-6 rounded-xl shadow-lg text-white align-center">
        <Box style={{ display: 'flex', justifyContent: 'center' ,alignItems:'center'}} mb="md">
          <Title>{id ? 'Edit User' : 'Create User'}</Title>
        </Box>

        <Grid   gutter="md">
          <Grid.Col span={6}>
            <TextInput
              label="First Name"
              classNames={{
                input:"custom-placeholder bg-[#7E7E7E4D] border border-white rounded-lg text-white hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }}
              placeholder="John"
              {...form.getInputProps('firstName')}
              required
              onBlur={() => form.validateField('firstName')}
              // className=' border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none'
          className="rounded-xl bg-transparent "
          />

          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Last Name"
              placeholder="Doe" 
              classNames={{
                input:"custom-placeholder bg-[#7E7E7E4D] border border-white/30 rounded-lg text-white hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }}
              {...form.getInputProps('lastName')}
              required
              onBlur={() => form.validateField('lastName')}
              
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="md" mt="md">
          <Grid.Col span={6}>
            <TextInput
              label="Email"
              classNames={{
                input:"custom-placeholder bg-[#7E7E7E4D] border border-white text-white rounded-lg  hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }}
              placeholder="example@example.com"
              {...form.getInputProps('email')}
              required
              onBlur={() => form.validateField('email')}
               
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Radio.Group   label="Role" {...form.getInputProps('role')} required>
              <Radio  classNames={{
                radio:"custom-placeholder bg-[#7E7E7E4D] border border-white rounded-lg text-white hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }} value="Admin" label="Admin" style={{ marginRight: '1rem' }} />
              <Radio  classNames={{
                radio:"custom-placeholder bg-[#7E7E7E4D] border border-white rounded-lg text-white hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }} value="Aviator" label="Aviator" />
              
            </Radio.Group>
          </Grid.Col>
        </Grid>

        {!id && (
          <Grid gutter="md" mt="md">
            <Grid.Col span={6}>
              <PasswordInput
              classNames={{
                input:"custom-placeholder bg-[#7E7E7E4D] border border-white text-white rounded-lg  hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              }}
                label="Password"
                placeholder="********"
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <FaEyeSlash /> : <FaEye />
                }
                visible={showPassword}
                onVisibilityChange={setShowPassword}
                {...form.getInputProps('password')}
                required
                onBlur={() => form.validateField('password')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <PasswordInput
                label="Confirm Password"
                placeholder="********"
                classNames={{
                  input:"custom-placeholder bg-[#7E7E7E4D] border border-white rounded-lg  text-white hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
                }}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <FaEyeSlash /> : <FaEye />
                }
                visible={showConfirmPassword}
                onVisibilityChange={setShowConfirmPassword}
                {...form.getInputProps('confirmPassword')}
                required
                onBlur={() => form.validateField('confirmPassword')}
              />
            </Grid.Col>
          </Grid>
        )}

        <Grid gutter="md" mt="md">
          <Grid.Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text ta='center' size="sm" mb="md " c={'white'}>
              Profile Picture
            </Text>
            <Dropzone
              onDrop={handleDrop}
              accept={IMAGE_MIME_TYPE}
              maxSize={3 * 1024 ** 2} // 3 MB
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '8px',
                marginTop:"20px",
                border: '4px dashed #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor:'transparent'
              }}
            
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <Text ta="center" c={'white'}>Upload Image</Text>
              )}
            </Dropzone>
          </Grid.Col>
        </Grid>

        <Button type="submit" mt="md" fullWidth>
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Box>
  );
};

export default AviatorForm;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { TextInput, PasswordInput, Radio, Button, Box, Image, Text, Grid, Title } from '@mantine/core';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useForm } from '@mantine/form';
// import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import '@mantine/dropzone/styles.css';

// export interface Aviator {
//   id?: string; 
//   firstName: string;
//   lastName: string;
//   email: string;
//   password?: string;
//   confirmPassword?: string;
//   role: string;
//   profileImage?: File | null; // File instead of string
// }

// interface AviatorFormProps {
//   id?: string;
//   aviator?: Aviator; 
//   onSave?: (values: Aviator) => void;
// }

// const AviatorForm: React.FC<AviatorFormProps> = ({ id, aviator, onSave }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // Store the file here
//   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null); // For image preview
//   const router = useRouter();

//   const form = useForm({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       role: '',
//     },
//     validate: {
//       firstName: (value) => 
//         value.length < 4 ? 'First name must be at least 4 characters long' 
//         : /^[a-zA-Z]+$/.test(value) ? null 
//         : 'First name must start with a letter and contain no special characters',
//       lastName: (value) => 
//         value.length < 4 ? 'Last name must be at least 4 characters long' 
//         : /^[a-zA-Z]+$/.test(value) ? null 
//         : 'Last name must start with a letter and contain no special characters',
//       email: (value) =>
//         /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
//           ? null : 'Invalid email format. Must be like user@example.com',
//       password: (value) => 
//         id ? null : (() => {
//           const minLength = 6;
//           const startsWithLetter = /^[a-zA-Z]/.test(value);
//           const hasNumber = /\d/.test(value);
//           const hasSpecialChar = /[@$!%*?&#]/.test(value);
//           if (value.length < minLength) return `Password must be at least ${minLength} characters long`;
//           if (!startsWithLetter) return 'Password must start with a letter';
//           if (!hasNumber) return 'Password must include at least one number';
//           if (!hasSpecialChar) return 'Password must include at least one special character';
//           return null;
//         })(),
//       confirmPassword: (value, values) =>
//         id ? null : value !== values.password ? 'Passwords do not match' : null,
//     },
//   });

//   useEffect(() => {
//     if (id) {
//       fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/viewAviator/${id}`, { credentials: 'include' })
//         .then((res) => res.json())
//         .then((data) => {
//           form.setValues({
//             firstName: data.firstName || '',
//             lastName: data.lastName || '',
//             email: data.email || '',
//             role: data.role || '',
           
//           });
//           setProfileImagePreview(data.profileImage || null); 
//         })
//         .catch((error) => {
//           form.setErrors({ form: 'An error occurred while fetching aviator details' });
//         });
//     }
//   }, [id]);

//   const handleDrop = (files: File[]) => {
//     const file = files[0];
//     if (file) {
//       setProfileImageFile(file); // Store the file
//       setProfileImagePreview(URL.createObjectURL(file)); // For image preview
//     }
//   };

//   const handleSubmit = async (values: Aviator) => {
//     try {
//       if (id && values.email === aviator?.email) {
//         // Skip email check if it's the same email.
//       } else {
//         const emailExists = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/checkEmail?email=${values.email}`)
//           .then(res => res.json())
//           .then(result => result.exists);
  
//         if (emailExists) {
//           form.setErrors({ email: 'Email already exists' });
//           return; 
//         }
//       }
  
//       const method = id ? 'PATCH' : 'POST';
//       const url = id
//         ? `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${id}`
//         : 'https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/createAviator';
  
//       const formData = new FormData();
//       formData.append('firstName', values.firstName);
//       formData.append('lastName', values.lastName);
//       formData.append('email', values.email);
//       formData.append('role', values.role);
  
//       if (!id && values.password) {
//         formData.append('password', values.password);
//       }
  
//       if (profileImageFile) {
//         formData.append('profileImage', profileImageFile); 
//       }
//       const entries = Array.from(formData.entries());

//       for (const [key, value] of entries) {
//         console.log(key, value);
//       }
      
//       const response = await fetch(url, {
//         method,
//         body: formData,
//         credentials: 'include',
//       });
//   console.log(response);
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Failed to save aviator');
//       }
  
//       await onSave?.(values); 
//       router.push('/viewuser');
//     } catch (error) {
//       form.setErrors({ form: 'An error occurred while saving the aviator' });
//     }
//   };
  
//   return (
//     <Box maw={800} mx="auto" p="md">
//       <form onSubmit={form.onSubmit(handleSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
//         <Box style={{ display: 'flex', justifyContent: 'center' }} mb="md">
//           <Title>{id ? 'Edit User' : 'Create User'}</Title>
//         </Box>

//         <Grid gutter="md">
//           <Grid.Col span={6}>
//             <TextInput
//               label="First Name"
//               placeholder="John"
//               {...form.getInputProps('firstName')}
//               required
//             />
//           </Grid.Col>

//           <Grid.Col span={6}>
//             <TextInput
//               label="Last Name"
//               placeholder="Doe"
//               {...form.getInputProps('lastName')}
//               required
//             />
//           </Grid.Col>
//         </Grid>

//         <Grid gutter="md" mt="md">
//           <Grid.Col span={6}>
//             <TextInput
//               label="Email"
//               placeholder="example@example.com"
//               {...form.getInputProps('email')}
//               required
//             />
//           </Grid.Col>

//           <Grid.Col span={6}>
//             <Radio.Group label="Role" {...form.getInputProps('role')} required>
//               <Radio value="Admin" label="Admin" />
//               <Radio value="Aviator" label="Aviator" />
//             </Radio.Group>
//           </Grid.Col>
//         </Grid>

//         {!id && (
//           <Grid gutter="md" mt="md">
//             <Grid.Col span={6}>
//               <PasswordInput
//                 label="Password"
//                 placeholder="********"
//                 visibilityToggleIcon={({ reveal }) => reveal ? <FaEyeSlash /> : <FaEye />}
//                 visible={showPassword}
//                 onVisibilityChange={setShowPassword}
//                 {...form.getInputProps('password')}
//                 required
//               />
//             </Grid.Col>

//             <Grid.Col span={6}>
//               <PasswordInput
//                 label="Confirm Password"
//                 placeholder="********"
//                 visibilityToggleIcon={({ reveal }) => reveal ? <FaEyeSlash /> : <FaEye />}
//                 visible={showConfirmPassword}
//                 onVisibilityChange={setShowConfirmPassword}
//                 {...form.getInputProps('confirmPassword')}
//                 required
//               />
//             </Grid.Col>
//           </Grid>
//         )}

//         <Grid gutter="md" mt="md">
//           <Grid.Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Text ta="center" size="sm" mb="md">
//               Profile Picture
//             </Text>
//             <Dropzone
//               onDrop={handleDrop}
//               accept={IMAGE_MIME_TYPE}
//               maxSize={3 * 1024 ** 2} // 3 MB
//               style={{
//                 width: '200px',
//                 height: '200px',
//                 borderRadius: '8px',
//                 border: '2px dashed #ccc',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               {profileImagePreview ? (
//                 <Image src={profileImagePreview} alt="Profile Preview" width={200} height={200} />
//               ) : (
//                 <Text ta="center">Drag image here or click to select</Text>
//               )}
//             </Dropzone>
//           </Grid.Col>
//         </Grid>

//         <Box mt="xl" style={{ textAlign: 'center' }}>
//           <Button type="submit" variant="filled" color="blue" fullWidth>
//             {id ? 'Update User' : 'Create User'}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default AviatorForm;
