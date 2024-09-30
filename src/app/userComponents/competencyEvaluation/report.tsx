
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
          
          // Assuming we're dealing with an array and taking the first report for display
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
              verbalTotal: 2, // Set your total marks for verbal
              nonverbalTotal: 2, // Set your total marks for nonverbal
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
    <div className="bg-gray-100 p-8 min-h-screen flex flex-col items-center justify-center">
  <div
    id="report-content"
    className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl space-y-6"
  >
    {/* Header */}
    <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
      Quiz Report
    </h1>

    {/* Personal Information */}
    <div className="bg-gray-50 p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Personal Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-lg text-gray-600">
          <span className="font-medium">Height:</span> {reportData.height}{" "}
          {reportData.heightUnit}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium">Weight:</span> {reportData.weight}{" "}
          {reportData.weightUnit}
        </p>
        <p className="text-lg text-gray-600 col-span-2">
          <span className="font-medium">Eyesight:</span> {reportData.eyesight}
        </p>
      </div>
    </div>

    {/* Quiz Results */}
    <div className="bg-gray-50 p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Results</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Verbal Quiz */}
        <div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Verbal Quiz</h3>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Score:</span>{" "}
            {reportData.verbalScore}/{reportData.verbalTotal}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Percentage:</span>{" "}
            {((reportData.verbalScore / reportData.verbalTotal) * 100).toFixed(2)}%
          </p>
        </div>

        {/* Nonverbal Quiz */}
        <div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Nonverbal Quiz</h3>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Score:</span>{" "}
            {reportData.nonverbalScore}/{reportData.nonverbalTotal}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Percentage:</span>{" "}
            {((reportData.nonverbalScore / reportData.nonverbalTotal) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>

    {/* Status */}
    <div className="bg-gray-50 p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Status</h2>
      <p className="text-lg text-gray-600">{status}</p>
    </div>
  </div>

  {/* Download Button */}
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
