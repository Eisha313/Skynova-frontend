'use client'; // Ensure this component is rendered on the client-side

import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface InfoContainerProps {
  icon: React.ReactNode;
  heading: string;
  count: number;
  link: string; 
}

const InfoContainer: React.FC<InfoContainerProps> = ({ icon, heading, count, link }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-500 rounded-lg">
          {icon}
        </div>
        
        <div>
          <div className="text-gray-700 text-md ">{heading}</div>
          <div className="text-black font-bold">{count}</div>
        </div>
      </div>
      {/* Right Arrow */}
      <Link href={link}>
        <FaArrowRight className="w-6 h-8 text-blue-500 hover:text-dark-blue hover:bg-blue-200 rounded-full p-2 transition-colors ml-1" />
      </Link>
    </div>
  );
};

export default InfoContainer;
