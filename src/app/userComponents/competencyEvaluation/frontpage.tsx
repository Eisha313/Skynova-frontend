"use client";
import { Stepper, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/components/context/userContext";
import MedicalFitnessForm from "@/app/components/competency/form";
import QuizContainer from "../verbal/main";
import QuizContainerr from "../nonverbal/main";

interface CompetencyEvaluationProps {
  id: string;
}
interface QuizResult {
  quizId: {
    _id: string;
  };
}

const CompetencyEvaluation = ({ id }: CompetencyEvaluationProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [verbalCompleted, setVerbalCompleted] = useState(false);
  const [nonVerbalCompleted, setNonVerbalCompleted] = useState(false);
  const router = useRouter();
  const { token, _id } = useUser();
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        let formResponse = null;
        let verbalResponse = null;
        let nonVerbalResponse = null;

        formResponse = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (id) {
          verbalResponse = await fetch(
            `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          nonVerbalResponse = await fetch(
            `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
        }

        if (!formResponse.ok || (id && !verbalResponse?.ok) || (id && !nonVerbalResponse?.ok)) {
          throw new Error("Failed to fetch one or more status updates.");
        }

        let formData = await formResponse.json();
        const verbalData = id ? await verbalResponse?.json() : {};
        const nonVerbalData = id ? await nonVerbalResponse?.json() : {};

        if (formData.length) {
          // formData = formData.find((item: any) => item.userId?._id === _id);
          formData = formData?.filter((item: any) => item.userId?._id === _id);
          // Get the latest form data
          formData = formData[formData.length - 1];
          console.log(formData);
        }

        setFormCompleted(!!formData);
        setFormData(formData);
        setVerbalCompleted(verbalData.verbalCompleted);
        setNonVerbalCompleted(nonVerbalData.nonVerbalCompleted);

        let newActiveStep = 0;
        if (!!formData) newActiveStep = 1;
        if (formData.formCompleted && verbalData.verbalCompleted) newActiveStep = 2;
        if (formData.formCompleted && verbalData.verbalCompleted && nonVerbalData.nonVerbalCompleted) newActiveStep = 3;

        setActiveStep(newActiveStep);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    if (token) {
      fetchStatus();
    }
  }, [id, token]);

  const goToNextStep = () => {
    if (activeStep === 0) {
      setFormCompleted(true);
    }
    if (activeStep === 1) {
      setVerbalCompleted(true);
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="flex flex-col items-center   mt-15 " style={{ backgroundColor: "#081839", color: "#A49898" }}>
      <Stepper className="mt-30" active={activeStep} onStepClick={setActiveStep} size="lg">
        <Stepper.Step
          label="Evaluation Form"
          // description="Submit evaluation details"
        />
        <Stepper.Step
          label="Verbal Test"
          // description="Complete verbal test"
        />
        <Stepper.Step
          label="Non-Verbal Test"
          // description="Complete non-verbal test"
        />
        <Stepper.Completed>Evaluation Completed</Stepper.Completed>
      </Stepper>

      <div className="mt-6 w-[60%] lg:w-[40%] mx-auto rounded-md">
        {activeStep === 0 && (
          <MedicalFitnessForm goToNextStep={goToNextStep} formData={formData} formCompleted={formCompleted}
          setFormCompleted={setFormCompleted} setFormData={setFormData}
          />
        )}
        {activeStep === 1 && formCompleted && <QuizContainer goToNextStep={goToNextStep} />}
        {activeStep === 2 && formCompleted && verbalCompleted && <QuizContainerr goToNextStep={goToNextStep} />}
      </div>

      {activeStep === 3 && (
        <div>
          <Button onClick={() => router.push("/userRender/report")} color="yellow" className="mt-4">
            Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompetencyEvaluation;

// 