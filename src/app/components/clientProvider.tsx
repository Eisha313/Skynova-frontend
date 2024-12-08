"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/userContext";
import { MantineProvider } from "@mantine/core";
import useAutoLogout from "./timeout";
import { WebSocketProvider } from "../userComponents/websocket";
// import { ChatProvider } from "./context/chatContext";

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useAutoLogout();
  return (
    <SessionProvider>
      <MantineProvider>
        <UserProvider>
          {/* <ChatProvider> */}
          <WebSocketProvider>{children}</WebSocketProvider>
          {/* </ChatProvider> */}
        </UserProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
