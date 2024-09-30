// "use client";

// import { useRef, useState } from "react";
// import jsPDF from "jspdf";

// export default function PrivacyPolicy() {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [isAgreed, setIsAgreed] = useState<boolean | null>(null);
//   const downloadPDF = () => {
//     if (contentRef.current) {
//         const doc = new jsPDF("p", "pt", "a4");

//         const pdfPageWidth = doc.internal.pageSize.getWidth();

//         const margin = 20;

//         const contentWidth = pdfPageWidth - margin * 2 - 30;

//         doc.html(contentRef.current, {
//             callback: function (pdf) {
//                 pdf.save('PrivacyPolicy.pdf');
//             },
//             x: margin,
//             y: 20,
//             html2canvas: {
//                 scale: 0.75,
//                 useCORS: true,
//                 allowTaint: false,
//                 logging: true,
//                 width: contentWidth,
//                 height: contentRef.current.scrollHeight,
//             },
//         });
//     }
// };

//   const handleAgreement = (agree: boolean) => {
//     setIsAgreed(agree);
//   };

//   return (
//     <div className="flex w-full min-h-screen pt-24" style={{ margin: 0 }}>

//       <div
//         className="w-1/2 bg-cover bg-center h-[80vh]"
//         style={{ backgroundImage: "url('/privacy.png')" }}
//       ></div>

//       <div className="w-1/2 p-6 bg-white h-[80vh] overflow-y-auto custom-scrollbar">

//         <div ref={contentRef} className="w-full">

//           <h1
//             className="text-4xl font-extrabold text-center mb-8 mt-4 font-serif text-gray-800"
//             style={{ textAlign: "center" }}
//           >
//             Privacy Policy
//           </h1>

//           <div
//             className="text-gray-700 p-6 space-y-6 align-center"
//             style={{
//               fontSize: "15px",
//               lineHeight: "1.8",
//               fontFamily: '"Times New Roman", serif',
//             }}
//           >
//             <p>
//               <strong>Last Updated: September 28, 2024</strong>
//             </p>
//             <p>
//               At Skynova, we are committed to protecting and respecting your
//               privacy.This Privacy Policy outlines how we collect, use, and
//               safeguard your personal information when you interact with our
//               learning platform, which provides training, quizzes, missions, and
//               monitoring services aimed at improving the learning curve of
//               aviators.
//             </p>
//             <p>
//               By using Skynova, you agree to the collection and use of
//               information in accordance with this policy.
//             </p>
//             <h2 className="font-bold">1. Information We Collect</h2>
//             <h3>1.1 Personal Information</h3>
//             <p>
//               When you register on Skynova, we may collect personal information
//               including, but not limited to:
//             </p>
//             <ul className="list-disc ml-6">
//               <li>Full Name</li>
//               <li>Email Address</li>
//               <li>Training and Quiz Results</li>
//               <li>Mission Progress and Achievements</li>
//               <li>Certifications and Awards</li>
//               <li>
//                 Behavioral Monitoring Data (to assess compliance with platform
//                 standards)
//               </li>
//             </ul>
//             <h3>1.2 Usage Data</h3>
//             <p>
//               We automatically collect certain information about your device and
//               how you interact with Skynova, such as:
//             </p>
//             <ul className="list-disc ml-6">
//               <li>IP Address</li>
//               <li>Browser Type</li>
//               <li>Time Spent on Various Modules</li>
//               <li>
//                 Interaction with Quizzes, Missions, and Training Resources
//               </li>
//             </ul>
//             <h2 className="font-bold">2. How We Use Your Information</h2>
//             <p>
//               Skynova uses the information we collect in the following ways:
//             </p>
//             <ul className="list-disc ml-6">
//               <li>Training and Skill Assessment</li>
//               <li>Monitoring and Compliance</li>
//               <li>Certifications and Achievement Tracking</li>
//               <li>Platform Improvements</li>
//               <li>Communication</li>
//             </ul>
//             <h2 className="font-bold">
//               3. Certification and Misconduct Policy
//             </h2>{" "}
//             <p>
//               {" "}
//               Skynova takes academic integrity and professionalism seriously.
//               Misconduct will result in certificate revocation and potential
//               blocking.
//             </p>
//             <h2 className="font-bold">4. How We Share Your Information</h2>
//             <p>
//               We only share information with third-party service providers and
//               legal entities when necessary.
//             </p>
//             <h2 className="font-bold">5. Data Retention</h2>
//             <p>
//               Your data will be retained as long as necessary unless legally
//               required otherwise.
//             </p>
//             <h2 className="font-bold">6. Data Security</h2>
//             <p>
//               We implement security measures, but no system is 100% secure.
//               While we work to protect your data, we cannot guarantee absolute
//               security.
//             </p>
//             <h2 className="font-bold">7. Your Rights</h2>
//             <p>
//               You can access, update, delete, or opt-out of communications
//               regarding your personal information.
//             </p>
//             <h2 className="font-bold">8. Children's Privacy</h2>
//             <p>
//               Skynova is intended for users 18 years and older. If a child under
//               18 has provided information, we will delete it immediately.
//             </p>
//             <h2 className="font-bold">9. Changes to This Privacy Policy</h2>
//             <p>
//               We reserve the right to update this policy, with changes indicated
//               by the "Last Updated" date.
//             </p>
//             <h2 className="font-bold">10. Contact Us</h2>
//             <p>
//               For any questions or concerns, contact us at support@skynova.com
//               or +1-800-123-4567.
//             </p>
//           </div>
//         </div>

