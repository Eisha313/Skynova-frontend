
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
import Link from 'next/link';
import { useUser } from '@/app/components/context/userContext';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { IconMoodSad, IconUpload, IconFile } from '@tabler/icons-react';


const AVIATION_STANDARDS = {
  height: { cm: [150, 200], in: [59, 79] },
  weight: [50, 100],
  eyesight: { min: '20/30', max: '20/20' },
};

interface MedicalFitnessFormProps {
  goToNextStep: () => void; 
}
const MedicalFitnessForm: React.FC<MedicalFitnessFormProps> = ({ goToNextStep }) => {
  const [isEligible, setIsEligible] = useState(true);
  const [modalType, setModalType] = useState<'ineligible' | 'missingReport' | null>(null);
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFile, setShowFile] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useUser();

 
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

        
        const minHeight = unit === 'cm' ? 50 : 20;  // cm: minimum 50, in: minimum 20
        const maxHeight = unit === 'cm' ? 250 : 100;  // cm: max 250, in: max 100
        if (heightVal < minHeight || heightVal > maxHeight) {
          return `Height should be between ${minHeight} and ${maxHeight} ${unit}`;
        }

        return null;
      },
      weight: (value) => {
        const weightVal = parseFloat(value);
        if (value === '') return 'Weight is required';
        if (isNaN(weightVal)) return 'Weight must be a number';

        
        if (weightVal < 20 || weightVal > 200) {
          return 'Weight should be between 20 and 200 kg';
        }

        return null;  
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
   
    form.validateField('height');
    form.validateField('weight');
  }, [form.values.heightUnit, form.values.weightUnit]);


  const checkEligibility = (values: typeof form.values) => {
    const heightVal = parseFloat(values.height);
    const weightVal = parseFloat(values.weight);
    const heightRange = AVIATION_STANDARDS.height[values.heightUnit as 'cm' | 'in'];

    const eyesightComparison = values.eyesight === AVIATION_STANDARDS.eyesight.max;


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
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body:formData,
          credentials: 'include',
        });
      
     

      if (!response.ok) {
        throw new Error('Failed to save medical report');
      }

      // router.push('/userRender/verbal');
      goToNextStep();
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
        <Link href={'/userRender/competency'}>
        <Button  mt="md" fullWidth>
          back
        </Button></Link>
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