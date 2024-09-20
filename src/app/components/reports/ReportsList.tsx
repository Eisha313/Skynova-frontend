
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Search from '../Search';
import { ArrowUpDown } from 'lucide-react';

interface Report {
  _id: string;
  name: string;
  description: string;
  type: string;
  date: string;
}

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Report | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [filteredReports,setFilteredReports]=useState<Report[]>([])
  
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/reports/viewReport',{withCredentials:true});
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);
  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = reports.filter(report =>
        report.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.date.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.date.toLowerCase().includes(lowerCaseSearchTerm)


    );
    setFilteredReports(filtered);
  };
  const handleDelete = async (id: string) => {
        try {
          await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/reports/deleteReport/${id}`,{withCredentials:true});
          setReports(reports.filter((report) => report._id !== id));
        } catch (error) {
          console.error('Error deleting report:', error);
        }
      };

  const handleSort = (key: keyof Report) => {
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

  const sortedReports = [...reports];
  if (sortConfig.key) {
    sortedReports.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedReports.size === reports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(reports.map(report => report._id)));
    }
  };

  const handleSelectReport = (id: string) => {
    setSelectedReports(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };
  const renderArrow = (key: keyof Report) => {
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
    <div className="overflow-x-auto p-4 md:p-6 bg-gray-100 rounded-md shadow-lg">
    
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Notifications</h2>
        <div className="flex flex-1 justify-end space-x-2">
        <Search
  onSearchChange={handleSearchChange}
  searchTerm={searchTerm}
  clearSearch={() => setFilteredReports(reports)} // Implement clearSearch to reset filtered reports
/>
          <Link href="/notification/addNotification" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center">
            Add Notification
          </Link>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              <input
                type="checkbox"
                checked={selectedReports.size === reports.length}
                onChange={handleSelectAll}
              />
            </th>
            {['Name', 'Description', 'Type', 'Date', 'Actions'].map((header, index) => (
              <th
                key={header}
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Report)}
              >
                {header} {index !== 4 && renderArrow(header.toLowerCase() as keyof Report)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedReports.map((report) => (
            <tr key={report._id} className="border-b">
              <td className="py-2 px-4 text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedReports.has(report._id)}
                  onChange={() => handleSelectReport(report._id)}
                />
              </td>
              <td className="py-2 px-4 text-gray-800">{report.name}</td>
              <td className="py-2 px-4 text-gray-800">{report.description}</td>
              <td className="py-2 px-4 text-gray-800">{report.type}</td>
              <td className="py-2 px-4 text-gray-800">{new Date(report.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center">
                <Link href={`/reports/viewReports/${report._id}/reportDetails`}>
                  <button className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                    <FaEye className="text-gray-700" />
                  </button>
                </Link>
                <Link href={`/reports/viewReports/${report._id}/editReport`} passHref>
                  <button className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