//         {/* Agree/Disagree section */}
//         {isAgreed === null && (
//           <div className="mt-6 flex justify-center space-x-4">
//             <button
//               onClick={() => handleAgreement(true)}
//               className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200 font-bold"
//             >
//               Accept Privacy Policy
//             </button>
//             <button
//               onClick={() => handleAgreement(false)}
//               className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-200 font-bold"
//             >
//               Reject Privacy Policy
//             </button>
//           </div>
//         )}

//         {/* If the user agreed */}
//         {isAgreed === true && (
//           <div className="mt-6 flex justify-center">
//             <button
//               className="bg-gray-500 text-white py-2 px-6 rounded-md font-bold cursor-not-allowed"
//               disabled
//             >
//               Agreed
//             </button>
//           </div>
//         )}

//         {/* If the user disagreed */}
//         {isAgreed === false && (
//           <div className="mt-6 flex justify-center">
//             <button
//               className="bg-gray-500 text-white py-2 px-6 rounded-md font-bold cursor-not-allowed"
//               disabled
//             >
//               Disagreed
//             </button>
//           </div>
//         )}

//         {/* Button to download the formatted PDF */}
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={downloadPDF}
//             className="bg-eisha text-white py-2 px-6 rounded-md hover:bg-eisha-900 transition duration-200 font-bold"
//           >
//             Download Privacy Policy
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";

