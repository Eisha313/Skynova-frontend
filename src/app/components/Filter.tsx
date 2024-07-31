// import { useState } from 'react';

// interface FilterProps {
//   onFilterChange: (filterType: string) => void;
// }

// const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
//   const [filter, setFilter] = useState('');

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;
//     setFilter(value);
//     onFilterChange(value); // Notify parent component of filter change
//   };

//   return (
//     <select value={filter} onChange={handleFilterChange} className="px-4 py-2 border border-gray-300 rounded">
//       <option value="">Filter by Type</option>
//       <option value="Aviator">Aviator</option>
//       <option value="Normal User">Normal User</option>
//     </select>
//   );
// };

// export default Filter;
import React, { FC } from 'react';

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: FC<FilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <select onChange={handleFilterChange}>
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};

export default Filter;
