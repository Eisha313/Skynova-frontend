
// // // 'use client'
// // // import React, { useState, useEffect } from 'react';
// // // import { useForm } from '@mantine/form';
// // // import { useRouter } from 'next/navigation';
// // // import { Button, TextInput, Select, Group, Grid, Text, Box, Image } from '@mantine/core';
// // // import { Dropzone, FileRejection, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// // // import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// // // import '@mantine/dropzone/styles.css';
// // // interface InitialData {
// // //   height: string;
// // //   heightUnit: 'cm' | 'in';
// // //   weight: string;
// // //   weightUnit: 'kg' | 'lbs';
// // //   eyesight: string;
// // // }

// // // const AVIATION_STANDARDS = {
// // //   height: { cm: [150, 200], in: [59, 79] }, // Example ranges
// // //   weight: [50, 100], // Example range in kg
// // //   eyesight: { min: '20/30', max: '20/20' } // Example standard
// // // };

// // // interface InitialValidationScreenProps {
// // //   initialData?: {
// // //     height?: string;
// // //     heightUnit?: 'cm' | 'in';
// // //     weight?: string;
// // //     weightUnit?: 'kg' | 'lbs';
// // //     eyesight?: string;
// // //   };
// // //   onProceed: () => void;
// // // }

// // // const InitialValidationScreen = ({ onProceed, initialData }: InitialValidationScreenProps) => {
// // //   const router = useRouter();
// // //   const [error, setError] = useState<string | null>(null);

// // //   // Initialize the form with the correct types
// // //   const form = useForm({
// // //     initialValues: {
// // //       height: initialData?.height || '',
// // //       heightUnit: (initialData?.heightUnit || 'cm') as 'cm' | 'in',
// // //       weight: initialData?.weight || '',
// // //       weightUnit: (initialData?.weightUnit || 'kg') as 'kg' | 'lbs',
// // //       eyesight: initialData?.eyesight || '',
// // //     },
// // //     validate: {
// // //       height: (value, values) => {
// // //         const heightVal = parseFloat(value);
// // //         const unit = values.heightUnit as 'cm' | 'in';
// // //         if (heightVal < AVIATION_STANDARDS.height[unit][0] || heightVal > AVIATION_STANDARDS.height[unit][1]) {
// // //           return `Height should be between ${AVIATION_STANDARDS.height[unit][0]} and ${AVIATION_STANDARDS.height[unit][1]} ${unit}`;
// // //         }
// // //         return null;
// // //       },
// // //       weight: (value) => {
// // //         const weightVal = parseFloat(value);
// // //         if (weightVal < AVIATION_STANDARDS.weight[0] || weightVal > AVIATION_STANDARDS.weight[1]) {
// // //           return `Weight should be between ${AVIATION_STANDARDS.weight[0]} and ${AVIATION_STANDARDS.weight[1]} kg`;
// // //         }
// // //         return null;
// // //       },
// // //       eyesight: (value) => {
// // //         const eyesightPattern = /^[0-9]+\/[0-9]+$/;
// // //         if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
// // //         // Implement proper eyesight range validation based on standards if needed
// // //         return null;
// // //       },
// // //     },
// // //   });

// // //   const handleSubmit = async (values: typeof form.values) => {
// // //     const heightVal = parseFloat(values.height);
// // //     const weightVal = parseFloat(values.weight);
// // //     const eyesightVal = values.eyesight;

// // //     // Check if the values meet aviation standards
// // //     const meetsStandards =
// // //       heightVal >= AVIATION_STANDARDS.height[values.heightUnit][0] && heightVal <= AVIATION_STANDARDS.height[values.heightUnit][1] &&
// // //       weightVal >= AVIATION_STANDARDS.weight[0] && weightVal <= AVIATION_STANDARDS.weight[1] &&
// // //       eyesightVal >= AVIATION_STANDARDS.eyesight.min && eyesightVal <= AVIATION_STANDARDS.eyesight.max;

// // //     if (!meetsStandards) {
// // //       setError('You are not eligible based on the aviation standards.');
// // //       return;
// // //     }

// // //     // If eligible, post the data
// // //     const formData = new FormData();
// // //     formData.append('height', values.height);
// // //     formData.append('heightUnit', values.heightUnit);
// // //     formData.append('weight', values.weight);
// // //     formData.append('weightUnit', values.weightUnit);
// // //     formData.append('eyesight', values.eyesight);

// // //     try {
// // //       const url = '/api/medical-fitness';
// // //       const response = await fetch(url, {
// // //         method: 'POST',
// // //         body: formData,
// // //         credentials: 'include', // Include credentials in request
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to save data');
// // //       }

// // //       // Redirect to the report screen
// // //       router.push('/report-screen');
// // //     } catch (error) {
// // //       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
// // //     }
// // //   };

// // //   return (
// // //     <Box
// // //       style={{
// // //         maxWidth: '600px',
// // //         margin: 'auto',
// // //         padding: '20px',
// // //         border: '1px solid #e0e0e0',
// // //         borderRadius: '8px',
// // //         backgroundColor: '#f9fafb',
// // //       }}
// // //     >
// // //       <Box mb="lg" style={{ textAlign: 'center' }}>
// // //         <Text size="xl" tw='500'>
// // //           Initial Validation Screen
// // //         </Text>
// // //       </Box>

