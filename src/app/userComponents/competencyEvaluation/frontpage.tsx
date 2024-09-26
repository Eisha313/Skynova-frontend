
'use client'
import { Stepper, Button } from '@mantine/core'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CompetencyEvaluationProps {
  id: string;  
}

const CompetencyEvaluation = ({ id }: CompetencyEvaluationProps) => {
  const [activeStep, setActiveStep] = useState(0); 
  const router = useRouter();
  
  const handleNextStep = () => {
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  };
  
  const handleSubmitEvaluationForm = () => {
    
    handleNextStep();
  };

  const handleVerbalTest = () => {
    router.push(`/userRender/verbal/${id}/attempt`); 
  };

  const handleNonVerbalTest = () => {
    router.push(`/userRender/nonverbal/${id}/attempt`);  
  };

  return (
    <div className="flex flex-col items-center">
      <Stepper active={activeStep} onStepClick={setActiveStep} size="lg">
        <Stepper.Step label="Evaluation Form" description="Submit evaluation details" />
        <Stepper.Step label="Verbal Test" description="Complete verbal test" />
        <Stepper.Step label="Non-Verbal Test" description="Complete non-verbal test" />
        <Stepper.Completed>Evaluation Completed</Stepper.Completed>
      </Stepper>

      <div className="mt-6">
        {activeStep === 0 && (
          <Button onClick={handleSubmitEvaluationForm} color="green">Submit Evaluation Form</Button>
        )}
        {activeStep === 1 && (
          <Button onClick={handleVerbalTest} color="blue">Take Verbal Test</Button>
        )}
        {activeStep === 2 && (
          <Button onClick={handleNonVerbalTest} color="blue">Take Non-Verbal Test</Button>
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
