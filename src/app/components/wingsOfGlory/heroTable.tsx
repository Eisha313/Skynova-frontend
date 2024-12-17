"use client"
import { useEffect, useState } from "react";
import { Hero } from "@/types/types";
import AddHero from "./addHero";
import Link from "next/link";
import autoTable from 'jspdf-autotable';
import Search from "../Search";
import { jsPDF } from 'jspdf';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { MdDownload } from 'react-icons/md';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from "../confirmationModal";
import ReactPlayer from 'react-player';

const HeroesTable = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [modalHero, setModalHero] = useState<Hero | null>(null);
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Hero | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For delete confirmation modal
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchHeroes = async () => {
        const res = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHeroes", {
            credentials: "include",
          });
      const data = await res.json();
      setHeroes(data);
    
    };
    
    fetchHeroes();
    
  }, []);
  const handleSort = (key: keyof Hero) => {
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
    return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
  };

  const sortedHeroes = [...heroes].sort((a, b) => {
    if (sortConfig.key) {
      return compareValues(a[sortConfig.key], b[sortConfig.key], sortConfig.direction);
    }
    return 0;
  });
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };
 
 
  const filteredHeroes = heroes.filter(hero => {
    const matchesSearch = 
      (hero.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (hero.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
  
    const matchesType = filterType 
      ? hero.movies?.some(movie => movie.name.includes(filterType)) ||
        hero.documentaries?.some(doc => doc.name.includes(filterType)) ||
        hero.quotes?.some(quote => quote.name.includes(filterType))
      : true;
  
    return matchesSearch && matchesType;
  });
  
 
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = filteredHeroes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Hero Resource List', 20, 20);

   
    const headers = [['Name', 'Type', 'Description']];
    
  
    const data = filteredHeroes.map(hero => [
      hero.name,
      hero.movies.length > 0 ? 'Movies' : hero.documentaries.length > 0 ? 'Documentaries' : 'Quotes',
      hero.description
    ]);

    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });

 
    doc.save('heroes.pdf');
};


  const renderArrow = (key: keyof Hero) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };
  
 
  const handleDeleteConfirmation = (id: string) => {
    setResourceToDelete(id);
    setDeleteModalVisible(true); 
  };

  const handleDelete = async () => {
    if (resourceToDelete) {
      await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/deleteWarHero/${resourceToDelete}`, {
        method: "DELETE",
        credentials: "include"
      });
      setHeroes((prev) => prev.filter((hero) => hero._id !== resourceToDelete));
      setDeleteModalVisible(false); 
      
      setResourceToDelete(null); 
      alert("Hero successfully deleted!");
    }
  };


  return (
    <div className="p-4  rounded-lg shadow-lg text-white"> 
      <h2 className="text-lg font-semibold mb-4">Heroes</h2>
      <div className="flex flex-1 justify-end space-x-2">
  <input 
    type="text" 
    value={searchTerm} 
    onChange={e => setSearchTerm(e.target.value)} 
    placeholder="Search..."
   className="px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
  />

  <select 
    value={filterType} 
    onChange={e => setFilterType(e.target.value)} 
    className="px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
  >
    <option className='bg-transparent text-black 'value="">All Types</option>
    <option className='bg-transparent text-black'value="document">Documentaries</option>
    <option className='bg-transparent text-black' value="movie">Movies</option>
    <option className='bg-transparent text-black' value="quote">Quotes</option>
  </select>


  <button
    onClick={generatePDF}
    className="text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"
  >
    <MdDownload /> 
  </button>
  <Link
    href="/wings/Hero/addHero"
    className="px-4 py-2 rounded-md text-center bg-eisha text-white"
  >
    Add Hero
  </Link>
</div>

     
      <table className="min-w-full mt-6">
        <thead className="bg-eisha text-white">
          <tr>
            
             {['Sr No ','Name', 'Image', 'Medal','Accomplishments' ,'Description','Type','Actions'].map(header => (
              <th
                key={header}
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Hero)}
              >
                <div className="flex items-center justify-center">
                  {header}
                  {(header === 'Name'  || header === 'Description' || header === 'Medal' || header === 'Accomplishments'|| header === 'Resource Type') && renderArrow(header.toLowerCase() as keyof Hero)}
                </div>
              </th>
              ))}
          </tr>
          
        </thead>
        <tbody className='bg-[#212C44] text-white'>
          {filteredHeroes.map((hero, index) => (
            <tr key={hero._id} className="text-center">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{hero.name}</td>
              <td className="py-2 px-4">
              <div className='flex justify-center py-2 space-x-2'>
                {hero.image && (
  <Image
    src={hero.image as string}
    alt={hero.name}
    width={64} 
    height={64}
    className="object-cover rounded"
    priority 
  />
)}</div>
              </td>
              <td className="py-2 px-4 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{hero.medals}</td>
              <td className="py-2 px-4 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{hero.accomplishments}</td>
              

              
              <td className="py-2 px-4 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{hero.description.replace(/"/g, '&quot;')}</td>

              <td className="py-2 px-4">
                {[...hero.movies.map(() => 'Movie'), ...hero.documentaries.map(() => 'Documentary'), ...hero.quotes.map(() => 'Quote')].join(', ')}
              </td>
              
             
              <div className='flex justify-center py-2 space-x-2'>
                <td className="py-2 px-4 text-center  flex space-x-2 items-center">
                
                <button
                onClick={() => setModalHero(hero)}
                  className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaEye className="text-gray-700" />
                </button>
              
              <Link
                href={`/wings/Hero/${hero._id}/editHero`}
                passHref
              >
                <button
                  className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaEdit className="text-gray-700" />
                </button>
              </Link>
              <button
               
                onClick={() => hero._id && handleDeleteConfirmation(hero._id)}
                className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                style={{
                  height: "33px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaTrash className="text-gray-700" />
              </button>
            </td>
          
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModalVisible && (
          <DeleteConfirmationModal
            onConfirm={handleDelete}
            onCancel={() => setDeleteModalVisible(false)}
          />
        )}
      

{modalHero && (
  <div className="fixed inset-0 flex items-center justify-center text-white bg-opacity-70 z-50 p-4">
    <div className="bg-custom-image text-white rounded-lg shadow-2xl w-full max-w-lg p-6 space-y-4">

     
      <h3 className="text-2xl font-semibold text-white text-center   pb-4">
        {modalHero.name}
      </h3>

     
      {modalHero.image && (
        <img
          src={modalHero.image as string}
          alt={modalHero.name}
          className="h-64 w-full object-cover border border-white/30  rounded-lg shadow-md mb-4"
        />
      )}

      
      <p className="text-white">
        <span className="font-bold text-lg ">Description:</span> {modalHero.description}
      </p>

<p className="font-bold text-lg ">
  <span className="font-bold text-lg ">Accomplishments:</span>{" "}
  {Array.isArray(modalHero.accomplishments)
    ? modalHero.accomplishments.join(", ")
    : modalHero.accomplishments}
</p>


<p className="font-bold text-lg ">
  <span className="font-semibold">Medals:</span>{" "}
  {Array.isArray(modalHero.medals)
    ? modalHero.medals.join(", ")
    : modalHero.medals}
</p>




      
      <div className="text-center mt-6">
        <button
          onClick={() => setModalHero(null)}
          className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {editingHeroId && (
        <AddHero heroId={editingHeroId} onClose={() => setEditingHeroId(null)} />
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredHeroes.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroesTable;