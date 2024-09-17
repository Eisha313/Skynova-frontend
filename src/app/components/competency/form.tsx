


// 'use client'
// import React, { useState } from 'react';
// import { useForm } from '@mantine/form';
// import { Button, TextInput, Select, Group, Grid, Text, Box, Image } from '@mantine/core';
// import { Dropzone, FileRejection, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import '@mantine/dropzone/styles.css';

// interface MedicalFitnessFormProps {
//   initialData?: {
//     id?: string;
//     height?: string;
//     heightUnit?: string;
//     weight?: string;
//     weightUnit?: string;
//     eyesight?: string;
//     medicalCondition?: string;
//     medicalHistoryFile?: File;
//   };
// }

// const MedicalFitnessForm = ({ initialData }: MedicalFitnessFormProps) => {
//   const [medicalHistoryFile, setMedicalHistoryFile] = useState<File | null>(initialData?.medicalHistoryFile || null);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   // Use Mantine's useForm for form handling
//   const form = useForm({
//     initialValues: {
//       height: initialData?.height || '',
//       heightUnit: initialData?.heightUnit || 'cm',
//       weight: initialData?.weight || '',
//       weightUnit: initialData?.weightUnit || 'kg',
//       eyesight: initialData?.eyesight || '',
//       medicalCondition: initialData?.medicalCondition || '',
//     },
//     validate: {
//       height: (value, values) => {
//         const heightVal = parseFloat(value);
//         if (isNaN(heightVal)) return 'Height must be a number';
//         if (values.heightUnit === 'cm' && (heightVal < 50 || heightVal > 300)) {
//           return 'Height should be between 50cm and 300cm';
//         }
//         if (values.heightUnit === 'in' && (heightVal < 20 || heightVal > 120)) {
//           return 'Height should be between 20in and 120in';
//         }
//         return null;
//       },
//       weight: (value) => {
//         const weightVal = parseFloat(value);
//         if (isNaN(weightVal)) return 'Weight must be a number';
//         if (weightVal < 20 || weightVal > 300) return 'Weight should be between 20kg and 300kg';
//         return null;
//       },
//       eyesight: (value) => {
//         const eyesightPattern = /^[0-9]+\/[0-9]+$/;
//         if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
//         return null;
//       },
//     },
//   });

//   const handleFileDrop = (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     setMedicalHistoryFile(file);
//     setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the file
//     setError(null); // Clear error when a valid file is dropped
//   };

//   const handleFileReject = (fileRejections: FileRejection[]) => {
//     setError('File is not acceptable. Please check the file format and size.');
//     setPreviewUrl(null); // Clear preview on rejection
//   };

//   const handleSubmit = async (values: typeof form.values) => {
//     if (form.validate().hasErrors) {
//       setError('Please fix the errors before submitting.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('height', values.height);
//     formData.append('heightUnit', values.heightUnit);
//     formData.append('weight', values.weight);
//     formData.append('weightUnit', values.weightUnit);
//     formData.append('eyesight', values.eyesight);
//     formData.append('medicalCondition', values.medicalCondition);
//     if (medicalHistoryFile) {
//       formData.append('medicalHistoryFile', medicalHistoryFile);
//     }

//     try {
//       const url = initialData?.id ? `/api/medical-fitness/${initialData.id}` : '/api/medical-fitness';
//       const method = initialData?.id ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save data');
//       }

//       setSuccessMessage('Medical fitness details saved successfully.');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
//     }
//   };

//   return (
//     <Box
//       style={{
//         maxWidth: '600px',
//         margin: 'auto',
//         padding: '20px',
//         border: '1px solid #e0e0e0',
//         borderRadius: '8px',
//         backgroundColor: '#f9fafb',
//       }}
//     >
//       <Box mb="lg" style={{ textAlign: 'center' }}>
//         <Text size="xl" tw='500'>
//           Medical Fitness Form
//         </Text>
//       </Box>

//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Grid>
//           <Grid.Col span={6}>
//             <TextInput
//               label="Height"
//               placeholder="Enter height"
//               {...form.getInputProps('height')}
//               error={form.errors.height}
//               onBlur={() => form.validateField('height')}
//             />
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Select
//               label="Unit"
//               data={[
//                 { value: 'cm', label: 'cm' },
//                 { value: 'in', label: 'inches' },
//               ]}
//               {...form.getInputProps('heightUnit')}
//             />
//           </Grid.Col>

//           <Grid.Col span={6}>
//             <TextInput
//               label="Weight"
//               placeholder="Enter weight"
//               {...form.getInputProps('weight')}
//               error={form.errors.weight}
//               onBlur={() => form.validateField('weight')}
//             />
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Select
//               label="Unit"
//               data={[
//                 { value: 'kg', label: 'kg' },
//                 { value: 'lbs', label: 'lbs' },
//               ]}
//               {...form.getInputProps('weightUnit')}
//             />
//           </Grid.Col>

