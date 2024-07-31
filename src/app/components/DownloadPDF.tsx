import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface User {
  id: number; 
  backendId: number;
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
}

interface DownloadPDFProps {
  users: User[];
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ users }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    const columns = [
      { title: 'ID', dataKey: 'id' },
      { title: 'Backend ID', dataKey: 'backendId' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Email', dataKey: 'email' },
      { title: 'Username', dataKey: 'username' },
      { title: 'Type', dataKey: 'type' },
      { title: 'Status', dataKey: 'status' }
    ];

    const rows = users.map(user => ({
      id: user.id,
      backendId: user.backendId,
      name: user.name,
      email: user.email,
      username: user.username,
      type: user.type,
      status: user.status
    }));

    doc.text('User Data', 14, 20);

    (doc as any).autoTable({
      columns,
      body: rows,
      startY: 30
    });

    doc.save('user_data.pdf');
  };

  return (
    <button onClick={handleDownload} className="bg-red-500 text-white px-4 py-2 rounded-md">
      Download PDF
    </button>
  );
};

export default DownloadPDF;
