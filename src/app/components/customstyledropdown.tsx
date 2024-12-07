// import React from 'react';
// import Select, { StylesConfig, OptionProps } from 'react-select';


// const customStyles: StylesConfig = {
//   control: (styles) => ({
//     ...styles,
//     backgroundColor: 'transparent',
//     borderColor: '#ffffff4d',
//     padding: '8px 12px',
//     borderRadius: '1rem',
//   }),
//   option: (styles, { isFocused, isSelected }: OptionProps) => ({
//     ...styles,
//     backgroundColor: isFocused ? '#5AA0BC' : 'transparent',
//     color: isSelected ? 'white' : '#ffffff',
//     padding: '10px 20px',
//     borderRadius: '0.5rem',
//     ':active': {
//       backgroundColor: '#5AA0BC',
//     },
//   }),
// };

// interface DropdownProps {
//   filterStatus: string;
//   handleFilterChange: (selectedOption: { value: string; label: string }) => void;
// }

// const Dropdown: React.FC<DropdownProps> = ({ filterStatus, handleFilterChange }) => (
//   <Select
//     value={{ label: filterStatus, value: filterStatus }}
//     onChange={handleFilterChange}
//     options={[
//       { label: 'All Statuses', value: 'All' },
//       { label: 'Active', value: 'Active' },
//       { label: 'Inactive', value: 'Inactive' },
//     ]}
//     styles={customStyles}
//   />
// );

// export default Dropdown;
