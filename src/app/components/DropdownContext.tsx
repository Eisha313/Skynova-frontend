import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextType {
  openDropdown: string | null;
  setOpenDropdown: (text: string | null) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
