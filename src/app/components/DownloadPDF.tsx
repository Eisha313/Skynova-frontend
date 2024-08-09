
// import React from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { MdDownload } from "react-icons/md";
// import { themeColors } from './global/color'; // Ensure correct import

// interface User {
//   id: number; 
//   backendId: number;
//   name: string;
//   email: string;
//   username: string;
//   type: string;
//   status: string;
// }

// interface DownloadPDFProps {
//   users: User[];
//   borderColor: keyof typeof themeColors; 
// }

// const DownloadPDF: React.FC<DownloadPDFProps> = ({ users, borderColor }) => {
//   const handleDownload = () => {
//     const doc = new jsPDF();

//     const columns = [
//       { title: 'ID', dataKey: 'id' },
//       { title: 'Backend ID', dataKey: 'backendId' },
//       { title: 'Name', dataKey: 'name' },
//       { title: 'Email', dataKey: 'email' },
//       { title: 'Username', dataKey: 'username' },
//       { title: 'Type', dataKey: 'type' },
//       { title: 'Status', dataKey: 'status' }
//     ];

//     const rows = users.map(user => ({
//       id: user.id,
//       backendId: user.backendId,
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       type: user.type,
//       status: user.status
//     }));

//     doc.text('User Data', 14, 20);

//     (doc as any).autoTable({
//       columns,
//       body: rows,
//       startY: 30
//     });

//     doc.save('user_data.pdf');
//   };

//   const borderClass = `border-${themeColors[borderColor]}`; 

//   return (
//     <button
//       onClick={handleDownload}
//       className={`text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-transparent hover:${borderClass} transition-all duration-300`}
//     >
//       <MdDownload className="w-8 h-8" />
//     </button>
//   );
// };

// export default DownloadPDF;
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MdDownload } from 'react-icons/md';
import { themeColors } from './global/color';

interface User {
  id: number; 
  backendId: number;
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
  profilePicture?: string;
}

interface DownloadPDFProps {
  users: User[];
  // borderColor: keyof typeof themeColors; 
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ users}) => {
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
