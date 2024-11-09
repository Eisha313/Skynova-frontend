
// 'use client';

// import React, { useState, useEffect, ChangeEvent } from 'react';
// import { useWebSocket } from '../websocket';
// import axios from 'axios';
// import { AiOutlinePaperClip, AiOutlineSend, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// interface Message {
//   _id: string;
//   content: string;
//   type: 'text' | 'image' | 'document' | 'video';
//   status: 'Sent' | 'Delivered' | 'Read';
//   senderID: string;
//   receiverID: string;
// }

// interface ChatProps {
//   id: string; // Current user's ID
//   receiverID: string; 
// }

// const Chat: React.FC<ChatProps> = ({ id, receiverID }) => {
//   const [message, setMessage] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
//   const [editedMessageText, setEditedMessageText] = useState<string>('');
//   const socket = useWebSocket();

//   // Fetch chat history
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewMessages?senderID=${id}&receiverID=${receiverID}`
//         );
//         const messages = response.data.map((msg: Message) => ({
//           ...msg,
//           senderID: msg.senderID || 'Unknown',
//         }));
//         setChatHistory(messages);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();
//   }, [id, receiverID]);


//   useEffect(() => {
//     if (!socket) return;
//     socket.on('chat message', (msg: Message) => {
//       setChatHistory((prev) => [...prev, msg]);
//     });
//     return () => {
//       socket.off('chat message');
//     };
//   }, [socket]);

//   // Handle sending messages
//   const handleSendMessage = async () => {
//     if (!message.trim() && !file) return;

//     const msg: Partial<Message> = {
//       content: message,
//       type: file ? (file.type.startsWith('image') ? 'image' : 'document') : 'text',
//       status: 'Sent',
//       senderID: id,
//       receiverID,
//     };

//     try {
//       let response;
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('message', JSON.stringify(msg));
//         response = await axios.post(
//           'https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage',
//           formData
//         );
//       } else {
//         response = await axios.post(
//           'https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage',
//           msg
//         );
//       }

//       setChatHistory((prev) => [...prev, response.data]);
//       socket?.emit('chat message', response.data);
//       setMessage('');
//       setFile(null);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   // Delete message
//   const handleDeleteMessage = async (messageId: string) => {
//     try {
//       await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/deleteMessage/${messageId}`);
//       setChatHistory((prev) => prev.filter((msg) => msg._id !== messageId));
//     } catch (error) {
//       console.error('Error deleting message:', error);
//     }
//   };

//   // Edit message
//   const handleEditMessage = (message: Message) => {
//     setEditingMessageId(message._id);
//     setEditedMessageText(message.content);
//   };

//   // Save edited message
//   const handleSaveEditedMessage = async () => {
//     if (!editedMessageText.trim() || !editingMessageId) return;
//     try {
//       const updatedMessage = await axios.patch(
//         `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/updateMessage/${editingMessageId}`,
//         { content: editedMessageText }
//       );
//       setChatHistory((prev) =>
//         prev.map((msg) => (msg._id === editingMessageId ? { ...msg, content: updatedMessage.data.content } : msg))
//       );
//       setEditingMessageId(null);
//       setEditedMessageText('');
//     } catch (error) {
//       console.error('Error updating message:', error);
//     }
//   };

//   return (
//     <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
//       <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
//         <h1 className="text-2xl font-semibold">Chat Room</h1>
//       </div>

