
'use client';
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../websocket';
import axios from 'axios'; 

interface Message {
  _id: string;
  user: string;
  text: string;
}

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessageText, setEditedMessageText] = useState<string>('');
  const socket = useWebSocket();

 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewMessages');
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat message', (msg: Message) => {
      setChatHistory((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket]);

  // Send new message and save it to backend
  const handleSendMessage = async () => {
    if (!message.trim() || !socket) return; 

    const msg: Message = {
      _id: '', 
      user: id || 'User',
      text: message,
    };

    try {
      
      socket.emit('chat message', msg);

     
      const response = await axios.post('https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage', msg);

      setChatHistory((prev) => [...prev, response.data]);

      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/deleteMessage/${messageId}`);
      setChatHistory((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Edit message
  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message._id);
    setEditedMessageText(message.text);
  };

  // Save the edited message to backend
  const handleSaveEditedMessage = async () => {
    if (!editedMessageText.trim() || !editingMessageId) return;
    try {
      await axios.patch(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/updateMessage/${editingMessageId}`, {
        text: editedMessageText,
      });
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg._id === editingMessageId ? { ...msg, text: editedMessageText } : msg
        )
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
      <div className="p-4 overflow-y-auto" style={{ height: '400px' }}>
        {chatHistory.map((msg) => (
          <div key={msg._id} className="mb-4">
            {editingMessageId === msg._id ? (
              <div className="flex items-end">
                <input
                  value={editedMessageText}
                  onChange={(e) => setEditedMessageText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleSaveEditedMessage}
                  className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-end">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-center flex items-center justify-center font-bold text-gray-600 mr-3">
                  {msg.user[0].toUpperCase()}
                </div>
                <div className="bg-gray-100 p-3 rounded-lg shadow">
                  <span className="block font-semibold text-blue-600">{msg.user}</span>
                  <span className="block">{msg.text}</span>
                </div>
                <button
                  onClick={() => handleEditMessage(msg)}
                  className="ml-2 bg-yellow-500 text-white py-1 px-3 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="ml-2 bg-red-500 text-white py-1 px-3 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
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
