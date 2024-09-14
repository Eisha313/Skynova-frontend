// // // pages/MedicalFitnessForm.tsx

// // import React, { useState, useEffect } from 'react';

// // interface MedicalFitnessFormProps {
// //   initialData?: {
// //     id?: string; 
// //     height: number;
// //     heightUnit: 'cm' | 'in';
// //     weight: number;
// //     weightUnit: 'kg' | 'lb';
// //     eyesight: string;
// //   };
// // }

// // const MedicalFitnessForm: React.FC<MedicalFitnessFormProps> = ({ initialData }) => {
// //   const [height, setHeight] = useState<number | ''>(initialData?.height || '');
// //   const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>(initialData?.heightUnit || 'cm');
// //   const [weight, setWeight] = useState<number | ''>(initialData?.weight || '');
// //   const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>(initialData?.weightUnit || 'kg');
// //   const [eyesight, setEyesight] = useState<string>(initialData?.eyesight || '');
// //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);

// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();
// //     setIsSubmitting(true);
// //     setError(null);
// //     setSuccessMessage(null);

// //     const payload = {
// //       height,
// //       heightUnit,
// //       weight,
// //       weightUnit,
// //       eyesight,
// //     };

// //     try {
// //       if (initialData?.id) {
// //         // Update existing data
// //         const response = await fetch(`/api/medical-fitness/${initialData.id}`, {
// //           method: 'PATCH',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(payload),
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to update data');
// //         }
// //         setSuccessMessage('Medical fitness details updated successfully.');
// //       } else {
// //         // Create new data
// //         const response = await fetch('/api/medical-fitness', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(payload),
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to save data');
// //         }
// //         setSuccessMessage('Medical fitness details saved successfully.');
// //       }
// //     } catch (error) {
// //       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (initialData) {
// //       setHeight(initialData.height);
// //       setHeightUnit(initialData.heightUnit);
// //       setWeight(initialData.weight);
// //       setWeightUnit(initialData.weightUnit);
// //       setEyesight(initialData.eyesight);
// //     }
// //   }, [initialData]);

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
// //       <fieldset className="mb-4">
// //         <legend className="text-lg font-semibold">Medical Fitness Details</legend>

// //         {/* Height */}
// //         <div className="mb-4">
// //           <label htmlFor="height" className="block mb-1">
// //             Height <span className="text-red-500">*</span>
// //           </label>
// //           <div className="flex">
// //             <input
// //               type="number"
// //               id="height"
// //               className="w-full border border-gray-300 rounded p-2"
// //               value={height}
// //               onChange={(e) => setHeight(e.target.valueAsNumber || '')}
// //               min="50"
// //               max="250"
// //               placeholder="Enter height"
// //               required
// //             />
// //             <select
// //               id="heightUnit"
// //               className="border border-gray-300 rounded p-2 ml-2"
// //               value={heightUnit}
// //               onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'in')}
// //               required
// //             >
// //               <option value="cm">cm</option>
// //               <option value="in">in</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* Weight */}
// //         <div className="mb-4">
// //           <label htmlFor="weight" className="block mb-1">
// //             Weight <span className="text-red-500">*</span>
// //           </label>
// //           <div className="flex">
// //             <input
// //               type="number"
// //               id="weight"
// //               className="w-full border border-gray-300 rounded p-2"
// //               value={weight}
// //               onChange={(e) => setWeight(e.target.valueAsNumber || '')}
// //               min="30"
// //               max="200"
// //               placeholder="Enter weight"
// //               required
// //             />
// //             <select
// //               id="weightUnit"
// //               className="border border-gray-300 rounded p-2 ml-2"
// //               value={weightUnit}
// //               onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
// //               required
// //             >
// //               <option value="kg">kg</option>
// //               <option value="lb">lb</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* Eyesight */}
// //         <div className="mb-4">
// //           <label htmlFor="eyesight" className="block mb-1">
// //             Eyesight <span className="text-red-500">*</span>
// //           </label>
// //           <select
// //             id="eyesight"
// //             className="w-full border border-gray-300 rounded p-2"
// //             value={eyesight}
// //             onChange={(e) => setEyesight(e.target.value)}
// //             required
// //           >
// //             <option value="" disabled>
// //               Select your eyesight
// //             </option>
// //             <option value="20/20">20/20</option>
// //             <option value="20/40">20/40</option>
// //             {/* Add more options as needed */}
// //           </select>
// //         </div>
// //       </fieldset>

// //       {error && <p className="text-red-500">{error}</p>}
// //       {successMessage && <p className="text-green-500">{successMessage}</p>}

// //       <button
// //         type="submit"
// //         className="w-full bg-blue-500 text-white p-2 rounded"
// //         disabled={isSubmitting}
// //       >
// //         {isSubmitting ? 'Submitting...' : 'Submit'}
// //       </button>
// //     </form>
// //   );
// // };

// // export default MedicalFitnessForm;
// import React, { useState } from 'react';
// import { useForm } from '@mantine/form';
// import { TextInput, NumberInput, Button, Group, Text, rem } from '@mantine/core';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

// const MedicalFitnessForm = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const form = useForm({
//     initialValues: {
//       height: '',
//       weight: '',
//       eyesight: '',
//     },

//     validate: {
//       height: (value) => (value === '' ? 'Height is required' : null),
//       weight: (value) => (value === '' ? 'Weight is required' : null),
//       eyesight: (value) => (value === '' ? 'Eyesight is required' : null),
//     },
//   });

