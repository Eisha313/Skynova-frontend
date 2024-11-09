
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ReceiverContextType {
  receiverId: string | null;
  setReceiverId: (id: string) => void;
}

const ReceiverContext = createContext<ReceiverContextType | undefined>(undefined);

export const ReceiverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [receiverId, setReceiverId] = useState<string | null>(null);

  return (
    <ReceiverContext.Provider value={{ receiverId, setReceiverId }}>
      {children}
    </ReceiverContext.Provider>
  );
};

export const useReceiver = () => {
  const context = useContext(ReceiverContext);
  if (!context) {
    throw new Error('useReceiver must be used within a ReceiverProvider');
  }
  return context;
};
