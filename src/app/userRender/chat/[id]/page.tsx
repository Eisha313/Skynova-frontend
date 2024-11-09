
// // app/chat/[userId]/page.tsx
// import React from 'react';
// import { WebSocketProvider } from '../../../userComponents/websocket';
// import Chat from '../../../userComponents/chat/chatComponent';

// const ChatPage = ({ params }: { params: { id: string } }) => {
//     const { id } = params;

//     return (
//         <WebSocketProvider>
//             <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600">
//                 <Chat id={id} receiverID={receiverID} />
//             </div>
//         </WebSocketProvider>
//     );
// };

// export default ChatPage;
// pages/chat/[userId].tsx
'use client'
import React, { useEffect } from 'react';
import { WebSocketProvider } from '../../../userComponents/websocket';
import Chat from '../../../userComponents/chat/chatComponent';
import { ReceiverProvider, useReceiver } from '../../../components/context/receiverContext'

const ChatPage = ({ params }: { params: { userId: string; receiverId: string } }) => {
  const { setReceiverId } = useReceiver();

  useEffect(() => {
    setReceiverId(params.receiverId); // Set receiverId when the page loads
  }, [params.receiverId, setReceiverId]);

  return (
    <WebSocketProvider>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600">
        <Chat id={params.userId} />
      </div>
    </WebSocketProvider>
  );
};

const ChatPageWrapper = (props: any) => (
  <ReceiverProvider>
    <ChatPage {...props} />
  </ReceiverProvider>
);

export default ChatPageWrapper;
