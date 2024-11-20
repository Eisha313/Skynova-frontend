// 'use client'
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import io, { Socket } from 'socket.io-client';

// const WebSocketContext = createContext<Socket | null>(null);

// export const useWebSocket = () => {
//     return useContext(WebSocketContext);
// };

// export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [socket, setSocket] = useState<Socket | null>(null);

//     useEffect(() => {
//         const socketInstance = io('https://sky-nova-8ccaddc754ce.herokuapp.com', {
//             transports: ['websocket'],
//         });
//         setSocket(socketInstance);

//         return () => {
//             socketInstance.disconnect();
//         };
//     }, []);

//     return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
// };

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useUser } from "../components/context/userContext";

const WebSocketContext = createContext<Socket | null>(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  //   userID: string;
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { _id } = useUser();

  useEffect(() => {
    const socketInstance = io("http://localhost:4000", {
      transports: ["websocket"],
      // extraHeaders: {
      //     token: "ASJHFKJAHSFJKHASF"
      // },
      query: {
        userId: _id,
      },
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [_id]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
