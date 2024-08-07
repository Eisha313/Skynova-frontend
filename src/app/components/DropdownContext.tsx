





// 'use client'
// import React, { createContext, useContext, useState } from 'react';

// interface DropdownContextProps {
//   openDropdown: string | null;
//   setOpenDropdown: (dropdown: string | null) => void;
//   currentPath: string;
//   setCurrentPath: (path: string) => void;
// }

// const DropdownContext = createContext<DropdownContextProps>({
//   openDropdown: null,
//   setOpenDropdown: () => {},
//   currentPath: '',
//   setCurrentPath: () => {},
// });

// export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [currentPath, setCurrentPath] = useState<string>('');

//   return (
//     <DropdownContext.Provider value={{ openDropdown, setOpenDropdown, currentPath, setCurrentPath }}>
//       {children}
//     </DropdownContext.Provider>
//   );
// };

// export const useDropdown = () => useContext(DropdownContext);
'use client';

import React, { createContext, useContext, useState } from 'react';

interface DropdownContextProps {
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
}

const DropdownContext = createContext<DropdownContextProps>({
  openDropdown: null,
  setOpenDropdown: () => {},
});

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
