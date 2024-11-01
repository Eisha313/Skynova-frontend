// // 'use client';
// // import { Stepper, Button } from '@mantine/core';
// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useUser } from '@/app/components/context/userContext';
// // import MedicalFitnessForm from '@/app/components/competency/form';
// // import QuizContainer from '../verbal/main';
// // import QuizContainerr from '../nonverbal/main';

// // interface CompetencyEvaluationProps {
// //   id: string;
// // }

// // const CompetencyEvaluation = ({ id }: CompetencyEvaluationProps) => {
// //   const [activeStep, setActiveStep] = useState(0);
// //   const [formCompleted, setFormCompleted] = useState(false);
// //   const [verbalCompleted, setVerbalCompleted] = useState(false);
// //   const [nonVerbalCompleted, setNonVerbalCompleted] = useState(false);
// //   const router = useRouter();
// //   const { token } = useUser();

// //   // Fetching form and quiz status
// //   useEffect(() => {
// //     const fetchStatus = async () => {
// //       try {
// //         // Fetch form, verbal, and non-verbal data
// //         const formResponse = await fetch(
// //           `https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails${id}`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               'Content-Type': 'application/json',
// //             },
// //             credentials: 'include',
// //           }
// //         );

// //         const verbalResponse = await fetch(
// //           `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               'Content-Type': 'application/json',
// //             },
// //             credentials: 'include',
// //           }
// //         );

// //         const nonVerbalResponse = await fetch(
// //           `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               'Content-Type': 'application/json',
// //             },
// //             credentials: 'include',
// //           }
// //         );

// //         // Check for failed responses
// //         if (!formResponse.ok || !verbalResponse.ok || !nonVerbalResponse.ok) {
// //           throw new Error('Failed to fetch one or more status updates.');
// //         }

// //         // Get JSON data from responses
// //         const formData = await formResponse.json();
// //         const verbalData = await verbalResponse.json();
// //         const nonVerbalData = await nonVerbalResponse.json();

// //         // Update completion statuses
// //         setFormCompleted(formData.formCompleted);
// //         setVerbalCompleted(verbalData.verbalCompleted);
// //         setNonVerbalCompleted(nonVerbalData.nonVerbalCompleted);

// //         // Update the active step
// //         let newActiveStep = 0;
// //         if (formData.formCompleted) newActiveStep = 1;
// //         if (formData.formCompleted && verbalData.verbalCompleted) newActiveStep = 2;
// //         if (formData.formCompleted && verbalData.verbalCompleted && nonVerbalData.nonVerbalCompleted) newActiveStep = 3;

// //         setActiveStep(newActiveStep);
// //       } catch (error) {
// //         console.error('Error fetching status:', error);
// //       }
// //     };

// //     if (id && token) {
// //       fetchStatus();
// //     }
// //   }, [id, token]);

// //   // Function to proceed to the next step
// //   const goToNextStep = () => {
// //     if(activeStep===0){
// //       setFormCompleted(true);
// //     }
// //     if(activeStep===1){
// //       setVerbalCompleted(true);
// //     }
// //     setActiveStep((prevStep) => prevStep + 1);
// //   };

// //   return (
// //     <div className="flex flex-col items-center mt-30">
// //       <Stepper className="mt-30" active={activeStep} onStepClick={setActiveStep} size="lg">
// //         <Stepper.Step label="Evaluation Form" description="Submit evaluation details" />
// //         <Stepper.Step label="Verbal Test" description="Complete verbal test" />
// //         <Stepper.Step label="Non-Verbal Test" description="Complete non-verbal test" />
// //         <Stepper.Completed>Evaluation Completed</Stepper.Completed>
// //       </Stepper>

// //       <div className="mt-6">

// //         {activeStep === 0 && !formCompleted && (
// //           <MedicalFitnessForm goToNextStep={goToNextStep} />
// //         )}
// //         {activeStep === 1 && formCompleted  && (
// //           <QuizContainer goToNextStep={goToNextStep} />
// //         )}
// //         {activeStep === 2 && formCompleted && verbalCompleted &&  (
// //           <QuizContainerr goToNextStep={goToNextStep} />
// //         )}
// //       </div>

