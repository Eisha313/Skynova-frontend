'use client'
import React, { useEffect } from 'react';

const Chatbot: React.FC = () => {
  useEffect(() => {
  
    window.embeddedChatbotConfig = {
      chatbotId: "KGWcBS9EgMvLa3y65qWIE",
      domain: "www.chatbase.co",
    };

   
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', "KGWcBS9EgMvLa3y65qWIE");
    script.setAttribute('domain', "www.chatbase.co");
    script.defer = true;
    
    document.body.appendChild(script);

    return () => {
    
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      
      {/* <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-9 ml-7">Chat!</h2>
        
      </div> */}
    </div>
  );
};

export default Chatbot;
