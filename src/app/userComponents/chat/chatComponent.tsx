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
    });
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

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
      receiverID,
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

      console.log(response.data);

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

  return (
    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg">
      <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
        <h1 className="text-2xl font-semibold">Chat</h1>
      </div>
      <div className="p-4 overflow-y-auto" style={{ height: "400px" }}>
        {chatHistory.map((msg) => (
          <div key={msg._id} className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                {editingMessageId === msg._id ? (
                  <textarea
                    value={editedMessageText}
                    onChange={(e) => setEditedMessageText(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
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
      <div className="p-4 bg-gray-50 flex items-center">
        <label className="cursor-pointer">
          <AiOutlinePaperClip className="text-gray-500 text-2xl mr-4" />
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