// // //       <form onSubmit={form.onSubmit(handleSubmit)}>
// // //         <Grid>
// // //           <Grid.Col span={6}>
// // //             <TextInput
// // //               label="Height"
// // //               placeholder="Enter height"
// // //               {...form.getInputProps('height')}
// // //               error={form.errors.height}
// // //               onBlur={() => form.validateField('height')}
// // //             />
// // //           </Grid.Col>
// // //           <Grid.Col span={6}>
// // //             <Select
// // //               label="Unit"
// // //               data={[
// // //                 { value: 'cm', label: 'cm' },
// // //                 { value: 'in', label: 'inches' },
// // //               ]}
// // //               value={form.values.heightUnit}
// // //               onChange={(newUnit) => form.setFieldValue('heightUnit', newUnit as 'cm' | 'in')}
// // //             />
// // //           </Grid.Col>

// // //           <Grid.Col span={6}>
// // //             <TextInput
// // //               label="Weight"
// // //               placeholder="Enter weight"
// // //               {...form.getInputProps('weight')}
// // //               error={form.errors.weight}
// // //               onBlur={() => form.validateField('weight')}
// // //             />
// // //           </Grid.Col>
// // //           <Grid.Col span={6}>
// // //             <Select
// // //               label="Unit"
// // //               data={[
// // //                 { value: 'kg', label: 'kg' },
// // //                 { value: 'lbs', label: 'lbs' },
// // //               ]}
// // //               value={form.values.weightUnit}
// // //               onChange={(newUnit) => form.setFieldValue('weightUnit', newUnit as 'kg' | 'lbs')}
// // //             />
// // //           </Grid.Col>

// // //           <Grid.Col span={6}>
// // //             <TextInput
// // //               label="Eyesight"
// // //               placeholder="e.g. 20/20"
// // //               {...form.getInputProps('eyesight')}
// // //               error={form.errors.eyesight}
// // //               onBlur={() => form.validateField('eyesight')}
// // //             />
// // //           </Grid.Col>
// // //         </Grid>

// // //         {error && <Text c="red" mt="md">{error}</Text>}

// // //         <Button type="submit" fullWidth mt="md">
// // //           Submit
// // //         </Button>
// // //       </form>
// // //     </Box>
// // //   );
// // // };
// // //     // const isEligible = true; 

// // //     // if (isEligible) {
// // //     //   onProceed();
// // //     // } else {
// // //     //   alert('You are ineligible. Redirecting to home.');
// // //     //   // Handle redirection to home
// // //     // }
  
  

// // //     const ReportSubmissionScreen = () => {
// // //       const [medicalHistoryFile, setMedicalHistoryFile] = useState<File | null>(null);
// // //       const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// // //       const [timer, setTimer] = useState<number>(7 * 24 * 60 * 60 * 1000); // 1 week in milliseconds
// // //       const [submitLater, setSubmitLater] = useState<boolean>(false);
    
// // //       useEffect(() => {
// // //         if (submitLater) {
// // //           const start = Date.now();
// // //           const interval = setInterval(() => {
// // //             const elapsed = Date.now() - start;
// // //             setTimer(7 * 24 * 60 * 60 * 1000 - elapsed);
// // //             if (elapsed >= 7 * 24 * 60 * 60 * 1000) {
// // //               clearInterval(interval);
// // //               alert('You have become ineligible due to timeout.');
              
// // //             }
// // //           }, 1000);
    
// // //           return () => clearInterval(interval);
// // //         }
// // //       }, [submitLater]);
    
// // //       const handleFileDrop = (acceptedFiles: File[]) => {
// // //         const file = acceptedFiles[0];
// // //         setMedicalHistoryFile(file);
// // //         setPreviewUrl(URL.createObjectURL(file)); 
// // //       };
    
// // //       const handleFileReject = (fileRejections: FileRejection[]) => {
// // //         alert('File is not acceptable. Please check the file format and size.');
// // //         setPreviewUrl(null); // Clear preview on rejection
// // //       };
    
// // //       const handleSubmitLater = () => {
// // //         setSubmitLater(true);
// // //       };
    
// // //       const handleSubmit = async () => {
        
// // //         setSubmitLater(false);
// // //         alert('Report submitted successfully!');
// // //       };
    
// // //       return (
// // //         <Box
// // //           style={{
// // //             maxWidth: '600px',
// // //             margin: 'auto',
// // //             padding: '20px',
// // //             border: '1px solid #e0e0e0',
// // //             borderRadius: '8px',
// // //             backgroundColor: '#f9fafb',
// // //           }}
// // //         >
// // //           <Box mb="lg" style={{ textAlign: 'center' }}>
// // //             <Text size="xl"tw='500'>
// // //               Report Submission
// // //             </Text>
// // //           </Box>
    
