
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useWebSocket } from "../websocket";
import axios from "axios";
import {
  AiOutlinePaperClip,
  AiOutlineSend,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

interface Message {
  _id: string;
  content: string;
  type: "text" | "image" | "document" | "video";
  status: "Sent" | "Delivered" | "Read";
  senderID: string;
  receiverID: string;
}

interface ChatProps {
  id: string;
  receiverID: string;
}

const Chat: React.FC<ChatProps> = ({ id, receiverID }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessageText, setEditedMessageText] = useState<string>("");
  const socket = useWebSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewMessages?senderID=${id}&receiverID=${receiverID}`
        );
        setChatHistory(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id, receiverID]);


  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (msg: Message) => {
      setChatHistory((prev) => [...prev, msg]);



      
      if (msg.senderID !== id && document.visibilityState !== "visible") {

        showNotification(msg);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    else{
      console.log("Permission is already granted")
    }
  }, []);

  const showNotification = (msg: Message) => {
    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: msg.content,
        icon: "/google.svg", 
      });
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return;

    const msg: Partial<Message> = {
      content: message,
      type: file
        ? file.type.startsWith("image")
          ? "image"
          : "document"
        : "text",
      status: "Sent",
      senderID: id,
      receiverID: id,
    };

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", JSON.stringify(msg));
        response = await axios.post(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage",
          
          formData
        );
      } else {
        response = await axios.post(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage",
          msg
        );
      }

      setChatHistory((prev) => [...prev, msg as Message]);
      socket?.emit("chat message", msg);
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/deleteMessage/${messageId}`
      );
      setChatHistory((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
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
        prev.map((msg) =>
          msg._id === editingMessageId
            ? { ...msg, content: updatedMessage.data.content }
            : msg
        )
      );
      setEditingMessageId(null);
      setEditedMessageText("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

return(

// <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg flex flex-col h-screen">
 
//   <div className="bg-[#1286B5] text-white text-center py-4 rounded-t-lg">
//     <h1 className="text-2xl font-semibold">Chat</h1>
//   </div>

  
//   <div className="flex-1 p-4 overflow-y-auto space-y-4">
//     {chatHistory.map((msg) => (
//       <div
//         key={msg._id}
//         className={`flex ${
//           msg.senderID === id ? "justify-end" : "justify-start"
//         }`}
//       >
//         <div
//           className={`p-3 max-w-xs rounded-lg shadow ${
//             msg.senderID === id
//               ? "bg-blue-500 text-white self-end"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           {msg.content}
//         </div>
//       </div>
//     ))}
//   </div>


//   <div className="p-4 bg-gray-50 flex items-center gap-2 border-t">
//     <label className="cursor-pointer">
//       <AiOutlinePaperClip className="text-gray-500 text-2xl" />
//       <input type="file" className="hidden" />
//     </label>
//     <textarea
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       className="flex-1 px-4 py-2 border rounded-lg"
//       placeholder="Type your message..."
//     />
//     <button
//       onClick={handleSendMessage}
//       className="bg-[#1286B5] text-white p-3 rounded-lg"
//     >
//       <AiOutlineSend />
//     </button>
//   </div>
// </div>
<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg flex flex-col h-screen">
 
  <div className="bg-[#1286B5] text-white text-center py-4 rounded-t-lg">
    <h1 className="text-2xl font-semibold">Chat</h1>
  </div>

  
  <div className="flex-1 p-4 overflow-y-auto space-y-4">
    {chatHistory.map((msg) => (
      <div
        key={msg._id}
        className={`flex ${
          msg.senderID === id ? "justify-end" : "justify-start"
        } relative`}
      >
        
        <div
          className={`p-3 max-w-xs rounded-lg shadow relative ${
            msg.senderID === id
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {editingMessageId === msg._id ? (
            <div>
              <textarea
                value={editedMessageText}
                onChange={(e) => setEditedMessageText(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={handleSaveEditedMessage}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingMessageId(null)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            msg.content
          )}
        </div>

        {/* Dots Menu */}
        {msg.senderID === id && (
          <div className="relative ml-2">
            <button
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={() => setEditingMessageId(editingMessageId === msg._id ? null : msg._id)}
            >
              ⋮
            </button>

            
            {editingMessageId === msg._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border z-10">
                <button
                  onClick={() => {
                    setEditingMessageId(msg._id);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <AiOutlineEdit className="inline-block mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  <AiOutlineDelete className="inline-block mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    ))}
  </div>

  
  <div className="p-4 bg-gray-50 flex items-center gap-2 border-t">
    <label className="cursor-pointer">
      <AiOutlinePaperClip className="text-gray-500 text-2xl" />
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 px-4 py-2 border rounded-lg"
      placeholder="Type your message..."
    />
    <button
      onClick={handleSendMessage}
      className="bg-[#1286B5] text-white p-3 rounded-lg"
    >
      <AiOutlineSend />
    </button>
  </div>
</div>



  );
}; 

export default Chat;