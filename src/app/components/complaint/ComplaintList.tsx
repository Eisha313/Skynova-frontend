
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import Search from '../Search';
// import { ArrowUpDown } from 'lucide-react'; 

// interface Complaint {
//   _id: string;
//   title: string;
//   description: string;
// }

// const ComplaintList: React.FC = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Complaint | null; direction: 'asc' | 'desc' }>({
//     key: null,
//     direction: 'asc',
//   });
//   const [selectedComplaints, setSelectedComplaints] = useState<string[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
// const [filteredComplaint,setFilteredComplaints]=useState<Complaint[]>([])
//   useEffect(() => {
//     fetchComplaints();
//   }, [page, limit]);

//   const fetchComplaints = async () => {
//     try {
//       const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/viewComplaints', {
//         params: { page, limit },
//         withCredentials:true
//       });
//       setComplaints(response.data.data);
//       setTotalPages(response.data.meta.totalPages);
//     } catch (error) {
//       console.error('Error fetching complaints:', error);
//     }
//   };
//   const handleSearchChange = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const filtered = complaints.filter(
//       (complaint) =>
//         complaint.title.toLowerCase().includes(lowerCaseSearchTerm) ||
//         complaint.description.toLowerCase().includes(lowerCaseSearchTerm)
//     );
//     setFilteredComplaints(filtered);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setFilteredComplaints(complaints);
//   };

  
//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/complaints/deleteComplaint/${id}`,{withCredentials:true});
//       setComplaints(complaints.filter((complaint) => complaint._id !== id));
//     } catch (error) {
//       console.error('Error deleting complaint:', error);
//     }
//   };

//   const handleSort = (key: keyof Complaint) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
//     if (a === b) return 0;
//     if (a == null) return 1;
//     if (b == null) return -1;
//     if (typeof a === 'string' && typeof b === 'string') {
//       return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
//     }
//     return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
//   };

  
//   const sortedComplaints = Array.isArray(complaints) ? [...complaints] : [];

//   if (sortConfig.key) {
//     sortedComplaints.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
//   }

//   const handleSelectAll = () => {
//     if (selectedComplaints.length === complaints.length) {
//       setSelectedComplaints([]);
//     } else {
//       setSelectedComplaints(complaints.map((complaint) => complaint._id));
//     }
//   };

//   const handleSelectComplaint = (id: string) => {
//     if (selectedComplaints.includes(id)) {
//       setSelectedComplaints(selectedComplaints.filter((selectedId) => selectedId !== id));
//     } else {
//       setSelectedComplaints([...selectedComplaints, id]);
//     }
//   };

//   const renderArrow = (key: keyof Complaint) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? (
//         <ArrowUpDown className="h-4 w-4 inline ml-2" />
//       ) : (
//         <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
//       );
//     }
//     return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
//   };


//   return (
//     <div className="container mx-auto px-4 py-6 bg-gray-100">
//         <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
//         <h2 className="text-xl font-semibold">All Complaints</h2>
//         <div className="flex flex-1 justify-end space-x-2">
//         <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
//           {/* <Link 
//             href="/quizPage/addQuiz" 
//             className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center"
//           >
//             Add Quiz
//           </Link> */}
//         </div>
//       </div>
      
//       <table className="min-w-full bg-eisha text-white border border-gray-200">
//         <thead>
//           <tr>
//             <th className="p-2 border-b">
//             <input
//   type="checkbox"
//   checked={complaints && selectedComplaints.length === complaints.length}
//   onChange={handleSelectAll}
//   className="form-checkbox"
// />
//             </th>
//             <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('title')}>
//               Title {renderArrow('title')}
//             </th>
//             <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('description')}>
//               Description {renderArrow('description')}
//             </th>
//             <th className="p-2 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedComplaints.map((complaint) => (
//             <tr key={complaint._id}>
//               <td className="p-2 border-b">
//                 <input
//                   type="checkbox"
//                   checked={selectedComplaints.includes(complaint._id)}
//                   onChange={() => handleSelectComplaint(complaint._id)}
//                   className="form-checkbox"
//                 />
//               </td>
//               <td className="p-2 border-b">{complaint.title}</td>
//               <td className="p-2 border-b">{complaint.description}</td>
//               <td className="p-2 border-b flex space-x-2">
//                 <Link href={`/complaints/${complaint._id}`}>
//                   <FaEye className="text-blue-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
//                 </Link>
//                 <Link href={`/complaints/edit/${complaint._id}`}>
//                   <FaEdit className="text-green-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
//                 </Link>
//                 <FaTrash
//                   className="text-red-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full"
//                   onClick={() => handleDelete(complaint._id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           Page {page} of {totalPages}
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-gray-200 border rounded hover:bg-gray-300 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-gray-200 border rounded hover:bg-gray-300 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//         <div>
//           <label>
//             Show
//             <select
//               value={limit}
//               onChange={(e) => setLimit(Number(e.target.value))}
//               className="ml-2 border rounded p-1"
//             >
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplaintList;

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Search from '../Search';
import { ArrowUpDown } from 'lucide-react'; 

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Contact | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, [page, limit]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/users/viewContact', {
        params: { page, limit },
        withCredentials: true
      });
      setContacts(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.subject.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.message.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredContacts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredContacts(contacts);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/deleteContact/${id}`, { withCredentials: true });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSort = (key: keyof Contact) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
  };

  const sortedContacts = Array.isArray(contacts) ? [...contacts] : [];

  if (sortConfig.key) {
    sortedContacts.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact._id));
    }
  };

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const renderArrow = (key: keyof Contact) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Contacts</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
        </div>
      </div>

      <table className="min-w-full bg-eisha text-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border-b">
              <input
                type="checkbox"
                checked={contacts && selectedContacts.length === contacts.length}
                onChange={handleSelectAll}
                className="form-checkbox"
              />
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('name')}>
              Name {renderArrow('name')}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('email')}>
              Email {renderArrow('email')}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('subject')}>
              Subject {renderArrow('subject')}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => handleSort('message')}>
              Message {renderArrow('message')}
            </th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact._id}>
              <td className="p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact._id)}
                  onChange={() => handleSelectContact(contact._id)}
                  className="form-checkbox"
                />
              </td>
              <td className="p-2 border-b">{contact.name}</td>
              <td className="p-2 border-b">{contact.email}</td>
              <td className="p-2 border-b">{contact.subject}</td>
              <td className="p-2 border-b">{contact.message}</td>
              <td className="p-2 border-b flex space-x-2">
                <Link href={`/contacts/${contact._id}`}>
                  <FaEye className="text-blue-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                </Link>
                <Link href={`/contacts/edit/${contact._id}`}>
                  <FaEdit className="text-green-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                </Link>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:bg-gray-300 p-1 rounded-full"
                  onClick={() => handleDelete(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 border rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 border rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div>
          <label>
            Show
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="ml-2 border rounded p-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            entries
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