//   const handleDrop = (acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//     setError(null);
//   };

//   const handleReject = (rejectedFiles: File[]) => {
//     setError('Some files were rejected. Please ensure they are images and do not exceed 5MB.');
//   };

//   const handleUpload = async () => {
//     try {
//       if (files.length === 0) {
//         setError('Please select a file to upload.');
//         return;
//       }

//       // Implement the upload logic here (e.g., sending files to a backend API)
//       console.log('Uploading files:', files);

//       // Reset after successful upload
//       setFiles([]);
//       setError(null);
//     } catch (uploadError) {
//       setError('Failed to upload the file(s). Please try again.');
//     }
//   };

//   const handleSubmit = (values: typeof form.values) => {
//     console.log('Form values:', values);

//     // Implement the form submission logic here (e.g., POST or PATCH to backend)
//   };

//   return (
//     <form onSubmit={form.onSubmit(handleSubmit)} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
//       <TextInput
//         label="Height (cm) *"
//         placeholder="Enter your height"
//         withAsterisk
//         {...form.getInputProps('height')}
//       />

//       <TextInput
//         label="Weight (kg) *"
//         placeholder="Enter your weight"
//         withAsterisk
//         {...form.getInputProps('weight')}
//       />

//       <TextInput
//         label="Eyesight *"
//         placeholder="Enter your eyesight (e.g., 20/20)"
//         withAsterisk
//         {...form.getInputProps('eyesight')}
//       />

//       {/* Medical History Upload Section */}
//       <div className="mt-6">
//         <Text size="lg" className="mb-4 font-semibold">
//           Upload Medical History
//         </Text>

//         <Dropzone
//           onDrop={handleDrop}
//           onReject={handleReject}
//           maxSize={5 * 1024 ** 2} // 5MB
//           accept={IMAGE_MIME_TYPE}
//         >
//           <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
//             <Dropzone.Accept>
//               <IconUpload
//                 style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
//                 stroke={1.5}
//               />
//             </Dropzone.Accept>
//             <Dropzone.Reject>
//               <IconX
//                 style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
//                 stroke={1.5}
//               />
//             </Dropzone.Reject>
//             <Dropzone.Idle>
//               <IconPhoto
//                 style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
//                 stroke={1.5}
//               />
//             </Dropzone.Idle>

//             <div>
//               <Text size="xl" inline>
//                 Drag images here or click to select files
//               </Text>
//               <Text size="sm" c="dimmed" inline mt={7}>
//                 Attach as many files as you like, each file should not exceed 5MB
//               </Text>
//             </div>
//           </Group>
//         </Dropzone>

//         {error && <Text color="red" mt="sm">{error}</Text>}

//         <div className="mt-4">
//           {files.length > 0 && (
//             <div className="mb-4">
//               <Text size="sm" c="dimmed">
//                 Selected files:
//               </Text>
//               <ul>
//                 {files.map((file, index) => (
//                   <li key={index}>
//                     <Text size="sm">{file.name}</Text>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <Button
//             onClick={handleUpload}
//             fullWidth
//             variant="filled"
//             color="blue"
//           >
//             Upload File
//           </Button>
//         </div>
//       </div>

//       <Group justify="right" mt="md">
//         <Button type="submit">Submit</Button>
//       </Group>
//     </form>
//   );
// };

// export default MedicalFitnessForm;
import React, { useState, useEffect } from 'react';
import { Button, TextInput, Group, Text, rem } from '@mantine/core';
import { Dropzone, FileRejection, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

interface MedicalFitnessFormProps {
  initialData?: {
    id?: string;
    height?: string;
    weight?: string;
    eyesight?: string;
    medicalHistoryFile?: File;
  };
}

const MedicalFitnessForm = ({ initialData }: MedicalFitnessFormProps) => {
  // State for form fields
  const [height, setHeight] = useState(initialData?.height || '');
  const [weight, setWeight] = useState(initialData?.weight || '');
  const [eyesight, setEyesight] = useState(initialData?.eyesight || '');
  const [medicalHistoryFile, setMedicalHistoryFile] = useState<File | null>(initialData?.medicalHistoryFile || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileDrop = (acceptedFiles: File[]) => {
    setMedicalHistoryFile(acceptedFiles[0]);
  };

  const handleFileReject = (fileRejections: FileRejection[]) => {
    console.log('rejected files', fileRejections);
    setError('File is not acceptable. Please check the file format and size.');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      height,
      weight,
      eyesight,
      // Convert File object to a file blob for POST/PUT request
      medicalHistoryFile,
    };

    try {
      const url = initialData?.id ? `/api/medical-fitness/${initialData.id}` : '/api/medical-fitness';
      const method = initialData?.id ? 'PATCH' : 'POST';

      const formData = new FormData();
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('eyesight', eyesight);
      if (medicalHistoryFile) {
        formData.append('medicalHistoryFile', medicalHistoryFile);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setSuccessMessage('Medical fitness details saved successfully.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        required
      />
      <TextInput
        label="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <TextInput
        label="Eyesight"
        value={eyesight}
        onChange={(e) => setEyesight(e.target.value)}
        required
      />
      
      <Dropzone
        onDrop={handleFileDrop}
        onReject={handleFileReject}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      
      <Button type="submit" disabled={isSubmitting}>
        {initialData?.id ? 'Update' : 'Submit'}
      </Button>
      
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
    </form>
  );
};

export default MedicalFitnessForm;
