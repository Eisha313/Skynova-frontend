"use client";

// import { Conversation, useChatContext } from "@/app/components/context/chatContext";
import { useUser } from "@/app/components/context/userContext";
import Footer from "@/app/components/LandingPage/footer";
import Header from "@/app/components/LandingPage/header";
import { Conversation, Message, useWebSocket } from "@/app/userComponents/websocket";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllChats = () => {
  const searchParams = useSearchParams();

  const userId = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const { token, _id } = useUser();
  const context = useWebSocket();
  const conversations = context?.conversations;
  const currentConversation = context?.currentConversation;
  const messages = context?.messages;
  const setConversations = context?.setConversations;
  const setCurrentConversation = context?.setCurrentConversation;
  const setMessages = context?.setMessages;
  const router = useRouter();
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    setLoadingConversation(true);
    fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewConversations", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const dataWithConversationId = data.map((conversation: Conversation) => {
          const userId = conversation.otherUser?._id;
          const myId = _id;

          conversation.conversationId = userId && myId ? (userId > myId ? userId + myId : myId + userId) : "";
        });
        setConversations && setConversations(dataWithConversationId);
      })
      .catch((error) => {
        console.error("Error fetching aviator:", error);
      })
      .finally(() => {
        setLoadingConversation(false);
      });
  }, [token, _id, setConversations]);

  useEffect(() => {
    if (userId) {
      const conversation = conversations?.find((conversation) => conversation.otherUser?._id === userId);
      if (conversation) {
        setCurrentConversation && setCurrentConversation(conversation);
      } else {
        const conversationId = userId > _id ? userId + _id : _id + userId;
        const newConversation: Conversation = {
          _id: userId,
          conversationId: conversationId,
          otherUser: {
            _id: userId,
            firstName: firstName || "New",
            lastName: lastName || "User",
            profileImage: "https://via.placeholder.com/150",
            role: "Aviator",
            email: "",
            password: "",
          },
        };

        setCurrentConversation && setCurrentConversation(newConversation);
      }
    }
  }, [userId, conversations, setCurrentConversation]);

  useEffect(() => {
    const getMessages = (conversationId: string) => {
      setLoadingMessages(true);
      fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/messages/viewConversation/${conversationId}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Messages:", data);
          setMessages && setMessages(data ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        })
        .finally(() => {
          setLoadingMessages(false);
        });
    };

    if (currentConversation) {
      getMessages(currentConversation._id);
    }
  }, [currentConversation, token, setMessages]);

  return (
    <div className="flex flex-col h-[calc(100%-250px)] bg-custom-image">
      <Header />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 h-[calc(100vh-250px)] overflow-hidden mt-24 flex">
          {/* Conversations List */}
          <div className="w-96 bg-white shadow-md border-r">
            <div className="p-4 border-b bg-gray-50">
              <h1 className="text-xl font-bold text-gray-800">Chats</h1>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-250px)]">
              {loadingConversation ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading Conversations...</p>
                </div>
              ) : (
                conversations &&
                conversations.length &&
                conversations.map((conversation: Conversation) => (
                  <div
                    key={conversation._id}
                    className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-100 transition
                    ${currentConversation?._id === conversation._id ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      setCurrentConversation && setCurrentConversation(conversation);
                      router.push(
                        `/userRender/chat?id=${conversation._id}&firstName=${conversation.otherUser?.firstName}&lastName=${conversation.otherUser?.lastName}`
                      );
                    }}
                  >
                    <img
                      src={conversation.otherUser?.profileImage || "https://via.placeholder.com/150"}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4 flex-1 overflow-hidden">
                      <h2 className="text-lg font-semibold truncate">
                        {conversation.otherUser?.firstName} {conversation.otherUser?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage?.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {currentConversation ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center p-4 border-b bg-white shadow-sm">
                  <img
                    src={currentConversation.otherUser?.profileImage || "https://via.placeholder.com/150"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                      {currentConversation.otherUser?.firstName} {currentConversation.otherUser?.lastName}
                    </h2>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-250px)]">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                      <p>Loading Messages...</p>
                    </div>
                  ) : (
                    messages &&
                    messages.length &&
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex mb-4 ${message.senderID === _id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                          max-w-[70%] p-3 rounded-lg
                          ${message.senderID === _id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
                        `}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs opacity-70 block text-right mt-1">
                            {new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <MessageInput
                  onSendMessage={(message) => {
                    console.log("Sending message:", message);
                  }}
                  currentConversation={currentConversation}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const MessageInput = ({
  onSendMessage,
  currentConversation,
}: {
  onSendMessage: (message: string) => void;
  currentConversation: Conversation | null;
}) => {
  const [message, setMessage] = useState("");
  const { _id } = useUser();
  const context = useWebSocket();

  const setMessages = context?.setMessages;
  const messages = context?.messages;
  const socket = context?.socket;

  // const handleSendMessage = () => {
  //   if (message.trim() && currentConversation) {
  //     onSendMessage(message);
  //     setMessage("");
  //   }
  // };

  const handleSendMessage = async () => {
    if (!message.trim() || !currentConversation) return;

    try {
      const newMessage: Message = {
        senderID: _id,
        receiverID: currentConversation._id,
        content: message.trim(),
        _id: Math.random().toString(),
        time: new Date().toISOString(),
        type: "text",
        status: "Sent",
      };
      if (setMessages) {
        const newMessages = messages ? [...messages, newMessage] : [newMessage];
        setMessages(newMessages);
      }
      socket?.emit("chat message", newMessage);
      setMessage("");
      // setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-white border-t p-4 flex items-center space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        disabled={!currentConversation}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={!currentConversation || message.trim() === ""}
      >
        Send
      </button>
    </div>
  );
};

export default AllChats;
