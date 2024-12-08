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

const WebSocketContext = createContext<{
  socket: Socket | null;
  currentConversation: Conversation | null;
  setCurrentConversation: (conversation: Conversation) => void;
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
} | null>(null);

export type User = {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
};

export type Message = {
  _id: string;
  senderID: string;
  receiverID: string;
  content: string;
  type: string;
  status: string;
  time: string;
  sender?: User;
  receiver?: User;
};

export type Conversation = {
  _id: string;
  conversationId: string;
  lastMessage?: Message;
  otherUser?: User;
};

export type SocketMessage = {
  senderID: string;
  receiverID: string;
  content: string;
  type: string;
  status: string;
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  //   userID: string;
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { _id } = useUser();

  useEffect(() => {
    const socketInstance = io("http://localhost:4000", {
      transports: ["websocket"],
      query: {
        userId: _id,
      },
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [_id]);

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected");

    socket?.on("chat message", (message: SocketMessage) => {
      console.log("Received message", message);

      const conversationId =
        message.senderID > message.receiverID
          ? message.senderID + message.receiverID
          : message.receiverID + message.senderID;

      const newMessage = {
        _id: "",
        senderID: message.senderID,
        receiverID: message.receiverID,
        content: message.content,
        type: message.type,
        status: message.status,
        time: new Date().toISOString(),
        sender: conversations.find((conversation) => conversation.otherUser?._id === message.senderID)?.otherUser,
        receiver: conversations.find((conversation) => conversation.otherUser?._id === message.receiverID)?.otherUser,
      };
      if (conversationId === currentConversation?.conversationId) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        showNotification(newMessage);
      }

      const newConversations = conversations.map((conversation) => {
        if (conversation.conversationId === conversationId) {
          conversation.lastMessage = newMessage;
        }
        return conversation;
      });

      setConversations(newConversations);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket, currentConversation, conversations]);

  // Request notification permission
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

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        currentConversation,
        setCurrentConversation,
        conversations,
        setConversations,
        messages,
        setMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