// //       {activeStep === 3 && (
// //         <Button onClick={() => router.push('/report')} color="yellow" className="mt-4">
// //           View Report
// //         </Button>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompetencyEvaluation;

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

        formResponse = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

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

        if (
          !formResponse.ok ||
          (id && !verbalResponse?.ok) ||
          (id && !nonVerbalResponse?.ok)
        ) {
          throw new Error("Failed to fetch one or more status updates.");
        }

        let formData = await formResponse.json();
        const verbalData = id ? await verbalResponse?.json() : {};
        const nonVerbalData = id ? await nonVerbalResponse?.json() : {};

        if (formData.length) {
          formData = formData.find((item: any) => item.userId?._id === _id);
          console.log(formData);
        }

        setFormCompleted(!!formData);
        setVerbalCompleted(verbalData.verbalCompleted);
        setNonVerbalCompleted(nonVerbalData.nonVerbalCompleted);

        let newActiveStep = 0;
        if (!!formData) newActiveStep = 1;
        if (formData.formCompleted && verbalData.verbalCompleted)
          newActiveStep = 2;
        if (
          formData.formCompleted &&
          verbalData.verbalCompleted &&
          nonVerbalData.nonVerbalCompleted
        )
          newActiveStep = 3;

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
    <div className="flex flex-col items-center mt-30">
      <Stepper
        className="mt-30"
        active={activeStep}
        onStepClick={setActiveStep}
        size="lg"
      >
        <Stepper.Step
          label="Evaluation Form"
          description="Submit evaluation details"
        />
        <Stepper.Step label="Verbal Test" description="Complete verbal test" />
        <Stepper.Step
          label="Non-Verbal Test"
          description="Complete non-verbal test"
        />
        <Stepper.Completed>Evaluation Completed</Stepper.Completed>
      </Stepper>

      <div className="mt-6 w-full">
        {activeStep === 0 && !formCompleted && (
          <MedicalFitnessForm goToNextStep={goToNextStep} />
        )}
        {activeStep === 1 && formCompleted && (
          <QuizContainer goToNextStep={goToNextStep} />
        )}
        {activeStep === 2 && formCompleted && verbalCompleted && (
          <QuizContainerr goToNextStep={goToNextStep} />
        )}
      </div>

      {activeStep === 3 && (
        <div>
          {/* <Button onClick={() => router.push(`/userRender/verbal/${id}/result`)} color="yellow" className="mt-4">
         View Verbal
       </Button>
  
         <Button onClick={() => router.push(`/userRender/nonverbal/${id}/result`)} color="yellow" className="mt-4">
         View Verbal Result
       </Button>  */}

          <Button
            onClick={() => router.push("/userRender/report")}
            color="yellow"
            className="mt-4"
          >
            Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompetencyEvaluation;

// import { Stepper, Button } from '@mantine/core';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/app/components/context/userContext';
// import MedicalFitnessForm from '@/app/components/competency/form';
// import QuizContainer from '../verbal/main';
// import QuizContainerr from '../nonverbal/main';

// interface CompetencyEvaluationProps {
//   id: string;
// }

// const CompetencyEvaluation = ({ id }: CompetencyEvaluationProps) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [verbalCompleted, setVerbalCompleted] = useState(false);
//   const [nonVerbalCompleted, setNonVerbalCompleted] = useState(false);
//   const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
//   const router = useRouter();
//   const { token } = useUser();

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const formResponse = await fetch(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/viewMedicalDetails${id}`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//           }
//         );

//         const verbalResponse = await fetch(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//           }
//         );

//         const nonVerbalResponse = await fetch(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//           }
//         );

//         if (!formResponse.ok || !verbalResponse.ok || !nonVerbalResponse.ok) {
//           throw new Error('Failed to fetch one or more status updates.');
//         }

//         const formData = await formResponse.json();
//         const verbalData = await verbalResponse.json();
//         const nonVerbalData = await nonVerbalResponse.json();

//         setFormCompleted(formData.formCompleted);
//         setVerbalCompleted(verbalData.verbalCompleted);
//         setNonVerbalCompleted(nonVerbalData.nonVerbalCompleted);

//         let newActiveStep = 0;
//         if (formData.formCompleted) newActiveStep = 1;
//         if (formData.formCompleted && verbalData.verbalCompleted) newActiveStep = 2;
//         if (formData.formCompleted && verbalData.verbalCompleted && nonVerbalData.nonVerbalCompleted) newActiveStep = 3;

//         setActiveStep(newActiveStep);
//       } catch (error) {
//         console.error('Error fetching status:', error);
//       }
//     };

//     if (id && token) {
//       fetchStatus();
//     }
//   }, [id, token]);

//   const goToNextStep = () => {
//     if (activeStep === 0) {
//       setFormCompleted(true);
//     }
//     if (activeStep === 1) {
//       setVerbalCompleted(true);
//     }
//     setActiveStep((prevStep) => prevStep + 1);
//   };
//   const handleQuizSelect = (id: string) => {
//     setSelectedQuizId(id);
//   };

//   const goBackToList = () => {
//     setSelectedQuizId(null);
//   };

//   return (
//     <div className="flex flex-col items-center mt-30">
//       <Stepper className="mt-30" active={activeStep} onStepClick={setActiveStep} size="lg">
//         <Stepper.Step label="Evaluation Form" description="Submit evaluation details" />
//         <Stepper.Step label="Verbal Test" description="Complete verbal test" />
//         <Stepper.Step label="Non-Verbal Test" description="Complete non-verbal test" />
//         <Stepper.Completed>Evaluation Completed</Stepper.Completed>
//       </Stepper>

//       <div className="mt-6">
//         {activeStep === 0 && !formCompleted && (
//           <MedicalFitnessForm goToNextStep={goToNextStep} />
//         )}
//         {activeStep === 1 && formCompleted && (
//           // <QuizContainer goToNextStep={goToNextStep} selectedQuizId={selectedQuizId} setSelectedQuizId={setSelectedQuizId} />
//           <QuizContainer
//           goToNextStep={goToNextStep}
//           selectedQuizId={selectedQuizId}
//           handleQuizSelect={handleQuizSelect}
//           goBackToList={goBackToList}
//         />
//         )}
//         {activeStep === 2 && formCompleted && verbalCompleted && (
//           // <QuizContainerr goToNextStep={goToNextStep} selectedQuizId={selectedQuizId} setSelectedQuizId={setSelectedQuizId} />
//           <QuizContainerr
//             goToNextStep={goToNextStep}
//             selectedQuizId={selectedQuizId}
//             handleQuizSelect={handleQuizSelect}
//             goBackToList={goBackToList}
//           />
//         )}
//       </div>

//       {activeStep === 3 && (
//         <div>
//           <Button onClick={() => router.push('/userRender/report')} color="yellow" className="mt-4">
//             Report
//           </Button>
//           <Button onClick={() => router.push(`/userRender/verbal/${id}/result`)} color="yellow" className="mt-4">
// //          View Verbal
// //        </Button>

// //          <Button onClick={() => router.push(`/userRender/nonverbal/${id}/result`)} color="yellow" className="mt-4">
// //          View Verbal Result
// //        </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompetencyEvaluation;
