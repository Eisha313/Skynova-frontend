'use client';
import Image from 'next/image';
import React from 'react';
import { useUser } from '../context/userContext';
import { FaSignOutAlt, FaUserCircle, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ProfileModal from '../viewprofile';
import { useState,useEffect } from 'react';



const Header: React.FC = () => {
  const { firstName, lastName, role, profileImage,email, _id ,setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setProfileModalOpen(false);
  };
  useEffect(() => {
  
    console.log('User info updated:', { firstName, lastName, role, profileImage });
  }, [firstName, lastName, role, profileImage,_id]);
console.log(profileImage)
  const handleLogout = async () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    
    if (isConfirmed) {
      try {
        await axios.post(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`, {}, { withCredentials: true });
        setUser({ _id: '', firstName: '', lastName: '', role: '', email: '', token: '', profileImage: '' });
       
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        await signOut();
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg p-4 flex justify-between items-center">
      
      <div className="flex items-center">
        <Image src="/skylogo.svg" alt="Logo" height={60} width={100}className=" bg-gray mr-4 " /> 
        
      </div>

      
      <nav className="space-x-6 hidden md:flex">
      <a
        href="/"
        className={`px-3 py-2 rounded-md border ${pathname === '/' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Home
      </a>
      <a
        href="/userRender/view-resource"
        className={`px-3 py-2 rounded-md border ${pathname === '/userRender/view-resource' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Resources
      </a>
      <a
        href="/userRender/competency"
        className={`px-3 py-2 rounded-md border ${pathname === '/userRender/competency' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Competency Evaluation
      </a>
      {/* <a
        href="/dashboard"
        className={`px-3 py-2 rounded-md border ${pathname === '/dashboard' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Dashboard
      </a> */}
      <a
        href="/userRender/privacy/contact"
        className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Contact Us
      </a>
      <a
        href='/userRender/viewCommunityQuestions'
        className={`px-3 py-2 rounded-md border ${pathname === '#' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        Community
      </a>
      <a
        href="/userRender/AboutUs"
        className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
      >
        About Us
      </a>
    </nav>

   
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaSun className="w-5 h-5 text-gray-700" />
        </button>

        {firstName ? (
          <div className="flex items-center space-x-3">
            <img
              src={profileImage || '/avatar.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              onClick={handleProfileClick}
            />
            <div className="text-sm">
              <div className="font-semibold">{`${firstName} ${lastName}`}</div>
              <div className="text-gray-500">{role}</div>
            </div>
            <button onClick={handleLogout} className="flex items-center p-2 rounded-md border border-eisha text-balck hover:bg-eisha  hover:text-white">
              <FaSignOutAlt className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/login" className="border border-eisha text-black px-4 py-2 rounded-md hover:bg-eisha hover:text-white">
              Sign In
            </Link>
            <Link href="/signup" className="border border-eisha text-black px-4 py-2 rounded-md hover:bg-eisha hover:text-white">
              Sign Up
            </Link>
          </div>
        )}
        <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseModal} />
      </div>
    </header>
  );
};

export default Header;
