import React from 'react';

interface SearchFilterDownloadProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterType: string) => void;
  onDownload: () => void;
}

const SearchFilterDownload: React.FC<SearchFilterDownloadProps> = ({ onSearch, onFilter, onDownload }) => {
  return (
    <div className="search-filter-download">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="border p-2"
      />
      <select onChange={(e) => onFilter(e.target.value)} className="border p-2 ml-2">
        <option value="">Filter by Type</option>
        <option value="Admin">Admin</option>
        <option value="Normal User">Normal User</option>
        <option value="Avior">Avior</option>
      </select>
      <button onClick={onDownload} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Download PDF
      </button>
    </div>
  );
};

export default SearchFilterDownload;
