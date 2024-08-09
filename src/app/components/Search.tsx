'use client'
import { useState } from 'react';

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <input
  type="text"
  placeholder="Search"
  value={searchTerm}
  onChange={handleSearch}
  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm  hover:border-eisha   focus:outline-none focus:border-eisha focus:ring-1 focus:ring-eisha"
/>

  );
};

export default Search;

