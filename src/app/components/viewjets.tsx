
// 'use client'
// import { useCallback, useEffect, useState } from 'react';
// import Search from '../components/Search';
// import Sort from '../components/SortJets';
// import Pagination from '../components/Pagination';
// import DownloadPDF from '../components/DownloadJetsPdf';
// import Modal from './JetsModal';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
// import Image from 'next/image';

// interface Jet {
//   _id: string;
//   name: string;
//   description: string;
//   imageURL: string;
//   status: string;
// }

// const ViewJets: React.FC = () => {
//   const [jets, setJets] = useState<Jet[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState<keyof Jet>('name');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jetsPerPage] = useState(8);
//   const [selectedJet, setSelectedJet] = useState<Jet | null>(null);
//   const router = useRouter();

//   const fetchJets = useCallback(async () => {
//     try {
//       const response = await fetch('http://192.168.18.54:3000/jets/viewJets');
//       const data = await response.json();
//       const filteredJets = data
//         .filter((jet: Jet) =>
//           jet.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .sort((a: Jet, b: Jet) =>
//           a[sortField] > b[sortField] ? 1 : -1
//         );
//       setJets(filteredJets);
//     } catch (error) {
//       console.error('Error fetching jets:', error);
//     }
//   }, [searchTerm, sortField]);

//   useEffect(() => {
//     fetchJets();
//   }, [fetchJets, currentPage]);

//   const indexOfLastJet = currentPage * jetsPerPage;
//   const indexOfFirstJet = indexOfLastJet - jetsPerPage;
//   const currentJets = jets.slice(indexOfFirstJet, indexOfLastJet);

//   const handleSearchChange = (term: string) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (field: keyof Jet) => {
//     setSortField(field);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleJetClick = (jet: Jet) => {
//     setSelectedJet(jet);
//   };

//   const handleModalClose = () => {
//     setSelectedJet(null);
//   };

//   const handleEditJet = (jetId: string) => {
//     router.push(`/viewjets/${jetId}/edit`);
//   };

