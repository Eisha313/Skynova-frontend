
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/context/userContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ReportData {
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  eyesight: string;
  verbalScore: number;
  nonverbalScore: number;
  verbalTotal: number;
  nonverbalTotal: number;
}

const QuizReport: React.FC = () => {
  const { _id, token } = useUser();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/finalReports/viewReport`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          
        
          const firstReport = data[0]; 

          if (firstReport) {
            const formattedReport: ReportData = {
              height: firstReport.medicalDetails.height,
              heightUnit: firstReport.medicalDetails.heightUnit,
              weight: firstReport.medicalDetails.weight,
              weightUnit: firstReport.medicalDetails.weightUnit,
              eyesight: firstReport.medicalDetails.eyesight,
              verbalScore: firstReport.verbalQuizResult.marks,
              nonverbalScore: firstReport.nonVerbalQuizResult.marks,
              verbalTotal: 2, 
              nonverbalTotal: 2, 
            };

            setReportData(formattedReport);
            calculateStatus(formattedReport);
          } else {
            setStatus("No report data found.");
          }
        } else {
          setStatus("Failed to fetch report.");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        setStatus("Error fetching report data.");
      }
    };

    fetchReportData();
  }, [token]);

  const calculateStatus = (data: ReportData) => {
    const verbalPercentage = (data.verbalScore / data.verbalTotal) * 100;
    const nonverbalPercentage = (data.nonverbalScore / data.nonverbalTotal) * 100;

    if (verbalPercentage >= 50 && nonverbalPercentage >= 50) {
      setStatus("Pass");
    } else {
      setStatus("Fail");
    }
  };

  const handleDownloadPdf = async () => {
    const reportElement = document.getElementById("report-content");
    if (!reportElement) return;

    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("quiz_report.pdf");
  };

  if (!reportData) {
    return <div>{status}</div>;
  }

  return (
    <div className="bg-[#081839]p-8 min-h-screen flex flex-col items-center justify-center">
  <div
    id="report-content"
    className="bg-[#212C44] p-8 rounded-lg shadow-xl w-full max-w-4xl space-y-6"
  >
    
    <h1 className="text-3xl font-extrabold text-center text-white mb-8">
      Competency Evaluation Report
    </h1>

    
    <div className=" p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Personal Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-lg text-[#A6A6A6]">
          <span className="font-medium">Height:</span> {reportData.height}{" "}
          {reportData.heightUnit}
        </p>
        <p className="text-lg text-[#A6A6A6]">
          <span className="font-medium">Weight:</span> {reportData.weight}{" "}
          {reportData.weightUnit}
        </p>
        <p className="text-lg text-[#A6A6A6] col-span-2">
          <span className="font-medium">Eyesight:</span> {reportData.eyesight}
        </p>
      </div>
    </div>

    
    <div className=" p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-white mb-4">Quiz Results</h2>
      <div className="grid grid-cols-2 gap-6">
       
        <div>
          <h3 className="text-xl font-medium text-white mb-2">Verbal Quiz</h3>
          <p className="text-lg text-[#A6A6A6]">
            <span className="font-semibold">Score:</span>{" "}
            {reportData.verbalScore}/{reportData.verbalTotal}
          </p>
          <p className="text-lg text-[#A6A6A6]">
            <span className="font-semibold">Percentage:</span>{" "}
            {((reportData.verbalScore / reportData.verbalTotal) * 100).toFixed(2)}%
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-medium text-white mb-2">Nonverbal Quiz</h3>
          <p className="text-lg text-[#A6A6A6] ">
            <span className="font-semibold">Score:</span>{" "}
            {reportData.nonverbalScore}/{reportData.nonverbalTotal}
          </p>
          <p className="text-lg text-[#A6A6A6]">
            <span className="font-semibold">Percentage:</span>{" "}
            {((reportData.nonverbalScore / reportData.nonverbalTotal) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>


    <div className=" p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-white mb-2">Status</h2>
      <p className="text-xl text-blue-500">{status}</p>
    </div>
  </div>

 
  <button
    onClick={handleDownloadPdf}
    className="mt-8 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
  >
    Download PDF
  </button>
</div>
  )
};

export default QuizReport;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@/app/components/context/userContext";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// interface ReportData {
//   height: string;
//   heightUnit: string;
//   weight: string;
//   weightUnit: string;
//   eyesight: string;
//   verbalQuizzes: { score: number; totalQuestions: number }[];
//   nonverbalQuizzes: { score: number; totalQuestions: number }[];
// }

// const QuizReport: React.FC = () => {
//   const { token } = useUser();
//   const [reportData, setReportData] = useState<ReportData | null>(null);
//   const [status, setStatus] = useState<string>("Loading...");

//   useEffect(() => {
//     const fetchReportData = async () => {
//       try {
//         const response = await fetch(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/finalReports/viewReport`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           const firstReport = data[0];

//           if (firstReport) {
//             const formattedReport: ReportData = {
//               height: firstReport.medicalDetails.height,
//               heightUnit: firstReport.medicalDetails.heightUnit,
//               weight: firstReport.medicalDetails.weight,
//               weightUnit: firstReport.medicalDetails.weightUnit,
//               eyesight: firstReport.medicalDetails.eyesight,
//               verbalQuizzes: firstReport.verbalQuizResults.map((quiz: any) => ({
//                 score: quiz.marks,
//                 totalQuestions: quiz.questions.length, // Fetch dynamic question count
//               })),
//               nonverbalQuizzes: firstReport.nonVerbalQuizResults.map((quiz: any) => ({
//                 score: quiz.marks,
//                 totalQuestions: quiz.questions.length,
//               })),
//             };

//             setReportData(formattedReport);
//             calculateStatus(formattedReport);
//           } else {
//             setStatus("No report data found.");
//           }
//         } else {
//           setStatus("Failed to fetch report.");
//         }
//       } catch (error) {
//         console.error("Error fetching report data:", error);
//         setStatus("Error fetching report data.");
//       }
//     };

//     fetchReportData();
//   }, [token]);

//   const calculateStatus = (data: ReportData) => {
//     const totalVerbalScore = data.verbalQuizzes.reduce(
//       (sum, quiz) => sum + (quiz.score / quiz.totalQuestions) * 100,
//       0
//     );
//     const totalNonverbalScore = data.nonverbalQuizzes.reduce(
//       (sum, quiz) => sum + (quiz.score / quiz.totalQuestions) * 100,
//       0
//     );
//     const verbalPercentage = totalVerbalScore / data.verbalQuizzes.length;
//     const nonverbalPercentage = totalNonverbalScore / data.nonverbalQuizzes.length;

//     if (verbalPercentage >= 50 && nonverbalPercentage >= 50) {
//       setStatus("PASS");
//     } else {
//       setStatus("FAIL");
//     }
//   };

//   const handleDownloadPdf = async () => {
//     const reportElement = document.getElementById("report-content");
//     if (!reportElement) return;

//     const canvas = await html2canvas(reportElement);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 210;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//     pdf.save("quiz_report.pdf");
//   };

//   if (!reportData) {
//     return <div>{status}</div>;
//   }

//   return (
//     <div className="bg-gray-900 p-8 min-h-screen flex flex-col items-center justify-center text-white">
//       <div
//         id="report-content"
//         className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl space-y-6"
//       >
//         <h1 className="text-3xl font-extrabold text-center text-white mb-8">
//           Evaluation Report
//         </h1>

//         <div className="bg-gray-700 p-6 rounded-md shadow-sm">
//           <h2 className="text-2xl font-semibold text-white mb-4">
//             Personal Information
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             <p className="text-lg">
//               <span className="font-medium">Height:</span> {reportData.height} {reportData.heightUnit}
//             </p>
//             <p className="text-lg">
//               <span className="font-medium">Weight:</span> {reportData.weight} {reportData.weightUnit}
//             </p>
//             <p className="text-lg col-span-2">
//               <span className="font-medium">Eyesight:</span> {reportData.eyesight}
//             </p>
//           </div>
//         </div>

//         <div className="bg-gray-700 p-6 rounded-md shadow-sm">
//           <h2 className="text-2xl font-semibold text-white mb-4">Quiz Tests</h2>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-xl font-medium text-gray-300 mb-2">Verbal Quizzes</h3>
//               {reportData.verbalQuizzes.map((quiz, index) => (
//                 <div key={index} className="mb-4">
//                   <p>
//                     <span className="font-semibold">Score:</span> {quiz.score}/{quiz.totalQuestions}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Percentage:</span> {((quiz.score / quiz.totalQuestions) * 100).toFixed(2)}%
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h3 className="text-xl font-medium text-gray-300 mb-2">Nonverbal Quizzes</h3>
//               {reportData.nonverbalQuizzes.map((quiz, index) => (
//                 <div key={index} className="mb-4">
//                   <p>
//                     <span className="font-semibold">Score:</span> {quiz.score}/{quiz.totalQuestions}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Percentage:</span> {((quiz.score / quiz.totalQuestions) * 100).toFixed(2)}%
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-700 p-6 rounded-md shadow-sm">
//           <h2 className="text-2xl font-semibold text-white mb-2">Status</h2>
//           <p className="text-xl font-bold">{status}</p>
//         </div>
//       </div>

//       <button
//         onClick={handleDownloadPdf}
//         className="mt-8 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default QuizReport;
