import Image from 'next/image';
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/hero-section-background.gif" 
          height={450}
          width={450}
        />
      </div>

     
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
  
        <Image
          src="/nova.png" 
          alt="Logo"
          width={800}
          height={800}
          className="animate-pulse"
        />

        
        <h1 className="text-white text-xl md:text-2xl italic">
          Navigating The skies 
        </h1>
      </div>
    </div>
  );
};

export default Background;
