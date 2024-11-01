"use client";
import React, { useState } from "react";

type SearchFilterProps = {
  onSearch: (term: string) => void;
  onFilter: (type: string) => void;
};

const SearchFilterBar: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Search resources..."
        className="p-2 border rounded"
      />
      <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded">
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="documentary">Documentary</option>
        <option value="quote">Quote</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