export default function PrivacyPolicy() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAgreed, setIsAgreed] = useState<boolean | null>(null);

  const downloadPDF = () => {
    if (contentRef.current) {
      const doc = new jsPDF("p", "pt", "a4");

      // Get the width of the PDF page
      const pdfPageWidth = doc.internal.pageSize.getWidth();

      // Set a margin (adjust this value as needed)
      const margin = 20;

      // Decrease the content width to leave less space on the right side
      const contentWidth = pdfPageWidth - margin * 2 - 30; // 30px less to reduce right space

      doc.html(contentRef.current, {
        callback: function (pdf) {
          pdf.save("PrivacyPolicy.pdf");
        },
        x: margin,
        y: 20,
        html2canvas: {
          scale: 0.75, // Adjust this scale for content size
          useCORS: true,
          allowTaint: false,
          logging: true,
          width: contentWidth, // Set the adjusted content width
          height: contentRef.current.scrollHeight,
        },
      });
    }
  };

  const handleAgreement = (agree: boolean) => {
    setIsAgreed(agree);
  };

  return (
    <div className="flex w-full min-h-screen pt-24" style={{ margin: 0 }}>
      <div
        className="w-1/2 bg-cover bg-center h-[80vh]"
        style={{ backgroundImage: "url('/privacy.png')" }}
      ></div>

      <div className="w-1/2 p-6 bg-white h-[80vh] overflow-y-auto custom-scrollbar">
        <div ref={contentRef} className="w-full">
          <h1
            className="text-4xl font-extrabold text-center mb-8 mt-4 font-serif text-gray-800"
            style={{ textAlign: "center" }}
          >
            Privacy Policy
          </h1>

          <div
            className="text-gray-700 p-6 space-y-6 align-center"
            style={{
              fontSize: "15px",
              lineHeight: "1.8",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            <p>
              <strong>Last Updated: September 28, 2024</strong>
            </p>
            <p>
              At Skynova, we are committed to protecting and respecting your
              privacy. This Privacy Policy outlines how we collect, use, and
              safeguard your personal information when you interact with our
              learning platform, which provides training, quizzes, missions, and
              monitoring services aimed at improving the learning curve of
              aviators.
            </p>
            <p>
              By using Skynova, you agree to the collection and use of
              information in accordance with this policy.
            </p>
            <h2 className="font-bold">1. Information We Collect</h2>
            <h3>1.1 Personal Information</h3>
            <p>
              When you register on Skynova, we may collect personal information
              including, but not limited to:
            </p>
            <ul className="list-disc ml-6">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Training and Quiz Results</li>
              <li>Mission Progress and Achievements</li>
              <li>Certifications and Awards</li>
              <li>
                Behavioral Monitoring Data (to assess compliance with platform
                standards)
              </li>
            </ul>
            <h3>1.2 Usage Data</h3>
            <p>
              We automatically collect certain information about your device and
              how you interact with Skynova, such as:
            </p>
            <ul className="list-disc ml-6">
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Time Spent on Various Modules</li>
              <li>
                Interaction with Quizzes, Missions, and Training Resources
              </li>
            </ul>
            <h2 className="font-bold">2. How We Use Your Information</h2>
            <p>
              Skynova uses the information we collect in the following ways:
            </p>
            <ul className="list-disc ml-6">
              <li>Training and Skill Assessment</li>
              <li>Monitoring and Compliance</li>
              <li>Certifications and Achievement Tracking</li>
              <li>Platform Improvements</li>
              <li>Communication</li>
            </ul>
            <h2 className="font-bold">
              3. Certification and Misconduct Policy
            </h2>

            <p>
              Skynova takes academic integrity and professionalism seriously.
              Misconduct will result in certificate revocation and potential
              blocking.
            </p>

            <h2 className="font-bold">4. How We Share Your Information</h2>
            <p>
              We only share information with third-party service providers and
              legal entities when necessary.
            </p>
            <h2 className="font-bold">5. Data Retention</h2>
            <p>
              Your data will be retained as long as necessary unless legally
              required otherwise.
            </p>
            <h2 className="font-bold">6. Data Security</h2>
            <p>
              We implement security measures, but no system is 100% secure.
              While we work to protect your data, we cannot guarantee absolute
              security.
            </p>
            <h2 className="font-bold">7. Your Rights</h2>
            <p>
              You can access, update, delete, or opt-out of communications
              regarding your personal information.
            </p>
            <h2 className="font-bold">8. Children Privacy</h2>
            <p>
              Skynova is intended for users 18 years and older. If a child under
              18 has provided information, we will delete it immediately.
            </p>
            <h2 className="font-bold">9. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update this policy, with changes indicated
              by the &quot;Last Updated&quot; date.
            </p>
            <h2 className="font-bold">10. Contact Us</h2>
            <p>
              For any questions or concerns, contact us at support@skynova.com
              or +1-800-123-4567.
            </p>
          </div>
        </div>

        {/* Agree/Disagree section */}
        {isAgreed === null && (
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => handleAgreement(true)}
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200 font-bold"
            >
              Accept Privacy Policy
            </button>
            <button
              onClick={() => handleAgreement(false)}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-200 font-bold"
            >
              Reject Privacy Policy
            </button>
          </div>
        )}
        {isAgreed === true && (
          <div className="mt-6 flex justify-center">
            <button
              className="bg-gray-500 text-white py-2 px-6 rounded-md font-bold cursor-not-allowed"
              disabled
            >
              Agreed
            </button>
          </div>
        )}

        {/* If the user disagreed */}
        {isAgreed === false && (
          <div className="mt-6 flex justify-center">
            <button
              className="bg-gray-500 text-white py-2 px-6 rounded-md font-bold cursor-not-allowed"
              disabled
            >
              Disagreed
            </button>
          </div>
        )}

        
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadPDF}
            className="bg-eisha text-white py-2 px-6 rounded-md hover:bg-eisha-900 transition duration-200 font-bold"
          >
            Download Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
