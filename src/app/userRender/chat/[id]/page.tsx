
// import React from 'react';
// import { WebSocketProvider } from '../../../userComponents/websocket';
// import Chat from '../../../userComponents/chat/chatComponent';

// const ChatPage: React.FC = () => {
//     return (
//         <WebSocketProvider>
//             <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600">
//                 <Chat />
//             </div>
//         </WebSocketProvider>
//     );
// };

// export default ChatPage;
// app/chat/[userId]/page.tsx
import React from 'react';
import { WebSocketProvider } from '../../../userComponents/websocket';
import Chat from '../../../userComponents/chat/chatComponent';

const ChatPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return (
        <WebSocketProvider>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600">
                <Chat id={id} />
            </div>
        </WebSocketProvider>
    );
};

export default ChatPage;
