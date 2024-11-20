// 'use client';

// import React from 'react';
// import { useParams } from 'next/navigation';
// import { WebSocketProvider } from '../../../userComponents/websocket';
// import Chat from '../../../userComponents/chat/chatComponent';

// const ChatPage = () => {
//   const params = useParams();
//   const id = typeof params.id === 'string' ? params.id : params.id?.[0] || '';
//   const receiverID =
//     typeof params.receiverID === 'string' ? params.receiverID : params.receiverID?.[0] || '';

//   return (
//     <WebSocketProvider>
//       <div className="min-h-screen flex items-center justify-center">
//         <Chat id={id} receiverID={receiverID} />
//       </div>
//     </WebSocketProvider>
//   );
// };

// export default ChatPage;
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WebSocketProvider } from "../../../userComponents/websocket";
import Chat from "../../../userComponents/chat/chatComponent";

const ChatPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const userID = params.id;
  const id = typeof params.id === "string" ? params.id : params.id?.[0] || "";

  return (
    <WebSocketProvider>
      <div className="min-h-screen flex items-center justify-center">
        <Chat id={id} receiverID={userID} />
      </div>
    </WebSocketProvider>
  );
};

export default ChatPage;