// // //           <Dropzone
// // //             mt="md"
// // //             onDrop={handleFileDrop}
// // //             onReject={handleFileReject}
// // //             maxSize={5 * 1024 ** 2}
// // //             accept={IMAGE_MIME_TYPE}
// // //             style={{ height: '100px', borderRadius: '8px', border: '1px dashed #dee2e6' }}
// // //           >
// // //             <Group justify="center" gap="xl" style={{ pointerEvents: 'none', height: '100%' }}>
// // //               <Dropzone.Accept>
// // //                 <IconUpload size={42} color="#1e90ff" />
// // //               </Dropzone.Accept>
// // //               <Dropzone.Reject>
// // //                 <IconX size={42} color="#dc3545" />
// // //               </Dropzone.Reject>
// // //               <Dropzone.Idle>
// // //                 <IconPhoto size={42} color="#6c757d" />
// // //               </Dropzone.Idle>
// // //               <div>
// // //                 <Text size="lg">Upload Medical History File</Text>
// // //                 <Text size="sm" color="dimmed" mt={7}>
// // //                   Drag images or click to select
// // //                 </Text>
// // //               </div>
// // //             </Group>
// // //           </Dropzone>
    
// // //           {previewUrl && (
// // //             <Box mt="md" style={{ textAlign: 'center' }}>
// // //               <Text size="sm" tw='500'>Preview:</Text>
// // //               <Image src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
// // //             </Box>
// // //           )}
    
// // //           <Button type="button" fullWidth mt="md" onClick={handleSubmitLater}>
// // //             Submit Later
// // //           </Button>
    
// // //           <Button type="button" fullWidth mt="md" onClick={handleSubmit}>
// // //             Submit
// // //           </Button>
    
// // //           {submitLater && (
// // //             <Text mt="md" color="red">
// // //               Timer: {Math.max(0, Math.floor(timer / (1000 * 60 * 60 * 24)))} days left to submit report.
// // //             </Text>
// // //           )}
// // //         </Box>
// // //       );
// // //     };
    

// // // const MedicalFitnessForm = () => {
// // //   const [currentScreen, setCurrentScreen] = useState<'validation' | 'report'>('validation');


// // //   const initialData: InitialData = {
// // //     height: '',
// // //     heightUnit: 'cm',
// // //     weight: '',
// // //     weightUnit: 'kg',
// // //     eyesight: '',
// // //   };

// // //   return (
// // //     <>
// // //       {currentScreen === 'validation' ? (
// // //         <InitialValidationScreen onProceed={() => setCurrentScreen('report')} initialData={initialData} />
// // //       ) : (
// // //         <ReportSubmissionScreen />
// // //       )}
// // //     </>
// // //   );
// // // };
// // // export default MedicalFitnessForm
// // 'use client';
// // import React, { useState } from 'react';
// // import { useForm } from '@mantine/form';
// // import { useRouter } from 'next/navigation';
// // import {
// //   Button,
// //   TextInput,
// //   Select,
// //   Group,
// //   Grid,
// //   Box,
// //   Text,
// //   Modal,
// //   Notification,
// // } from '@mantine/core';
// // import { Dropzone, FileWithPath } from '@mantine/dropzone';
// // import '@mantine/dropzone/styles.css';
// // import { IconMoodSad, IconUpload, IconFile } from '@tabler/icons-react';

// // const AVIATION_STANDARDS = {
// //   height: { cm: [150, 200], in: [59, 79] }, // Example ranges
// //   weight: [50, 100], // Example range in kg
// //   eyesight: { min: '20/30', max: '20/20' }, // Example standard
// // };

// // const MedicalValidationForm = () => {
// //   const [isEligible, setIsEligible] = useState(true);
// //   const [modalOpened, setModalOpened] = useState(false);
// //   const [medicalReport, setMedicalReport] = useState<File | null>(null);
// //   const [error, setError] = useState<string | null>(null);
// //   const [showFile, setShowFile] = useState<string | null>(null); // For showing file name
// //   const router = useRouter();

// //   const form = useForm({
// //     initialValues: {
// //       height: '',
// //       heightUnit: 'cm',
// //       weight: '',
// //       weightUnit: 'kg',
// //       eyesight: '',
// //     },
// //     validate: {
// //       height: (value, values) => {
// //         const heightVal = parseFloat(value);
// //         const unit = values.heightUnit as 'cm' | 'in';
// //         if (isNaN(heightVal)) return 'Height must be a number';
// //         if (
// //           heightVal < AVIATION_STANDARDS.height[unit][0] ||
// //           heightVal > AVIATION_STANDARDS.height[unit][1]
// //         ) {
// //           return `Height should be between ${AVIATION_STANDARDS.height[unit][0]} and ${AVIATION_STANDARDS.height[unit][1]} ${unit}`;
// //         }
// //         return null;
// //       },
// //       weight: (value) => {
// //         const weightVal = parseFloat(value);
// //         if (isNaN(weightVal)) return 'Weight must be a number';
// //         if (weightVal < AVIATION_STANDARDS.weight[0] || weightVal > AVIATION_STANDARDS.weight[1]) {
// //           return `Weight should be between ${AVIATION_STANDARDS.weight[0]} and ${AVIATION_STANDARDS.weight[1]} kg`;
// //         }
// //         return null;
// //       },
// //       eyesight: (value) => {
// //         const eyesightPattern = /^[0-9]+\/[0-9]+$/;
// //         if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
// //         return null;
// //       },
// //     },
// //   });

