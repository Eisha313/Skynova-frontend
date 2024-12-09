'use client';

import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function SocialContactUs() {
  const instagramUrl = 'https://www.instagram.com/eishakamranabbasi'; 
  const facebookUrl = 'https://www.facebook.com/eishakamran'; 
  const twitterUrl = 'https://www.twitter.com/eishakamran';
  const gmailUrl = 'mailto:eishakamran313@gmail.com'; // Replace with your Gmail address

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-custom-image" 
        //  style={{ backgroundImage: "url('/socialMedia.png')" }}
         >
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6 text-white">Contact Us Through Social Media</h1>

        <div className="flex flex-col space-y-7">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-600 text-white p-4 rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            <FaFacebook size={24} className="mr-2" />
            <span>Contact via Facebook</span>
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            <FaInstagram size={24} className="mr-2" />
            <span>Contact via Instagram</span>
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-600 text-white p-4 rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            <FaTwitter size={24} className="mr-2" />
            <span>Contact via Twitter</span>
          </a>
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-red-600 text-white p-4 rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            <FaEnvelope size={24} className="mr-2" />
            <span>Contact via Gmail</span>
          </a>
        </div>
      </div>
    </div>
  );
}
