"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useWebSocket } from "../websocket";
import axios from "axios";
import { AiOutlinePaperClip, AiOutlineSend, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useUser } from "@/app/components/context/userContext";

interface Message {
  _id: string;
  content: string;
  type: "text" | "image" | "document" | "video";
  status: "Sent" | "Delivered" | "Read";
  senderID: string;
  receiverID: string;
}

interface ChatProps {
  receiverID: string;
}

const Chat: React.FC<ChatProps> = ({ receiverID }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessageText, setEditedMessageText] = useState<string>("");
  const context = useWebSocket();
  const socket = context?.socket;
  const { _id } = useUser();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewMessages?senderID=${_id}&receiverID=${receiverID}`
        );
        setChatHistory(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [receiverID]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (msg: Message) => {
      setChatHistory((prev) => [...prev, msg]);

      if (msg.senderID !== _id && document.visibilityState !== "visible") {
        showNotification(msg);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket, _id]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      console.log("Permission is already granted");
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
      type: file ? (file.type.startsWith("image") ? "image" : "document") : "text",
      status: "Sent",
      senderID: _id,
      receiverID: receiverID,
    };

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", JSON.stringify(msg));
        response = await axios.post("https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage", formData);
      } else {
        response = await axios.post("https://sky-nova-8ccaddc754ce.herokuapp.com/messages/createMessage", msg);
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
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/deleteMessage/${messageId}`);
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
        prev.map((msg) => (msg._id === editingMessageId ? { ...msg, content: updatedMessage.data.content } : msg))
      );
      setEditingMessageId(null);
      setEditedMessageText("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    //     <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
    //       <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
    //         <h1 className="text-2xl font-semibold">Chat</h1>
    //       </div>
    //       <div className="p-4 overflow-y-auto" style={{ height: "400px" }}>
    //         {chatHistory.map((msg) => (
    //           <div key={msg._id} className="mb-4 flex items-center justify-between">
    //             <div className="flex items-center">
    //               <div className="bg-gray-100 p-3 rounded-lg shadow">
    //                 {editingMessageId === msg._id ? (
    //                   <textarea
    //                     value={editedMessageText}
    //                     onChange={(e) => setEditedMessageText(e.target.value)}
    //                     className="w-full px-2 py-1 border border-gray-300 rounded-lg"
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
    //       <div className="p-4 bg-gray-50 flex items-center">
    //         <label className="cursor-pointer">
    //           <AiOutlinePaperClip className="text-gray-500 text-2xl mr-4" />
    //           <input type="file" className="hidden" onChange={handleFileChange} />
    //         </label>
    //         <textarea
    //           value={message}
    //           onChange={(e) => setMessage(e.target.value)}
    //           className="w-full px-4 py-2 border rounded-lg"
    //           placeholder="Type your message..."
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg flex flex-col h-screen">
      {/* Header */}
      <div className="bg-[#1286B5] text-white text-center py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Chat</h1>
      </div>

      {/* Chat history (scrollable area) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatHistory.map((msg) => (
          <div key={msg._id} className={`flex ${msg.senderID === _id ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 max-w-xs rounded-lg shadow ${
                msg.senderID === _id ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input area (static) */}
      <div className="p-4 bg-gray-50 flex items-center gap-2 border-t">
        <label className="cursor-pointer">
          <AiOutlinePaperClip className="text-gray-500 text-2xl" />
          <input type="file" className="hidden" />
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="bg-[#1286B5] text-white p-3 rounded-lg">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};
export default Chat;
