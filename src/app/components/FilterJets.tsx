import { useState } from 'react';

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState('');

  // Correct the type to handle a 'select' element change
  const handleFilterInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    onFilterChange(newValue); // Pass the selected filter value back to the parent component
  };

  return (
    <div>
      <select
        onChange={handleFilterInputChange}
        value={filterValue}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-eisha focus:outline-none focus:border-eisha focus:ring-1 focus:ring-eisha"
      >
        <option value="">Filter</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default Filter;
