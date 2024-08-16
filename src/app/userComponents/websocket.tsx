'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const WebSocketContext = createContext<Socket | null>(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io('wss://sky-nova-8ccaddc754ce.herokuapp.com'); 
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};
