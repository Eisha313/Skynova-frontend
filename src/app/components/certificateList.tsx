
'use client';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ArrowUpDown } from 'lucide-react';
import { MdDownload } from 'react-icons/md';

type Certificate = {
  _id: string;
  id: number;
  type: string;
  description: string;
};

const CertificateList: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificate, setFilteredCertificate] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Certificate; direction: 'asc' | 'desc' }>({
    key: 'type',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(5); 

  useEffect(() => {
    fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificates', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setFilteredCertificate(data);
      })
      .catch((error) => console.error('Error fetching certificates:', error));
  }, []);

  const deleteCertificate = (id: string) => {
    fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/deleteCertificate/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Certificate deleted successfully') {
          const updatedCertificates = certificates.filter((certificate) => certificate._id !== id);
          setCertificates(updatedCertificates);
          setFilteredCertificate(updatedCertificates); 
        }
      })
      .catch((error) => console.error('Error deleting certificate:', error));
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    filterCertificates(searchTerm, filterType);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilterType('');
    setFilteredCertificate(certificates); 
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);
    filterCertificates(searchTerm, selectedType);
  };

  
  const filterCertificates = (searchTerm: string, selectedType: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = certificates.filter((certificate) => {
      const matchesType =
        selectedType === '' || certificate.type.toLowerCase().includes(selectedType.toLowerCase());
      const matchesSearchTerm =
        certificate.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        certificate.description.toLowerCase().includes(lowerCaseSearchTerm);
      return matchesType && matchesSearchTerm;
    });
    setFilteredCertificate(filtered);
  };

  const certificatesToRender = filteredCertificate.length > 0 ? filteredCertificate : certificates;


  // const indexOfLastCertificate = currentPage * certificatesPerPage;
  // const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  // const currentCertificates = certificatesToRender.slice(indexOfFirstCertificate, indexOfLastCertificate);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  
  // Ensure `certificatesToRender` is an array
  const currentCertificates = Array.isArray(certificatesToRender)
    ? certificatesToRender.slice(indexOfFirstCertificate, indexOfLastCertificate)
    : [];
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
 
  const handleSort = (key: keyof Certificate) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...certificatesToRender].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredCertificate(sortedData);
  };

  const renderArrow = (key: keyof Certificate) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };


  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Certificates List', 20, 10);
    const tableData = certificatesToRender.map((certificate, index) => [
      index + 1,
      certificate.type,
      certificate.description,
    ]);
    (doc as any).autoTable({
      head: [['#', 'Type', 'Description']],
      body: tableData,
    });
    doc.save('certificates.pdf');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Certificates</h1>
        <div className="flex items-center space-x-4">
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
          <select value={filterType} onChange={handleFilterChange} className="px-4 py-2 rounded-md bg-white border border-gray-300">
            <option value="">All Types</option>
            <option value="Basic">Basic</option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button
            onClick={handleDownloadPDF}
            className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"
          >
            <MdDownload />
          </button>
          <Link href="/add-certificate" className="px-4 py-2 rounded-md text-center bg-eisha text-white">
            Add Certificate
          </Link>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-800 text-white text-right">
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('type')}>
              Type {renderArrow('type')}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('description')}>
              Description {renderArrow('description')}
            </th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-right">
          {currentCertificates.map((certificate, index) => (
            <tr key={certificate._id}>
              <td className="py-2 px-4 border-b">{index + 1 + (currentPage - 1) * certificatesPerPage}</td>
              <td className="py-2 px-4 border-b">{certificate.type}</td>
              <td className="py-2 px-4 border-b">{certificate.description}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex justify-end space-x-2">
                  <Link
                    href={`/certificate-page/${certificate._id}/editCertificate`}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEdit className="text-gray-700" />
                  </Link>
                  <button
                    onClick={() => deleteCertificate(certificate._id)}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400  "
                  >
                    <FaTrash className="text-gray-700" />
                  </button>
                  <Link
                    href={`/certificate-page/${certificate._id}/certificateDetails`}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  >
                    <FaEye className="text-gray-700" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-4">
        {Array.from({ length: Math.ceil(certificatesToRender.length / certificatesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;
