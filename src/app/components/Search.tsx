// // 'use client'
// // import { useState } from 'react';

// // interface SearchProps {
// //   onSearchChange: (searchTerm: string) => void;
// // }

// // const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const newSearchTerm = event.target.value;
// //     setSearchTerm(newSearchTerm);
// //     onSearchChange(newSearchTerm);
// //   };

// //   return (
// //     <input
// //   type="text"
// //   placeholder="Search"
// //   value={searchTerm}
// //   onChange={handleSearch}
// //   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm  hover:border-eisha   focus:outline-none focus:border-eisha focus:ring-1 focus:ring-eisha"
// // />

// //   );
// // };

// // export default Search;
// 'use client';

// import { useState } from 'react';

// interface SearchProps {
//   onSearchChange: (searchTerm: string) => void;
// }

// const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//     onSearchChange(newSearchTerm);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     onSearchChange('');
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={handleSearch}
//         className="px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-eisha focus:outline-none focus:border-eisha focus:ring-1 focus:ring-eisha w-full"
//       />
//       {searchTerm && (
//         <button
//           onClick={clearSearch}
//           className="absolute inset-y-0 right-0 flex items-center px-3"
//         >
//           <svg
//             className="w-4 h-4 text-gray-500 hover:text-gray-700"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Search;

'use client';

import { useState } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  clearSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange, clearSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value); // Call the parent method to update search term
  };

  return (
    <div className="relative w-full max-w-xs px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"> 
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className='bg-transparent border-none outline-none'
        // className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      
      />

      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3"
        >
          
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Search;
