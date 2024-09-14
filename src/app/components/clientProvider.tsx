// app/components/ClientProviders.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './context/userContext';
import { MantineProvider } from '@mantine/core';

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <MantineProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
