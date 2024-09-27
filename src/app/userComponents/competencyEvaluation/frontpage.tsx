'use client';
import { Stepper, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/components/context/userContext'; 
import MedicalFitnessForm from '@/app/components/competency/form';
import QuizContainer from '../verbal/main';

interface CompetencyEvaluationProps {
  id: string;
}

const CompetencyEvaluation = ({ id }: CompetencyEvaluationProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [verbalCompleted, setVerbalCompleted] = useState(false);
  const [nonVerbalCompleted, setNonVerbalCompleted] = useState(false);
  const router = useRouter();
  const { token } = useUser();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
       
        const formResponse = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails${id}`, 
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        const verbalResponse = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`, 
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        const nonVerbalResponse = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, 
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

       
        if (!formResponse.ok || !verbalResponse.ok || !nonVerbalResponse.ok) {
          throw new Error('Failed to fetch one or more status updates.');
        }

        const formData = await formResponse.json();
        const verbalData = await verbalResponse.json();
        const nonVerbalData = await nonVerbalResponse.json();

    
        setFormCompleted(formData.formCompleted);
        setVerbalCompleted(verbalData.verbalCompleted);
        setNonVerbalCompleted(nonVerbalData.nonVerbalCompleted);

      
        if (formData.formCompleted) setActiveStep(1);
        if (formData.formCompleted && verbalData.verbalCompleted) setActiveStep(2);
        if (formData.formCompleted && verbalData.verbalCompleted && nonVerbalData.nonVerbalCompleted) setActiveStep(3);

      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    if (id && token) {
      fetchStatus();
    }
  }, [id, token]);

  const handleNextStep = () => {
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  };
  const goToNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleSubmitEvaluationForm = () => {
  //  router.push(`/competencyEvaluation/competency`)
    handleNextStep();
  };

  const handleVerbalTest = () => {
    // router.push(`/userRender/verbal/${id}/attempt`);
  };

  const handleNonVerbalTest = () => {
    // router.push(`/userRender/nonverbal/${id}/attempt`);
  };

  return (
    <div className="flex flex-col items-center mt-30 ">
      <Stepper className=" mt-30 " active={activeStep} onStepClick={setActiveStep} size="lg">
        <Stepper.Step label="Evaluation Form" description="Submit evaluation details" />
        <Stepper.Step label="Verbal Test" description="Complete verbal test" />
        <Stepper.Step label="Non-Verbal Test" description="Complete non-verbal test" />
        <Stepper.Completed>Evaluation Completed</Stepper.Completed>
      </Stepper>

      <div className="mt-6">
        {activeStep === 0 && !formCompleted && (
          // <Button onClick={handleSubmitEvaluationForm} color="green">
             <MedicalFitnessForm goToNextStep={goToNextStep} />
        )}
        {/* {activeStep === 1 && formCompleted && !verbalCompleted && ( */}
        {activeStep === 1  && (
          
                  <QuizContainer goToNextStep={goToNextStep} />
          
        )}
        {/* {activeStep === 2 && formCompleted && verbalCompleted && !nonVerbalCompleted && ( */}
        {activeStep === 2 && (
          // <Button onClick={handleNonVerbalTest} color="blue">
          <Button onClick={()=>{
            setActiveStep((prev)=>prev+1)
          }} color="green">           <QuizContainer goToNextStep={goToNextStep} />
          </Button>
        )}
      </div>

      {activeStep === 3 && (
        <Button onClick={() => router.push('/report')} color="yellow" className="mt-4">
          View Report
        </Button>
      )}
    </div>
  );
};

export default CompetencyEvaluation;

