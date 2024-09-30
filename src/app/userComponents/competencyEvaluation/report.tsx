"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/context/userContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ReportData {
  height: number;
  heightUnit: string;
  weight: number;
  weightUnit: string;
  eyesight: string;
  verbalScore: number;
  nonverbalScore: number;
  verbalTotal: number;
  nonverbalTotal: number;
}

const QuizReport: React.FC = () => {
  const { _id, token } = useUser(); // Assuming you're using userContext for the logged-in user's ID and token
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/finalReports/viewFinalReports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming the report data is in the format you need.
          const report = data?.[0]; // Extract the first report (adjust based on response structure)
          setReportData(report);
          calculateStatus(report);
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
      <div id="report-content" className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Quiz Report</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Personal Information:</h2>
          <p>Height: {reportData.height} {reportData.heightUnit}</p>
          <p>Weight: {reportData.weight} {reportData.weightUnit}</p>
          <p>Eyesight: {reportData.eyesight}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Quiz Results:</h2>
          <p>Verbal Quiz Score: {reportData.verbalScore}/{reportData.verbalTotal}</p>
          <p>Verbal Quiz Percentage: {(reportData.verbalScore / reportData.verbalTotal) * 100}%</p>
          <p>Nonverbal Quiz Score: {reportData.nonverbalScore}/{reportData.nonverbalTotal}</p>
          <p>Nonverbal Quiz Percentage: {(reportData.nonverbalScore / reportData.nonverbalTotal) * 100}%</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Status: {status}</h2>
        </div>
      </div>

      <button
        onClick={handleDownloadPdf}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default QuizReport;