//           <Grid.Col span={6}>
//             <TextInput
//               label="Eyesight"
//               placeholder="e.g. 20/20"
//               {...form.getInputProps('eyesight')}
//               error={form.errors.eyesight}
//               onBlur={() => form.validateField('eyesight')}
//             />
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <TextInput
//               label="Medical Condition"
//               placeholder="Enter medical condition"
//               {...form.getInputProps('medicalCondition')}
//             />
//           </Grid.Col>
//         </Grid>

//         <Dropzone
//           mt="md"
//           onDrop={handleFileDrop}
//           onReject={handleFileReject}
//           maxSize={5 * 1024 ** 2}
//           accept={IMAGE_MIME_TYPE}
//           style={{ height: '100px', borderRadius: '8px', border: '1px dashed #dee2e6' }}
//         >
//           <Group justify="center" gap="xl" style={{ pointerEvents: 'none', height: '100%' }}>
//             <Dropzone.Accept>
//               <IconUpload size={42} color="#1e90ff" />
//             </Dropzone.Accept>
//             <Dropzone.Reject>
//               <IconX size={42} color="#dc3545" />
//             </Dropzone.Reject>
//             <Dropzone.Idle>
//               <IconPhoto size={42} color="#6c757d" />
//             </Dropzone.Idle>
//             <div>
//               <Text size="lg">Upload Medical History File</Text>
//               <Text size="sm" color="dimmed" mt={7}>
//                 Drag images or click to select
//               </Text>
//             </div>
//           </Group>
//         </Dropzone>

//         {previewUrl && (
//           <Box mt="md" style={{ textAlign: 'center' }}>
//             <Text size="sm" tw='500'>Preview:</Text>
//             <Image src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
//           </Box>
//         )}

//         {error && <Text c="red" mt="md">{error}</Text>}
//         {successMessage && <Text c="green" mt="md">{successMessage}</Text>}

