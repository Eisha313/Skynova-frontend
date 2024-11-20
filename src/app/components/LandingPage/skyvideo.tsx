import Image from 'next/image';
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/hero-section-background.gif" 
        />
      </div>

     
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
  
        <Image
          src="/nova.png" 
          alt="Logo"
          width={150}
          height={150}
          className="animate-pulse"
        />

        
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Navigating The skies 
        </h1>
      </div>
    </div>
  );
};

export default Background;
