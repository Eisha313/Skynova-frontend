// // "use client";
// // import React, { useState } from "react";

// // type SearchFilterProps = {
// //   onSearch: (term: string) => void;
// //   onFilter: (type: string) => void;
// // };

// // const SearchFilterBar: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   return (
// //     <div className="flex flex-wrap gap-4 items-center justify-center mb-8 mt-16">
// //       <input
// //         type="text"
// //         value={searchTerm}
// //         onChange={(e) => {
// //           setSearchTerm(e.target.value);
// //           onSearch(e.target.value);
// //         }}
// //         placeholder="Search resources..."
// //         className="flex-1 px-4 py-2 rounded-lg bg-[#0F172A] border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //       />
// //       <select onChange={(e) => onFilter(e.target.value)}  className="px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
// //         <option value="">All Types</option>
// //         <option value="movie">Movie</option>
// //         <option value="documentary">Documentary</option>
// //         <option value="quote">Quote</option>
// //       </select>
      
// //     </div>
// //   );
// // };

// // export default SearchFilterBar;
// "use client";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

// type SearchFilterProps = {
//   onSearch: (term: string) => void;
//   onFilter: (type: string) => void;
// };

// const SearchFilterBar: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleClearSearch = () => {
//     setSearchTerm("");
//     onSearch("");
//   };
 
  
//   return (
//     <div className="flex flex-wrap gap-4 items-center justify-center mb-8 mt-16">
//       <div className="relative flex-1">
        
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             onSearch(e.target.value);
//           }}
//           placeholder="Search resources..."
//           className="w-full pl-10 pr-10 py-2 rounded-lg h-9 border-[#B5B5B540] text-sm placeholder-[#B5B5B540]focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute inset-y-0 right-0 flex items-center pr-3">
//           <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
//         </span>
//         {searchTerm && (
//           <button
//             onClick={handleClearSearch}
//             className="absolute inset-y-0 right-0 flex items-center pr-3"
//           >
//             <FontAwesomeIcon icon={faTimes} className="text-gray-400" />
//           </button>
//         )}
//       </div>
//       <select
//         onChange={(e) => onFilter(e.target.value)}
//         className="px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">All Types</option>
//         <option value="movie">Movie</option>
//         <option value="documentary">Documentary</option>
//         <option value="quote">Quote</option>
//         <option value="hero">Heroes</option>
//       </select>
//     </div>
//   );
// };

// export default SearchFilterBar;
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

type SearchFilterProps = {
  onSearch: (term: string) => void;
  onFilter: (type: string) => void;
};

const SearchFilterBar: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-8 mt-16">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search resources..."
          className="w-full pl-10 pr-10 py-2 rounded-lg h-9 border-[#B5B5B540] text-sm placeholder-[#B5B5B540] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </span>
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-400" />
          </button>
        )}
      </div>
      
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="documentary">Documentary</option>
        <option value="quote">Quote</option>
        <option value="hero">Heroes</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
