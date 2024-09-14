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
        const socketInstance = io('https://sky-nova-8ccaddc754ce.herokuapp.com', {
            transports: ['websocket'],
        });
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};
// 'use '
// import { useEffect, useState } from 'react';
// import io, { Socket } from 'socket.io-client';

// const useWebSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketIo = io('https://sky-nova-8ccaddc754ce.herokuapp.com');

//     socketIo.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });

//     socketIo.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });

//     socketIo.on('connect_error', (error) => {
//       console.error('WebSocket connection error:', error);
//     });

//     setSocket(socketIo);

//     return () => {
//       socketIo.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default useWebSocket;
