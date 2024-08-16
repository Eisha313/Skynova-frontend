// components/DownloadPDF.tsx

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MdDownload } from 'react-icons/md';

interface Jet {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  status: string;
}

interface DownloadPDFProps {
  jets: Jet[];
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ jets }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    const columns = [
      { title: 'ID', dataKey: '_id' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Description', dataKey: 'description' },
      { title: 'Image URL', dataKey: 'imageURL' },
      { title: 'Status', dataKey: 'status' }
    ];

    const rows = jets.map(jet => ({
      _id: jet._id,
      name: jet.name,
      description: jet.description,
      imageURL: jet.imageURL,
      status: jet.status
    }));

    doc.text('Jet Data', 14, 20);

    (doc as any).autoTable({
      columns,
      body: rows,
      startY: 30
    });

    doc.save('jet_data.pdf');
  };

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
