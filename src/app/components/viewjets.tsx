
'use client';

import { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import DownloadPDF from '../components/DownloadJetsPdf';
import Modal from './JetsModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaTrash, FaEdit, FaDownload } from 'react-icons/fa';
import Image from 'next/image';
import Filter from './FilterJets';
import { ArrowUpDown } from 'lucide-react';

interface Jet {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  status: string;
  jetLink: string;
}

const ViewJets: React.FC = () => {
  const [jets, setJets] = useState<Jet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Jet>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [jetsPerPage] = useState(8);
  const [selectedJet, setSelectedJet] = useState<Jet | null>(null);
  const router = useRouter();

  const fetchJets = useCallback(async () => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/jets/viewJets', { credentials: 'include' });
      const data = await response.json();
      const filteredJets = data
        .filter((jet: Jet) => jet.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a: Jet, b: Jet) => {
          if (sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
          } else {
            return a[sortField] < b[sortField] ? 1 : -1;
          }
        });
      setJets(filteredJets);
    } catch (error) {
      console.error('Error fetching jets:', error);
    }
  }, [searchTerm, sortField, sortOrder]);

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

  const clearSearch = () => {
    setSearchTerm('');
    fetchJets(); 
  };

  const handleSortChange = (field: keyof Jet) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
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
  
  const renderArrow = (key: keyof Jet) => {
    if (sortField === key) {
      return sortOrder === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };
  
  const handleEditJet = (jetId: string) => {
    router.push(`/viewjets/${jetId}/edit`);
  };

  const handleDeleteJet = async (jetId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this jet?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/jets/deleteJet/${jetId}`, {
        method: 'DELETE',
        credentials: 'include'
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

  const handleToggleStatus = async (jet: Jet) => {
    const updatedStatus = jet.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/jets/updateJet/${jet._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
        credentials: 'include',
      });
      fetchJets(); // Refresh list after status update
    } catch (error) {
      console.error('Error updating jet status:', error);
      alert('Error updating jet status.');
    }
  };
  const handleFilterChange = (filter: string) => {
    // Process the filter (e.g., update your jets list based on the filter)
    const filteredJets = jets.filter(jet => jet.name.toLowerCase().includes(filter.toLowerCase()));
    setJets(filteredJets);
  };
  
  return (
    <div className="container mx-auto p-4 bg-gray-100 text-black rounded-lg shadow-md">
      <div className="flex flex-wrap items-center justify-between mb-4">
  <h1 className="text-2xl font-bold">All Fighter Jets</h1>
  <div className="flex space-x-4 items-center">
    <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
    <Filter onFilterChange={handleFilterChange} />
    <DownloadPDF jets={jets} />
    <Link href="/addjet" className="px-4 py-2 bg-eisha text-white rounded-md flex items-center">
      Add Jet
    </Link>
  </div>
</div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-800 text-white">
  <tr>
    <th className="py-3 px-4 border-b border-gray-300 text-left">Image</th>
    <th className="py-3 px-4 border-b border-gray-300 text-left cursor-pointer" onClick={() => handleSortChange('name')}>
      Name {renderArrow('name')}
    </th>
    <th className="py-3 px-4 border-b border-gray-300 text-left cursor-pointer" onClick={() => handleSortChange('description')}>
      Description {renderArrow('description')}
    </th>
    <th className="py-3 px-4 border-b border-gray-300 text-left cursor-pointer" onClick={() => handleSortChange('jetLink')}>
      JetLink {renderArrow('jetLink')}
    </th>
    <th className="py-3 px-4 border-b border-gray-300 text-left cursor-pointer" onClick={() => handleSortChange('status')}>
      Status {renderArrow('status')}
    </th>
    <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
  </tr>
</thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentJets.map((jet) => (
              <tr key={jet._id}>
                <td className="py-2 px-4 border-b border-gray-300">
  <Image src={jet.imageURL} alt={jet.name} width={50} height={50} className="object-cover w-12 h-12 rounded-full" />
</td>

                <td className="py-2 px-4 border-b border-gray-300">{jet.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{jet.description}</td>
                <td className="py-2 px-4 border-b border-gray-300">{jet.jetLink}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleToggleStatus(jet)}
                    className={`px-4 py-1 rounded-full text-white font-semibold ${jet.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {jet.status === 'Active' ? 'Active' : 'Inactive'}
                  </button>
                </td>
                {/* <td className="py-2 px-4 border-b border-gray-300">
                  <div className="flex justify-center items-center space-x-4"> */}
                    {/* <button onClick={() => handleJetClick(jet)} className="text-blue-400 hover:text-blue-600">
                      <FaEye className="inline-block w-6 h-6" />
                    </button>
                    <button onClick={() => handleEditJet(jet._id)} className="text-yellow-400 hover:text-yellow-600">
                      <FaEdit className="inline-block w-6 h-6" />
                    </button>
                    <button onClick={() => handleDeleteJet(jet._id)} className="text-red-400 hover:text-red-600">
                      <FaTrash className="inline-block w-6 h-6" />
                    </button> */}
                   
                  {/* </div>
                </td> */}
                 <td className="py-2 px-4 text-center border-b flex space-x-2 items-center">
 
    <button onClick={() => handleEditJet(jet._id)}
      className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FaEye className="text-gray-700" />
    </button>
  
 
    <button onClick={() => handleEditJet(jet._id)} 
      className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FaEdit className="text-gray-700" />
    </button>
 
  <button
  onClick={() => handleDeleteJet(jet._id)} 
    className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
    style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <FaTrash className="text-gray-700" />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={jets.length}
        itemsPerPage={jetsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {selectedJet && <Modal jet={selectedJet} onClose={handleModalClose}>Modal Content</Modal>}

    </div>
  );
};

export default ViewJets;
