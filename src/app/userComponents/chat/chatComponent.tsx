// // components/Chat.tsx
// import React, { useState, useEffect } from 'react';
// import { useWebSocket } from '../websocket';

// interface Message {
//     user: string;
//     text: string;
// }

// const Chat: React.FC = () => {
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState<Message[]>([]);
//     const socket = useWebSocket();

//     useEffect(() => {
//         if (!socket) return;

//         socket.on('chat message', (msg: Message) => {
//             setChatHistory((prev) => [...prev, msg]);
//         });

//         return () => {
//             socket.off('chat message');
//         };
//     }, [socket]);

//     const handleSendMessage = () => {
//         if (!message.trim() || !socket) return;

//         const msg: Message = {
//             user: 'User', // Replace with dynamic user data
//             text: message,
//         };

//         socket.emit('chat message', msg);
//         setMessage('');
//     };

//     return (
//         <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
//             <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
//                 <h1 className="text-2xl font-semibold">Chat Room</h1>
//             </div>
//             <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
//                 {chatHistory.map((msg, idx) => (
//                     <div key={idx} className="mb-4">
//                         <div className="flex items-end">
//                             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
//                                 {msg.user[0].toUpperCase()}
//                             </div>
//                             <div className="bg-gray-100 p-3 rounded-lg shadow">
//                                 <span className="block font-semibold text-blue-600">
//                                     {msg.user}
//                                 </span>
//                                 <span className="block">{msg.text}</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-4 bg-gray-50 rounded-b-lg flex items-center">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     placeholder="Type your message..."
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Chat;
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useWebSocket } from '../websocket';

// interface Message {
//     user: string;
//     text: string;
// }

// const Chat: React.FC = () => {
//     const router = useRouter();
//     const { id } = router.query; // Fetch the user ID from the route
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState<Message[]>([]);
//     const socket = useWebSocket();

   
//     const user = id ? id.toString() : 'User'; // Replace with dynamic user data

//     useEffect(() => {
//         if (!socket) return;

//         socket.on('chat message', (msg: Message) => {
//             setChatHistory((prev) => [...prev, msg]);
//         });

//         return () => {
//             socket.off('chat message');
//         };
//     }, [socket]);

//     const handleSendMessage = () => {
//         if (!message.trim() || !socket) return;

//         const msg: Message = {
//             user: user, // Use the dynamic user data
//             text: message,
//         };

//         socket.emit('chat message', msg);
//         setMessage('');
//     };

//     return (
//         <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
//             <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
//                 <h1 className="text-2xl font-semibold">Chat Room</h1>
//             </div>
//             <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
//                 {chatHistory.map((msg, idx) => (
//                     <div key={idx} className="mb-4">
//                         <div className="flex items-end">
//                             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
//                                 {msg.user[0].toUpperCase()}
//                             </div>
//                             <div className="bg-gray-100 p-3 rounded-lg shadow">
//                                 <span className="block font-semibold text-blue-600">
//                                     {msg.user}
//                                 </span>
//                                 <span className="block">{msg.text}</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-4 bg-gray-50 rounded-b-lg flex items-center">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     placeholder="Type your message..."
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Chat;
// userComponents/chat/chatComponent.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../websocket';

interface Message {
    user: string;
    text: string;
}

interface ChatProps {
    id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const socket = useWebSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('chat message', (msg: Message) => {
            setChatHistory((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [socket]);

    const handleSendMessage = () => {
        if (!message.trim() || !socket) return;

        const msg: Message = {
            user: id || 'User', // Use the dynamic user data
            text: message,
        };

        socket.emit('chat message', msg);
        setMessage('');
    };

    return (
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
            <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
                <h1 className="text-2xl font-semibold">Chat Room</h1>
            </div>
            <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className="mb-4">
                        <div className="flex items-end">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
                                {msg.user[0].toUpperCase()}
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg shadow">
                                <span className="block font-semibold text-blue-600">
                                    {msg.user}
                                </span>
                                <span className="block">{msg.text}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-50 rounded-b-lg flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