//         <Button type="submit" fullWidth mt="md">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default MedicalFitnessForm;
'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { Button, TextInput, Select, Group, Grid, Text, Box, Image } from '@mantine/core';
import { Dropzone, FileRejection, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import '@mantine/dropzone/styles.css';
interface InitialData {
  height: string;
  heightUnit: 'cm' | 'in';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  eyesight: string;
}

const AVIATION_STANDARDS = {
  height: { cm: [150, 200], in: [59, 79] }, // Example ranges
  weight: [50, 100], // Example range in kg
  eyesight: { min: '20/30', max: '20/20' } // Example standard
};

interface InitialValidationScreenProps {
  initialData?: {
    height?: string;
    heightUnit?: 'cm' | 'in';
    weight?: string;
    weightUnit?: 'kg' | 'lbs';
    eyesight?: string;
  };
  onProceed: () => void;
}

const InitialValidationScreen = ({ onProceed, initialData }: InitialValidationScreenProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Initialize the form with the correct types
  const form = useForm({
    initialValues: {
      height: initialData?.height || '',
      heightUnit: (initialData?.heightUnit || 'cm') as 'cm' | 'in',
      weight: initialData?.weight || '',
      weightUnit: (initialData?.weightUnit || 'kg') as 'kg' | 'lbs',
      eyesight: initialData?.eyesight || '',
    },
    validate: {
      height: (value, values) => {
        const heightVal = parseFloat(value);
        const unit = values.heightUnit as 'cm' | 'in';
        if (heightVal < AVIATION_STANDARDS.height[unit][0] || heightVal > AVIATION_STANDARDS.height[unit][1]) {
          return `Height should be between ${AVIATION_STANDARDS.height[unit][0]} and ${AVIATION_STANDARDS.height[unit][1]} ${unit}`;
        }
        return null;
      },
      weight: (value) => {
        const weightVal = parseFloat(value);
        if (weightVal < AVIATION_STANDARDS.weight[0] || weightVal > AVIATION_STANDARDS.weight[1]) {
          return `Weight should be between ${AVIATION_STANDARDS.weight[0]} and ${AVIATION_STANDARDS.weight[1]} kg`;
        }
        return null;
      },
      eyesight: (value) => {
        const eyesightPattern = /^[0-9]+\/[0-9]+$/;
        if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
        // Implement proper eyesight range validation based on standards if needed
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const heightVal = parseFloat(values.height);
    const weightVal = parseFloat(values.weight);
    const eyesightVal = values.eyesight;

    // Check if the values meet aviation standards
    const meetsStandards =
      heightVal >= AVIATION_STANDARDS.height[values.heightUnit][0] && heightVal <= AVIATION_STANDARDS.height[values.heightUnit][1] &&
      weightVal >= AVIATION_STANDARDS.weight[0] && weightVal <= AVIATION_STANDARDS.weight[1] &&
      eyesightVal >= AVIATION_STANDARDS.eyesight.min && eyesightVal <= AVIATION_STANDARDS.eyesight.max;

    if (!meetsStandards) {
      setError('You are not eligible based on the aviation standards.');
      return;
    }

    // If eligible, post the data
    const formData = new FormData();
    formData.append('height', values.height);
    formData.append('heightUnit', values.heightUnit);
    formData.append('weight', values.weight);
    formData.append('weightUnit', values.weightUnit);
    formData.append('eyesight', values.eyesight);

    try {
      const url = '/api/medical-fitness';
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include credentials in request
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Redirect to the report screen
      router.push('/report-screen');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <Box
      style={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
      }}
    >
      <Box mb="lg" style={{ textAlign: 'center' }}>
        <Text size="xl" tw='500'>
          Initial Validation Screen
        </Text>
      </Box>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Height"
              placeholder="Enter height"
              {...form.getInputProps('height')}
              error={form.errors.height}
              onBlur={() => form.validateField('height')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Unit"
              data={[
                { value: 'cm', label: 'cm' },
                { value: 'in', label: 'inches' },
              ]}
              value={form.values.heightUnit}
              onChange={(newUnit) => form.setFieldValue('heightUnit', newUnit as 'cm' | 'in')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Weight"
              placeholder="Enter weight"
              {...form.getInputProps('weight')}
              error={form.errors.weight}
              onBlur={() => form.validateField('weight')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Unit"
              data={[
                { value: 'kg', label: 'kg' },
                { value: 'lbs', label: 'lbs' },
              ]}
              value={form.values.weightUnit}
              onChange={(newUnit) => form.setFieldValue('weightUnit', newUnit as 'kg' | 'lbs')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Eyesight"
              placeholder="e.g. 20/20"
              {...form.getInputProps('eyesight')}
              error={form.errors.eyesight}
              onBlur={() => form.validateField('eyesight')}
            />
          </Grid.Col>
        </Grid>

        {error && <Text c="red" mt="md">{error}</Text>}

        <Button type="submit" fullWidth mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
};
    // const isEligible = true; 

    // if (isEligible) {
    //   onProceed();
    // } else {
    //   alert('You are ineligible. Redirecting to home.');
    //   // Handle redirection to home
    // }
  
  

    const ReportSubmissionScreen = () => {
      const [medicalHistoryFile, setMedicalHistoryFile] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
      const [timer, setTimer] = useState<number>(7 * 24 * 60 * 60 * 1000); // 1 week in milliseconds
      const [submitLater, setSubmitLater] = useState<boolean>(false);
    
      useEffect(() => {
        if (submitLater) {
          const start = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            setTimer(7 * 24 * 60 * 60 * 1000 - elapsed);
            if (elapsed >= 7 * 24 * 60 * 60 * 1000) {
              clearInterval(interval);
              alert('You have become ineligible due to timeout.');
              // Handle redirection to home or appropriate action
            }
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [submitLater]);
    
      const handleFileDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setMedicalHistoryFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the file
      };
    
      const handleFileReject = (fileRejections: FileRejection[]) => {
        alert('File is not acceptable. Please check the file format and size.');
        setPreviewUrl(null); // Clear preview on rejection
      };
    
      const handleSubmitLater = () => {
        setSubmitLater(true);
      };
    
      const handleSubmit = async () => {
        // Handle report submission logic here
        // For now, we just clear the timer and proceed
        setSubmitLater(false);
        alert('Report submitted successfully!');
      };
    
      return (
        <Box
          style={{
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
          }}
        >
          <Box mb="lg" style={{ textAlign: 'center' }}>
            <Text size="xl"tw='500'>
              Report Submission
            </Text>
          </Box>
    
          <Dropzone
            mt="md"
            onDrop={handleFileDrop}
            onReject={handleFileReject}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            style={{ height: '100px', borderRadius: '8px', border: '1px dashed #dee2e6' }}
          >
            <Group justify="center" gap="xl" style={{ pointerEvents: 'none', height: '100%' }}>
              <Dropzone.Accept>
                <IconUpload size={42} color="#1e90ff" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={42} color="#dc3545" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={42} color="#6c757d" />
              </Dropzone.Idle>
              <div>
                <Text size="lg">Upload Medical History File</Text>
                <Text size="sm" color="dimmed" mt={7}>
                  Drag images or click to select
                </Text>
              </div>
            </Group>
          </Dropzone>
    
          {previewUrl && (
            <Box mt="md" style={{ textAlign: 'center' }}>
              <Text size="sm" tw='500'>Preview:</Text>
              <Image src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
            </Box>
          )}
    
          <Button type="button" fullWidth mt="md" onClick={handleSubmitLater}>
            Submit Later
          </Button>
    
          <Button type="button" fullWidth mt="md" onClick={handleSubmit}>
            Submit
          </Button>
    
          {submitLater && (
            <Text mt="md" color="red">
              Timer: {Math.max(0, Math.floor(timer / (1000 * 60 * 60 * 24)))} days left to submit report.
            </Text>
          )}
        </Box>
      );
    };
    

const MedicalFitnessForm = () => {
  const [currentScreen, setCurrentScreen] = useState<'validation' | 'report'>('validation');

  // Example initial data
  const initialData: InitialData = {
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    eyesight: '',
  };

  return (
    <>
      {currentScreen === 'validation' ? (
        <InitialValidationScreen onProceed={() => setCurrentScreen('report')} initialData={initialData} />
      ) : (
        <ReportSubmissionScreen />
      )}
    </>
  );
};
export default MedicalFitnessForm