//   const handleDeleteJet = async (jetId: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this jet?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://192.168.18.54:3000/jets/deleteJet/${jetId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       alert('Jet deleted successfully!');
//       fetchJets(); // Refresh the list of jets
//     } catch (error) {
//       console.error('Error deleting jet:', error);
//       alert('Error deleting jet.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white text-black rounded-lg shadow-md">
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">All Fighter Jets</h1>
//         <div className="flex flex-wrap items-center space-x-4">
//           <Link href="/addjet"className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0">
//             Add Jet
//           </Link>
//           <Search onSearchChange={handleSearchChange} />
//           <Sort onSortChange={handleSortChange} />
//           <DownloadPDF jets={jets} />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white divide-y divide-gray-200">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">ID</th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">Image</th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">Name</th>
//               <th className="py-3 px-9 border-b border-gray-300 text-left">Description</th>
//               <th className="py-3 px-5 border-b border-gray-300 text-left">Status</th>
//               <th className="py-3 px-5 border-b border-gray-300 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentJets.map((jet, index) => (
//               <tr key={jet._id}>
//                 <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">
//                   <Image
//                     src={jet.imageURL}
//                     alt={jet.name}
//                     width={48}
//                     height={48}
//                     className="object-cover rounded-full"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-300">{jet.name}</td>
//                 <td className="py-2 px-6 border-b border-gray-300">{jet.description}</td>
//                 <td className="py-2 px-4 border-b border-gray-300 text-center">
//                   <span className={`px-4 py-1 rounded-full text-white font-semibold ${jet.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
//                     {jet.status === 'Active' ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-300 text-center">
//                   <div className="flex justify-center items-center space-x-4">
//                     <button onClick={() => handleJetClick(jet)} className="text-blue-400 hover:text-blue-600">
//                       <FaEye className="inline-block w-6 h-6" />
//                     </button>
//                     <button onClick={() => handleEditJet(jet._id)} className="text-yellow-400 hover:text-yellow-600">
//                       <FaEdit className="inline-block w-6 h-6" />
//                     </button>
//                     <button onClick={() => handleDeleteJet(jet._id)} className="text-red-400 hover:text-red-600">
//                       <FaTrash className="inline-block w-6 h-6" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='flex justify-center mt-4'>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(jets.length / jetsPerPage)}
//           onPageChange={handlePageChange}
//         />
//       </div>
//       {selectedJet && (
//         <Modal onClose={handleModalClose}>
//           <h2 className="text-xl font-semibold mb-4">{selectedJet.name}</h2>
//           <p>{selectedJet.description}</p>
//           <Image
//             src={selectedJet.imageURL}
//             alt={selectedJet.name}
//             layout="responsive"
//             width={500}
//             height={300}
//             className="w-full h-auto mt-4"
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ViewJets;
'use client'
import { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search';
import Sort from '../components/SortJets';
import Pagination from '../components/Pagination';
import DownloadPDF from '../components/DownloadJetsPdf';
import Modal from './JetsModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import Image from 'next/image';

interface Jet {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  status: string;
}

const ViewJets: React.FC = () => {
  const [jets, setJets] = useState<Jet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Jet>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [jetsPerPage] = useState(8);
  const [selectedJet, setSelectedJet] = useState<Jet | null>(null);
  const router = useRouter();

  const fetchJets = useCallback(async () => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/jets/viewJets');
      const data = await response.json();
      const filteredJets = data
        .filter((jet: Jet) =>
          jet.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a: Jet, b: Jet) =>
          a[sortField] > b[sortField] ? 1 : -1
        );
      setJets(filteredJets);
    } catch (error) {
      console.error('Error fetching jets:', error);
    }
  }, [searchTerm, sortField]);

  useEffect(() => {
    fetchJets();
  }, [fetchJets, currentPage]);

  const indexOfLastJet = currentPage * jetsPerPage;
  const indexOfFirstJet = indexOfLastJet - jetsPerPage;
  const currentJets = jets.slice(indexOfFirstJet, indexOfLastJet);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (field: keyof Jet) => {
    setSortField(field);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleJetClick = (jet: Jet) => {
    setSelectedJet(jet);
  };

  const handleModalClose = () => {
    setSelectedJet(null);
  };

  const handleEditJet = (jetId: string) => {
    router.push(`/viewjets/${jetId}/edit`);
  };

  const handleDeleteJet = async (jetId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this jet?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/jets/deleteJet/${jetId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Jet deleted successfully!');
      fetchJets(); // Refresh the list of jets
    } catch (error) {
      console.error('Error deleting jet:', error);
      alert('Error deleting jet.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Fighter Jets</h1>
        <div className="flex flex-wrap items-center space-x-4">
          <Link href="/addjet" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0">
            Add Jet
          </Link>
          <Search onSearchChange={handleSearchChange} />
          <Sort onSortChange={handleSortChange} />
          <DownloadPDF jets={jets} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">ID</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Image</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">Description</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Status</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentJets.map((jet, index) => (
              <tr key={jet._id}>
                <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <Image
                    src={jet.imageURL}
                    alt={jet.name}
                    width={53}
                    height={46}
                    className="object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{jet.name}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{jet.description}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <span className={`px-4 py-1 rounded-full text-white font-semibold ${jet.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {jet.status === 'Active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <button onClick={() => handleJetClick(jet)} className="text-blue-400 hover:text-blue-600">
                      <FaEye className="inline-block w-6 h-6" />
                    </button>
                    <button onClick={() => handleEditJet(jet._id)} className="text-yellow-400 hover:text-yellow-600">
                      <FaEdit className="inline-block w-6 h-6" />
                    </button>
                    <button onClick={() => handleDeleteJet(jet._id)} className="text-red-400 hover:text-red-600">
                      <FaTrash className="inline-block w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center mt-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(jets.length / jetsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      {selectedJet && (
        <Modal onClose={handleModalClose}>
          <h2 className="text-xl font-semibold mb-4">{selectedJet.name}</h2>
          <p>{selectedJet.description}</p>
          <Image
            src={selectedJet.imageURL}
            alt={selectedJet.name}
            layout="responsive"
            width={500}
            height={300}
            className="w-full h-auto mt-4"
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewJets;
