import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MdDownload } from 'react-icons/md';
import { themeColors } from './global/color';

interface Certificate {
  id: number; 
//   backendId: number;
  type: string;
  description: string;
//   username: string;
//   type: string;
//   status: string;
//   profilePicture?: string;
}

interface DownloadPDFProps {
  certificates: Certificate[];
  // borderColor: keyof typeof themeColors; 
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ certificates}) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    const columns = [
      { title: 'ID', dataKey: 'id' },
    //   { title: 'Backend ID', dataKey: 'backendId' },
      { title: 'Type', dataKey: 'type' },
      { title: 'Description', dataKey: 'description' },
    //   { title: 'Username', dataKey: 'username' },
    //   { title: 'Type', dataKey: 'type' },
    //   { title: 'Status', dataKey: 'status' }
    ];

    const rows = certificates.map(certificate => ({
      id: certificate.id,
    //   backendId: user.backendId,
      type: certificate.type,
      description: certificate.description,
      
    }));

    doc.text('Certificates', 14, 20);

    (doc as any).autoTable({
      columns,
      body: rows,
      startY: 30
    });

    doc.save('certificate.pdf');
  };

    
    // const borderColorHex = themeColors[borderColor];
  
    return (
      <button
        onClick={handleDownload}
      
        className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"
      >
        <MdDownload  />
      </button>
    );
};

export default DownloadPDF;
