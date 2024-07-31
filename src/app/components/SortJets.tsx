// components/Sort.tsx

interface Jet {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
    status: string;
  }
  
  interface SortProps {
    onSortChange: (sortField: keyof Jet) => void;
  }
  
  import React, { FC } from 'react';
  
  const Sort: FC<SortProps> = ({ onSortChange }) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSortChange(e.target.value as keyof Jet);
    };
  
    return (
      <select onChange={handleSortChange} className="px-4 py-2 border border-gray-300 rounded">
        <option value="name">Name</option>
        <option value="description">Description</option>
        <option value="imageURL">Image URL</option>
        <option value="status">Status</option>
      </select>
    );
  };
  
  export default Sort;
  