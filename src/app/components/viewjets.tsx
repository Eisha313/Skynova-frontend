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
      const response = await fetch('http://localhost:4000/jets/viewJets');
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
      const response = await fetch(`http://192.168.18.26:3000/jets/deleteJet/${jetId}`, {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Fighter Jets</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
            <Link href="/addjet">Add Jet</Link>
          </div>
          <Search onSearchChange={handleSearchChange} />
          <Sort onSortChange={handleSortChange} />
          <DownloadPDF jets={jets} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left">ID</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Image</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Status</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentJets.map((jet, index) => (
              <tr key={jet._id}>
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Image
                    src={jet.imageURL}
                    alt={jet.name}
                    width={48} // or your desired width
                    height={48} // or your desired height
                    className="object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{jet.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{jet.description}</td>
                
                <td className="py-2 px-3 border-b border-gray-200 text-center">
                  <span className={`flex justify-center items-center px-1 py-4 rounded-full text-lg font-semibold ${jet.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {jet.status}
                  </span>
                </td>
                
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <div className="flex justify-left items-center space-x-2">
                    <button onClick={() => handleJetClick(jet)} className="text-blue-600 hover:text-blue-900">
                      <FaEye className="inline-block w-6 h-6" />
                    </button>
                    <button onClick={() => handleEditJet(jet._id)} className="text-yellow-600 hover:text-yellow-900">
                      <FaEdit className="inline-block w-6 h-6 " />
                    </button>
                    <button onClick={() => handleDeleteJet(jet._id)} className="text-red-600 hover:text-red-900">
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
            width={500} // or your desired width
            height={300} // or your desired height
            className="w-full h-auto mt-4"
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewJets;