//       {/* Chat history */}
//       <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
//         {chatHistory.map((msg) => (
//           <div key={msg._id} className="mb-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
//                 {msg.senderID ? msg.senderID[0].toUpperCase() : '?'}
//               </div>
//               <div className="bg-gray-100 p-3 rounded-lg shadow">
//                 <span className="block font-semibold text-blue-600">{msg.senderID}</span>
//                 {editingMessageId === msg._id ? (
//                   <textarea
//                     value={editedMessageText}
//                     onChange={(e) => setEditedMessageText(e.target.value)}
//                     className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
//                   />
//                 ) : (
//                   <span>{msg.content}</span>
//                 )}
//               </div>
//             </div>
//             {msg.senderID === id && (
//               <div className="flex space-x-2">
//                 {editingMessageId === msg._id ? (
//                   <button
//                     onClick={handleSaveEditedMessage}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <AiOutlineEdit
//                     onClick={() => handleEditMessage(msg)}
//                     className="cursor-pointer text-yellow-500"
//                   />
//                 )}
//                 <AiOutlineDelete
//                   onClick={() => handleDeleteMessage(msg._id)}
//                   className="cursor-pointer text-red-500"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Message input */}
//       <div className="p-4 bg-gray-50 rounded-b-lg flex items-center">
//         <label className="cursor-pointer">
//           <AiOutlinePaperClip className="text-gray-500 text-2xl mr-4" />
//           <input type="file" className="hidden" onChange={handleFileChange} />
//         </label>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="Type your message..."
//           rows={1}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           <AiOutlineSend />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
// userComponents/chat/chatComponent.tsx
// userComponents/chat/chatComponent.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useWebSocket } from '../websocket';
import { useReceiver } from '../../components/context/receiverContext' // Import the context hook
import axios from 'axios';
import { AiOutlinePaperClip, AiOutlineSend, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface Message {
  _id: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'video';
  status: 'Sent' | 'Delivered' | 'Read';
  senderID: string;
  receiverID: string; // Keep receiverID here if your backend uses it
}

interface ChatProps {
  id: string; // Current user's ID
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const { receiverId } = useReceiver(); // Access receiverId from context
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessageText, setEditedMessageText] = useState<string>('');
  const socket = useWebSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return; // If receiverId is not available, don't fetch
      try {
        const response = await axios.get(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewMessages?senderID=${id}&receiverID=${receiverId}`
        );
        const messages = response.data.map((msg: Message) => ({
          ...msg,
          senderID: msg.senderID || 'Unknown',
        }));
        setChatHistory(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id, receiverId]); // Add receiverId to the dependencies

  useEffect(() => {
    if (!socket) return;
    socket.on('chat message', (msg: Message) => {
      setChatHistory((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, [socket]);

  const handleSendMessage = async () => {
    if (!message.trim() && !file || !receiverId) return;

    const msg: Partial<Message> = {
      content: message,
      type: file ? (file.type.startsWith('image') ? 'image' : 'document') : 'text',
      status: 'Sent',
      senderID: id,
      receiverID: receiverId, // Use receiverId here
    };

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('message', JSON.stringify(msg));
        response = await axios.post(
          'https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage',
          formData
        );
      } else {
        response = await axios.post(
          'https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage',
          msg
        );
      }

      setChatHistory((prev) => [...prev, response.data]);
      socket?.emit('chat message', response.data);
      setMessage('');
      setFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/deleteMessage/${messageId}`);
      setChatHistory((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message._id);
    setEditedMessageText(message.content);
  };

  const handleSaveEditedMessage = async () => {
    if (!editedMessageText.trim() || !editingMessageId) return;
    try {
      const updatedMessage = await axios.patch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/updateMessage/${editingMessageId}`,
        { content: editedMessageText }
      );
      setChatHistory((prev) =>
        prev.map((msg) => (msg._id === editingMessageId ? { ...msg, content: updatedMessage.data.content } : msg))
      );
      setEditingMessageId(null);
      setEditedMessageText('');
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
      <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Chat Room</h1>
      </div>

      {/* Chat history */}
      <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
        {chatHistory.map((msg) => (
          <div key={msg._id} className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
                {msg.senderID ? msg.senderID[0].toUpperCase() : '?'}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <span className="block font-semibold text-blue-600">{msg.senderID}</span>
                {editingMessageId === msg._id ? (
                  <textarea
                    value={editedMessageText}
                    onChange={(e) => setEditedMessageText(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  />
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            </div>
            {msg.senderID === id && (
              <div className="flex space-x-2">
                {editingMessageId === msg._id ? (
                  <button
                    onClick={handleSaveEditedMessage}
                    className="text-green-500 hover:text-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <AiOutlineEdit
                    onClick={() => handleEditMessage(msg)}
                    className="cursor-pointer text-yellow-500"
                  />
                )}
                <AiOutlineDelete
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="p-4 flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="mr-2 cursor-pointer">
          <AiOutlinePaperClip size={24} />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <AiOutlineSend
          onClick={handleSendMessage}
          className="cursor-pointer text-blue-600 ml-2"
          size={24}
        />
      </div>
    </div>
  );
};

export default Chat;