// //   const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
// //     const file = acceptedFiles[0];
// //     setMedicalReport(file);
// //     setShowFile(file.name); // Show the file name
// //   };

// //   const checkEligibility = (values: typeof form.values) => {
// //     const heightVal = parseFloat(values.height);
// //     const weightVal = parseFloat(values.weight);
// //     const meetsStandards =
// //       heightVal >= AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'][0] &&
// //       heightVal <= AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'][1] &&
// //       weightVal >= AVIATION_STANDARDS.weight[0] &&
// //       weightVal <= AVIATION_STANDARDS.weight[1] &&
// //       values.eyesight >= AVIATION_STANDARDS.eyesight.min &&
// //       values.eyesight <= AVIATION_STANDARDS.eyesight.max;

// //     if (!meetsStandards) {
// //       setIsEligible(false);
// //       setModalOpened(true);
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (values: typeof form.values) => {
// //     if (!checkEligibility(values)) {
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append('height', values.height);
// //       formData.append('heightUnit', values.heightUnit);
// //       formData.append('weight', values.weight);
// //       formData.append('weightUnit', values.weightUnit);
// //       formData.append('eyesight', values.eyesight);

// //       if (medicalReport) {
// //         formData.append('medicalReport', medicalReport);
// //       }

// //       // Save to backend
// //       const response = await fetch('/api/medical-reports', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to save medical report');
// //       }

// //       // Redirect to verbal quiz after passing
// //       router.push('/verbal-quiz');
// //     } catch (error) {
// //       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
// //     }
// //   };

// //   return (
// //     <Box mx="auto" p="md" style={{ maxWidth: 600 }}>
// //       <form onSubmit={form.onSubmit(handleSubmit)}>
// //         <Grid>
// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Height"
// //               placeholder="Enter height"
// //               {...form.getInputProps('height')}
// //               error={form.errors.height}
// //             />
// //           </Grid.Col>
// //           <Grid.Col span={6}>
// //             <Select
// //               label="Height Unit"
// //               data={[
// //                 { value: 'cm', label: 'cm' },
// //                 { value: 'in', label: 'inches' },
// //               ]}
// //               {...form.getInputProps('heightUnit')}
// //             />
// //           </Grid.Col>

// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Weight"
// //               placeholder="Enter weight"
// //               {...form.getInputProps('weight')}
// //               error={form.errors.weight}
// //             />
// //           </Grid.Col>
// //           <Grid.Col span={6}>
// //             <Select
// //               label="Weight Unit"
// //               data={[
// //                 { value: 'kg', label: 'kg' },
// //                 { value: 'lbs', label: 'lbs' },
// //               ]}
// //               {...form.getInputProps('weightUnit')}
// //             />
// //           </Grid.Col>

// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Eyesight"
// //               placeholder="e.g. 20/20"
// //               {...form.getInputProps('eyesight')}
// //               error={form.errors.eyesight}
// //             />
// //           </Grid.Col>
// //         </Grid>

// //         <Box mt="md" p="md" style={{ border: '2px dashed #ccc', borderRadius: '8px' }}>
// //           <Dropzone onDrop={handleFileDrop} accept="application/pdf">
// //             <Group justify="center" flex="column" style={{ textAlign: 'center' }}>
// //               {showFile ? (
// //                 <>
// //                   <IconFile size={24} />
// //                   <Text>{showFile}</Text>
// //                 </>
// //               ) : (
// //                 <>
// //                   <IconUpload size={24} />
// //                   <Text>Upload Medical Report (Optional)</Text>
// //                 </>
// //               )}
// //             </Group>
// //           </Dropzone>
// //         </Box>

// //         {error && <Notification color="red">{error}</Notification>}

// //         <Button type="submit" mt="md" fullWidth>
// //           Submit
// //         </Button>
// //       </form>

// //       <Modal opened={!isEligible && modalOpened} onClose={() => setModalOpened(false)} title="Ineligible">
// //         <Group align="center" justify="column">
// //           <IconMoodSad size={48} color="red" />
// //           <Text>You are not eligible to be an aviator based on the entered data.</Text>
// //           <Button color="red" onClick={() => router.push('/')}>
// //             Return to Home
// //           </Button>
// //         </Group>
// //       </Modal>

// //       <Modal
// //         opened={!medicalReport && modalOpened}
// //         onClose={() => setModalOpened(false)}
// //         title="Missing Report"
// //       >
// //         <Group align="center" justify="column">
// //           <Text>
// //             Please upload your medical report. You must submit it within 7 days.
// //           </Text>
// //           <Button color="blue" onClick={() => setModalOpened(false)}>
// //             OK
// //           </Button>
// //         </Group>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default MedicalValidationForm;
// // 'use client';
// // import React, { useState } from 'react';
// // import { useForm } from '@mantine/form';
// // import { useRouter } from 'next/navigation';
// // import {
// //   Button,
// //   TextInput,
// //   Select,
// //   Group,
// //   Grid,
// //   Box,
// //   Text,
// //   Modal,
// //   Notification,
// // } from '@mantine/core';
// // import { Dropzone, FileWithPath, } from '@mantine/dropzone';
// // import '@mantine/dropzone/styles.css';
// // import { IconMoodSad, IconUpload, IconFile } from '@tabler/icons-react';

// // const AVIATION_STANDARDS = {
// //   height: { cm: [150, 200], in: [59, 79] }, // Example ranges
// //   weight: [50, 100], // Example range in kg
// //   eyesight: { min: '20/30', max: '20/20' }, // Example standard
// // };

// // const MedicalValidationForm = () => {
// //   const [isEligible, setIsEligible] = useState(true);
// //   const [modalOpened, setModalOpened] = useState(false);
// //   const [medicalReport, setMedicalReport] = useState<File | null>(null);
// //   const [error, setError] = useState<string | null>(null);
// //   const [showFile, setShowFile] = useState<string | null>(null); // For showing file name
// //   const router = useRouter();

// //   const form = useForm({
// //     initialValues: {
// //       height: '',
// //       heightUnit: 'cm',
// //       weight: '',
// //       weightUnit: 'kg',
// //       eyesight: '',
// //     },
// //     validate: {
// //       height: (value, values) => {
// //         const heightVal = parseFloat(value);
// //         const unit = values.heightUnit as 'cm' | 'in';
// //         if (value === '') return 'Height is required';
// //         if (isNaN(heightVal)) return 'Height must be a number';
// //         if (
// //           heightVal < AVIATION_STANDARDS.height[unit][0] ||
// //           heightVal > AVIATION_STANDARDS.height[unit][1]
// //         ) {
// //           return `Height should be between ${AVIATION_STANDARDS.height[unit][0]} and ${AVIATION_STANDARDS.height[unit][1]} ${unit}`;
// //         }
// //         return null;
// //       },
// //       weight: (value) => {
// //         const weightVal = parseFloat(value);
// //         if (value === '') return 'Weight is required';
// //         if (isNaN(weightVal)) return 'Weight must be a number';
// //         if (weightVal < AVIATION_STANDARDS.weight[0] || weightVal > AVIATION_STANDARDS.weight[1]) {
// //           return `Weight should be between ${AVIATION_STANDARDS.weight[0]} and ${AVIATION_STANDARDS.weight[1]} kg`;
// //         }
// //         return null;
// //       },
// //       eyesight: (value) => {
// //         const eyesightPattern = /^[0-9]+\/[0-9]+$/;
// //         if (value === '') return 'Eyesight is required';
// //         if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
// //         return null;
// //       },
// //     },
// //   });

// //   const checkEligibility = (values: typeof form.values) => {
// //     const heightVal = parseFloat(values.height);
// //     const weightVal = parseFloat(values.weight);
// //     const meetsStandards =
// //       heightVal >= AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'][0] &&
// //       heightVal <= AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'][1] &&
// //       weightVal >= AVIATION_STANDARDS.weight[0] &&
// //       weightVal <= AVIATION_STANDARDS.weight[1] &&
// //       values.eyesight >= AVIATION_STANDARDS.eyesight.min &&
// //       values.eyesight <= AVIATION_STANDARDS.eyesight.max;

// //     if (!meetsStandards) {
// //       setIsEligible(false);
// //       setModalOpened(true);
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (values: typeof form.values) => {
// //     if (!checkEligibility(values)) {
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append('height', values.height);
// //       formData.append('heightUnit', values.heightUnit);
// //       formData.append('weight', values.weight);
// //       formData.append('weightUnit', values.weightUnit);
// //       formData.append('eyesight', values.eyesight);

// //       if (medicalReport) {
// //         formData.append('medicalReport', medicalReport);
// //       }

// //       // Save to backend
// //       const response = await fetch('/api/medical-reports', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to save medical report');
// //       }

// //       // Redirect to verbal quiz after passing
// //       router.push('/verbal-quiz');
// //     } catch (error) {
// //       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
// //     }
// //   };

// //   const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
// //     const file = acceptedFiles[0];
// //     setMedicalReport(file);
// //     setShowFile(file.name);
// //   };

// //   return (
// //     <Box mx="auto" p="md" style={{ maxWidth: 600 }}>
// //       <form onSubmit={form.onSubmit(handleSubmit)}>
// //         <Grid>
// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Height"
// //               placeholder="Enter height"
// //               {...form.getInputProps('height')}
// //               error={form.errors.height}
// //               onBlur={() => form.validateField('height')}
// //             />
// //           </Grid.Col>
// //           <Grid.Col span={6}>
// //             <Select
// //               label="Height Unit"
// //               data={[
// //                 { value: 'cm', label: 'cm' },
// //                 { value: 'in', label: 'inches' },
// //               ]}
// //               {...form.getInputProps('heightUnit')}
// //             />
// //           </Grid.Col>

// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Weight"
// //               placeholder="Enter weight"
// //               {...form.getInputProps('weight')}
// //               error={form.errors.weight}
// //               onBlur={() => form.validateField('weight')}
// //             />
// //           </Grid.Col>
// //           <Grid.Col span={6}>
// //             <Select
// //               label="Weight Unit"
// //               data={[
// //                 { value: 'kg', label: 'kg' },
// //                 { value: 'lbs', label: 'lbs' },
// //               ]}
// //               {...form.getInputProps('weightUnit')}
// //             />
// //           </Grid.Col>

// //           <Grid.Col span={6}>
// //             <TextInput
// //               label="Eyesight"
// //               placeholder="e.g. 20/20"
// //               {...form.getInputProps('eyesight')}
// //               error={form.errors.eyesight}
// //               onBlur={() => form.validateField('eyesight')}
// //             />
// //           </Grid.Col>
// //         </Grid>

// //         <Box mt="md" p="md" style={{ border: '2px dashed #ccc', borderRadius: '8px' }}>
// //           <Dropzone
// //             onDrop={handleFileDrop}
// //             accept={['application/pdf']}
// //           >
// //             <Group justify="center" flex="column" style={{ textAlign: 'center', minHeight: 100 }}>
// //               {showFile ? (
// //                 <>
// //                   <IconFile size={24} />
// //                   <Text>{showFile}</Text>
// //                 </>
// //               ) : (
// //                 <>
// //                   <IconUpload size={24} />
// //                   <Text>Upload Medical Report (Optional)</Text>
// //                 </>
// //               )}
// //             </Group>
// //           </Dropzone>
// //         </Box>

// //         {error && <Notification color="red">{error}</Notification>}

// //         <Button type="submit" mt="md" fullWidth>
// //           Submit
// //         </Button>
// //       </form>

// //       <Modal opened={!isEligible && modalOpened} onClose={() => setModalOpened(false)} title="Ineligible">
// //         <Group justify="center" flex="column">
// //           <IconMoodSad size={48} color="red" />
// //           <Text>You are not eligible to be an aviator based on the entered data.</Text>
// //           <Button color="red" onClick={() => router.push('/')}>
// //             Return to Home
// //           </Button>
// //         </Group>
// //       </Modal>

// //       <Modal
// //         opened={!medicalReport && modalOpened}
// //         onClose={() => setModalOpened(false)}
// //         title="Missing Report"
// //       >
// //         <Group justify="center" flex="column">
// //           <Text>
// //             Please upload your medical report. You must submit it within 7 days.
// //           </Text>
// //           <Button color="blue" onClick={() => setModalOpened(false)}>
// //             OK
// //           </Button>
// //         </Group>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default MedicalValidationForm;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useForm } from '@mantine/form';
// import { useRouter } from 'next/navigation';
// import {
//   Button,
//   TextInput,
//   Select,
//   Group,
//   Grid,
//   Box,
//   Text,
//   Modal,
//   Notification,
// } from '@mantine/core';
// import { Dropzone, FileWithPath } from '@mantine/dropzone';
// import '@mantine/dropzone/styles.css';
// import { IconMoodSad, IconUpload, IconFile } from '@tabler/icons-react';

// const AVIATION_STANDARDS = {
//   height: { cm: [150, 200], in: [59, 79] },
//   weight: [50, 100],
//   eyesight: { min: '20/30', max: '20/20' },
// };

// const MedicalValidationForm = () => {
//   const [isEligible, setIsEligible] = useState(true);
//   const [modalType, setModalType] = useState<'ineligible' | 'missingReport' | null>(null);
//   const [medicalReport, setMedicalReport] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [showFile, setShowFile] = useState<string | null>(null);
//   const router = useRouter();

//   const form = useForm({
//     initialValues: {
//       height: '',
//       heightUnit: 'cm',
//       weight: '',
//       weightUnit: 'kg',
//       eyesight: '',
//     },
//     validateInputOnChange: true,  // Immediate validation on value change
//     validateInputOnBlur: true,    // Validate field when losing focus
//     validate: {
//       height: (value, values) => {
//         const heightVal = parseFloat(value);
//         const unit = values.heightUnit as 'cm' | 'in';
//         if (value === '') return 'Height is required';
//         if (isNaN(heightVal)) return 'Height must be a number';
//         if (
//           heightVal < AVIATION_STANDARDS.height[unit][0] ||
//           heightVal > AVIATION_STANDARDS.height[unit][1]
//         ) {
//           return `Height should be between ${AVIATION_STANDARDS.height[unit][0]} and ${AVIATION_STANDARDS.height[unit][1]} ${unit}`;
//         }
//         return null;
//       },
//       weight: (value) => {
//         const weightVal = parseFloat(value);
//         if (value === '') return 'Weight is required';
//         if (isNaN(weightVal)) return 'Weight must be a number';
//         if (weightVal < AVIATION_STANDARDS.weight[0] || weightVal > AVIATION_STANDARDS.weight[1]) {
//           return `Weight should be between ${AVIATION_STANDARDS.weight[0]} and ${AVIATION_STANDARDS.weight[1]} kg`;
//         }
//         return null;
//       },
//       eyesight: (value) => {
//         const eyesightPattern = /^[0-9]+\/[0-9]+$/;
//         if (value === '') return 'Eyesight is required';
//         if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
//         // No range validation as eyesight string comparison needs refinement
//         return null;
//       },
//     },
//   });

//   useEffect(() => {
//     form.validateField('height');
//     form.validateField('weight');
//   }, [form.values.heightUnit, form.values.weightUnit]);

//   const checkEligibility = (values: typeof form.values) => {
//     const heightVal = parseFloat(values.height);
//     const weightVal = parseFloat(values.weight);
//     const heightRange = AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'];

//     // Assuming the eyesight range needs to be a comparison, but it's tricky for vision ranges.
//     const eyesightComparison = values.eyesight === AVIATION_STANDARDS.eyesight.max;

//     const meetsStandards =
//       heightVal >= heightRange[0] &&
//       heightVal <= heightRange[1] &&
//       weightVal >= AVIATION_STANDARDS.weight[0] &&
//       weightVal <= AVIATION_STANDARDS.weight[1] &&
//       eyesightComparison;

//     if (!meetsStandards) {
//       setIsEligible(false);
//       setModalType('ineligible');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (values: typeof form.values) => {
//     if (!checkEligibility(values)) {
//       return;
//     }

//     if (!medicalReport) {
//       setModalType('missingReport');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('height', values.height);
//       formData.append('heightUnit', values.heightUnit);
//       formData.append('weight', values.weight);
//       formData.append('weightUnit', values.weightUnit);
//       formData.append('eyesight', values.eyesight);
//       formData.append('medicalReport', medicalReport);

//       const response = await fetch('/https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/createMedicalDetails', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save medical report');
//       }

//       router.push('/verbal-quiz');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
//     }
//   };

//   const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
//     const file = acceptedFiles[0];
//     setMedicalReport(file);
//     setShowFile(file.name);
//   };

//   const closeModal = () => setModalType(null);

//   return (
//     <Box mx="auto" p="md" style={{ maxWidth: 600 }}>
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Grid>
//           <Grid.Col span={6}>
//             <TextInput
//               label="Height"
//               placeholder="Enter height"
//               {...form.getInputProps('height')}
//               error={form.errors.height}
//             />
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Select
//               label="Height Unit"
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
//             />
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Select
//               label="Weight Unit"
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
//             />
//           </Grid.Col>
//         </Grid>

//         <Box mt="md" p="md" style={{ border: '2px dashed #ccc', borderRadius: '8px' }}>
//           <Dropzone
//             onDrop={handleFileDrop}
//             accept={['application/pdf']}
//           >
//             <Group justify="center" flex="column" style={{ textAlign: 'center', minHeight: 100 }}>
//               {showFile ? (
//                 <>
//                   <IconFile size={24} />
//                   <Text>{showFile}</Text>
//                 </>
//               ) : (
//                 <>
//                   <IconUpload size={24} />
//                   <Text>Upload Medical Report (Optional)</Text>
//                 </>
//               )}
//             </Group>
//           </Dropzone>
//         </Box>

//         {error && <Notification color="red">{error}</Notification>}

//         <Button type="submit" mt="md" fullWidth>
//           Submit
//         </Button>
//       </form>

//       <Modal opened={modalType === 'ineligible'} onClose={closeModal} title="Ineligible">
//         <Group justify="center" flex="column">
//           <IconMoodSad size={48} color="red" />
//           <Text>You are not eligible to be an aviator based on the entered data.</Text>
//           <Button color="red" onClick={() => router.push('/')}>
//             Return to Home
//           </Button>
//         </Group>
//       </Modal>

//       <Modal opened={modalType === 'missingReport'} onClose={closeModal} title="Missing Report">
//         <Group justify="center" flex="column">
//           <Text>You need to upload a medical report.</Text>
//           <Button onClick={closeModal}>Close</Button>
//         </Group>
//       </Modal>
//     </Box>
//   );
// };

// export default MedicalValidationForm;
'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import {
  Button,
  TextInput,
  Select,
  Group,
  Grid,
  Box,
  Text,
  Modal,
  Notification,
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { IconMoodSad, IconUpload, IconFile } from '@tabler/icons-react';

const AVIATION_STANDARDS = {
  height: { cm: [150, 200], in: [59, 79] },
  weight: [50, 100],
  eyesight: { min: '20/30', max: '20/20' },
};

const MedicalFitnessForm = () => {
  const [isEligible, setIsEligible] = useState(true);
  const [modalType, setModalType] = useState<'ineligible' | 'missingReport' | null>(null);
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFile, setShowFile] = useState<string | null>(null);
  const router = useRouter();

  // Updated form validation to include basic constraints
  const form = useForm({
    initialValues: {
      height: '',
      heightUnit: 'cm',
      weight: '',
      weightUnit: 'kg',
      eyesight: '',
    },
    validate: {
      height: (value, values) => {
        const heightVal = parseFloat(value);
        const unit = values.heightUnit as 'cm' | 'in';

        if (value === '') return 'Height is required';
        if (isNaN(heightVal)) return 'Height must be a number';

        // Basic validation ranges (not based on aviation standards)
        const minHeight = unit === 'cm' ? 50 : 20;  // cm: minimum 50, in: minimum 20
        const maxHeight = unit === 'cm' ? 250 : 100;  // cm: max 250, in: max 100
        if (heightVal < minHeight || heightVal > maxHeight) {
          return `Height should be between ${minHeight} and ${maxHeight} ${unit}`;
        }

        return null;  // Valid value
      },
      weight: (value) => {
        const weightVal = parseFloat(value);
        if (value === '') return 'Weight is required';
        if (isNaN(weightVal)) return 'Weight must be a number';

        // Basic validation ranges (not based on aviation standards)
        if (weightVal < 20 || weightVal > 200) {
          return 'Weight should be between 20 and 200 kg';
        }

        return null;  // Valid value
      },
      eyesight: (value) => {
        const eyesightPattern = /^[0-9]+\/[0-9]+$/;
        if (value === '') return 'Eyesight is required';
        if (!eyesightPattern.test(value)) return 'Please enter a valid eyesight (e.g., 20/20)';
        return null;
      },
    },
  });

  useEffect(() => {
    // Revalidate height and weight fields when units change
    form.validateField('height');
    form.validateField('weight');
  }, [form.values.heightUnit, form.values.weightUnit]);

  // Function to check if the user is eligible based on aviation standards
  const checkEligibility = (values: typeof form.values) => {
    const heightVal = parseFloat(values.height);
    const weightVal = parseFloat(values.weight);
    const heightRange = AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'];

    const eyesightComparison = values.eyesight === AVIATION_STANDARDS.eyesight.max;

    // Compare values to strict aviation standards (after basic validation is passed)
    const meetsStandards =
      heightVal >= heightRange[0] &&
      heightVal <= heightRange[1] &&
      weightVal >= AVIATION_STANDARDS.weight[0] &&
      weightVal <= AVIATION_STANDARDS.weight[1] &&
      eyesightComparison;

    if (!meetsStandards) {
      setIsEligible(false);
      setModalType('ineligible');
      return false;
    }

    return true;
  };

  const handleSubmit = async (values: typeof form.values) => {

    if (!checkEligibility(values)) {
      return;
    }

    if (!medicalReport) {
      setModalType('missingReport');
      
      return;
    }

    
    submitForm(values);
  };

  const submitForm = async (values: typeof form.values) => {
    try {
      const formData = new FormData();
      formData.append('height', values.height);
      formData.append('heightUnit', values.heightUnit);
      formData.append('weight', values.weight);
      formData.append('weightUnit', values.weightUnit);
      formData.append('eyesight', values.eyesight);

      if (medicalReport) {
        formData.append('medicalReport', medicalReport);
      }

      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/createMedicalDetails', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save medical report');
      }

      router.push('/userRender/verbal');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setMedicalReport(file);
    setShowFile(file.name);
  };

  const closeModal = () => setModalType(null);

  return (
    <Box mx="auto" p="md" style={{ maxWidth: 600 }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Height"
              placeholder="Enter height"
              {...form.getInputProps('height')}
              error={form.errors.height}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Height Unit"
              data={[
                { value: 'cm', label: 'cm' },
                { value: 'in', label: 'inches' },
              ]}
              {...form.getInputProps('heightUnit')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Weight"
              placeholder="Enter weight"
              {...form.getInputProps('weight')}
              error={form.errors.weight}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Weight Unit"
              data={[
                { value: 'kg', label: 'kg' },
                { value: 'lbs', label: 'lbs' },
              ]}
              {...form.getInputProps('weightUnit')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Eyesight"
              placeholder="e.g. 20/20"
              {...form.getInputProps('eyesight')}
              error={form.errors.eyesight}
            />
          </Grid.Col>
        </Grid>

        <Box mt="md" p="md" style={{ border: '2px dashed #ccc', borderRadius: '8px' }}>
          <Dropzone
            onDrop={handleFileDrop}
            accept={['application/pdf']}
          >
            <Group justify="center" flex="column" style={{ textAlign: 'center', minHeight: 100 }}>
              {showFile ? (
                <>
                  <IconFile size={24} />
                  <Text>{showFile}</Text>
                </>
              ) : (
                <>
                  <IconUpload size={24} />
                  <Text>Upload Medical Report (Optional)</Text>
                </>
              )}
            </Group>
          </Dropzone>
        </Box>

        {error && <Notification color="red">{error}</Notification>}

        <Button type="submit" mt="md" fullWidth>
          Submit
        </Button>
      </form>

      
<Modal opened={modalType === 'missingReport'} onClose={closeModal} title="Reminder">
  <Text>You did not upload a medical report. You can submit it later, but please remember to do so within 7 days.</Text>
  <Group align="right" mt="md">
    <Button
      onClick={() => {
        setModalType(null);
        submitForm(form.values); 
      }}
    >
      Continue Submission
    </Button>
  </Group>
</Modal>


      {/* Modal for ineligible status */}
      <Modal opened={modalType === 'ineligible'} onClose={closeModal} title="Ineligible">
        <Group justify="center" flex="column">
          <IconMoodSad size={48} color="red" />
          <Text>You are not eligible to be an aviator based on the provided details.</Text>
          <Button color="red" onClick={() => router.push('/')}>
            Return to Home
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};
export default MedicalFitnessForm