// 'use client';
// import Image from 'next/image';
// import React from 'react';
// import { useUser } from '../context/userContext';
// import { FaSignOutAlt, FaUserCircle, FaSun } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import { signOut } from 'next-auth/react';
// import axios from 'axios';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import ProfileModal from '../viewprofile';
// import { useState,useEffect } from 'react';



// const Header: React.FC = () => {
//   const { firstName, lastName, role, profileImage,email, _id ,setUser } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isProfileModalOpen, setProfileModalOpen] = useState(false);

//   const handleProfileClick = () => {
//     setProfileModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setProfileModalOpen(false);
//   };
//   useEffect(() => {
  
//     console.log('User info updated:', { firstName, lastName, role, profileImage });
//   }, [firstName, lastName, role, profileImage,_id]);
// console.log(profileImage)
//   const handleLogout = async () => {
//     const isConfirmed = window.confirm('Are you sure you want to log out?');
    
//     if (isConfirmed) {
//       try {
//         await axios.post(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`, {}, { withCredentials: true });
//         setUser({ _id: '', firstName: '', lastName: '', role: '', email: '', token: '', profileImage: '' });
       
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         await signOut();
//         router.push('/login');
//       } catch (error) {
//         console.error('Error during logout:', error);
//       }
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg p-4 flex justify-between items-center">
      
//       <div className="flex items-center">
//         <Image src="/skylogo.svg" alt="Logo" height={60} width={100}className=" bg-gray mr-4 " /> 
        
//       </div>

      
//       <nav className="space-x-6 hidden md:flex">
//       <a
//         href="/"
//         className={`px-3 py-2 rounded-md border ${pathname === '/' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Home
//       </a>
//       <a
//         href="/userRender/view-resource"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/view-resource' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Resources
//       </a>
//       <a
//         href="/userRender/competency"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/competency' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Competency Evaluation
//       </a>
//       {/* <a
//         href="/dashboard"
//         className={`px-3 py-2 rounded-md border ${pathname === '/dashboard' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Dashboard
//       </a> */}
//       <a
//         href="/userRender/privacy/contact"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Contact Us
//       </a>
//       <a
//         href='/userRender/viewCommunityQuestions'
//         className={`px-3 py-2 rounded-md border ${pathname === '#' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Community
//       </a>
//       <a
//         href="/userRender/AboutUs"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         About Us
//       </a>

//       <a
//         href="/userRender/wings"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Wings Of Glory
//       </a>
//       <a
//         href="/cockpits"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         Cockpits
//       </a>
//       <a
//         href="/jets"
//         className={`px-3 py-2 rounded-md border ${pathname === '/userRender/AboutUs' ? 'bg-eisha text-white' : 'text-black border-gray-400 hover:bg-eisha hover:text-white'}`}
//       >
//         jets
//       </a>
//     </nav>

   
//       <div className="flex items-center space-x-4">
//         <button className="p-2 rounded-full hover:bg-gray-100">
//           <FaSun className="w-5 h-5 text-gray-700" />
//         </button>

//         {firstName ? (
//           <div className="flex items-center space-x-3">
//             <img
//               src={profileImage || '/avatar.png'}
//               alt="Profile"
//               className="w-8 h-8 rounded-full object-cover"
//               onClick={handleProfileClick}
//             />
//             <div className="text-sm">
//               <div className="font-semibold">{`${firstName} ${lastName}`}</div>
//               <div className="text-gray-500">{role}</div>
//             </div>
//             <button onClick={handleLogout} className="flex items-center p-2 rounded-md border border-eisha text-balck hover:bg-eisha  hover:text-white">
//               <FaSignOutAlt className="w-5 h-5 mr-2" />
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex space-x-4">
//             <Link href="/login" className="border border-eisha text-black px-4 py-2 rounded-md hover:bg-eisha hover:text-white">
//               Sign In
//             </Link>
//             <Link href="/signup" className="border border-eisha text-black px-4 py-2 rounded-md hover:bg-eisha hover:text-white">
//               Sign Up
//             </Link>
//           </div>
//         )}
//         <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseModal} />
//       </div>
//     </header>
//   );
// };

// export default Header;
// components/Header.tsx






















// 'use client';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { useUser } from '../context/userContext';
// import { FaSignOutAlt, FaUserCircle, FaSun } from 'react-icons/fa';
// import { useRouter, usePathname } from 'next/navigation';
// import { signOut } from 'next-auth/react';
// import axios from 'axios';
// import Link from 'next/link';
// import ProfileModal from '../viewprofile';

// const Header: React.FC = () => {
//   const { firstName, lastName, role, profileImage, setUser } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isProfileModalOpen, setProfileModalOpen] = useState(false);
//   const [isExtrasOpen, setExtrasOpen] = useState(false);

//   const handleProfileClick = () => {
//     setProfileModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setProfileModalOpen(false);
//   };

  
//   const handleLogout = async () => {
//         const isConfirmed = window.confirm('Are you sure you want to log out?');
        
//         if (isConfirmed) {
//           try {
//             await axios.post(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`, {}, { withCredentials: true });
//             setUser({ _id: '', firstName: '', lastName: '', role: '', email: '', token: '', profileImage: '' });
           
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//             await signOut();
//             router.push('/login');
//           } catch (error) {
//             console.error('Error during logout:', error);
//           }
//         }
//       };
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 bg-opacity-70 shadow-lg p-4 flex justify-between items-center">
//       <div className="flex items-center">
//         <Image src="/skylogo.svg" alt="Logo" height={60} width={100} className="mr-4" />
//       </div>

//       {/* Navigation Links */}
//       <nav className="space-x-6 hidden md:flex items-center border border-white">
//         <Link href="/" className={`px-3 py-2 rounded-md ${pathname === '/' ? 'text-white border-b-2 border-teal-500' : 'text-gray-300 hover:text-white'}`}>
//           Home
//         </Link>
//         <Link href="/userRender/view-resource" className={`px-3 py-2 rounded-md ${pathname === '/userRender/view-resource' ? 'text-white border-b-2 border-teal-500' : 'text-gray-300 hover:text-white'}`}>
//           Resources
//         </Link>
//         <Link href="/userRender/competency" className={`px-3 py-2 rounded-md ${pathname === '/userRender/competency' ? 'text-white border-b-2 border-teal-500' : 'text-gray-300 hover:text-white'}`}>
//           Competency Evaluation
//         </Link>

//         {/* Extras Dropdown */}
//         <div className="relative">
//           <button onClick={() => setExtrasOpen(!isExtrasOpen)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">
//             Extras
//           </button>
//           {isExtrasOpen && (
//             <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md py-2 z-20">
//               <Link href="/userRender/wings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 Wings of Glory
//               </Link>
//               <Link href="/userRender/view-resource" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 Resource Library
//               </Link>
              
//               <Link href="/userRender/viewCommunityQuestions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 Community
//               </Link>

//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Profile or Authentication */}
//       <div className="flex items-center space-x-4">
//         <button className="p-2 rounded-full hover:bg-gray-100">
//           <FaSun className="w-5 h-5 text-gray-300" />
//         </button>

//         {firstName ? (
//           <div className="flex items-center space-x-3">
//             <img src={profileImage || '/avatar.png'} alt="Profile" className="w-8 h-8 rounded-full object-cover" onClick={handleProfileClick} />
//             <div className="text-sm text-white">
//               <div className="font-semibold">{`${firstName} ${lastName}`}</div>
//               <div className="text-gray-400">{role}</div>
//             </div>
//             <button onClick={handleLogout} className="flex items-center p-2 rounded-md border border-gray-300 hover:bg-red-600 hover:text-white">
//               <FaSignOutAlt className="w-5 h-5" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex space-x-4">
//             <Link href="/login" className="border border-gray-300 text-white px-4 py-2 rounded-md hover:bg-teal-500">
//               Sign In
//             </Link>
//             <Link href="/signup" className="border border-gray-300 text-white px-4 py-2 rounded-md hover:bg-teal-500">
//               Sign Up
//             </Link>
//           </div>
//         )}
//         <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseModal} />
//       </div>
//     </header>
//   );
// };

// export default Header;
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import { FaSignOutAlt, FaUserCircle, FaSun } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import ProfileModal from '../viewprofile';

const Header: React.FC = () => {
  const { firstName, lastName, role, profileImage, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isExtrasOpen, setExtrasOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setProfileModalOpen(false);
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
      try {
        await axios.post(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`,
          {},
          { withCredentials: true }
        );
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
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-80 shadow-lg p-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src="/skylogo.svg" alt="Logo" height={60} width={100} className="mr-4" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 items-center">
        {[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/userRender/view-resource' },
          { name: 'Competency Evaluation', path: '/userRender/competency' },
        ].map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`px-3 py-2 rounded-md transition-colors duration-300 ${
              pathname === link.path
                ? 'text-white border-b-2 border-t-2 border-teal-500'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Extras Dropdown */}
        <div className="relative">
          <button onClick={() => setExtrasOpen(!isExtrasOpen)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">
            Extras
          </button>
          {isExtrasOpen && (
            <div className="absolute top-10 left-0 bg-gray-900 shadow-lg rounded-md py-2 z-20">
              <Link href="/userRender/wings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                Wings of Glory
              </Link>
              <Link href="/userRender/viewCommunityQuestions" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                Community
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Profile or Authentication */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaSun className="w-5 h-5 text-gray-300" />
        </button>

        {firstName ? (
          <div className="flex items-center space-x-3">
            <img
              src={profileImage || '/avatar.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
            <div className="text-sm text-white">
              <div className="font-semibold">{`${firstName} ${lastName}`}</div>
              <div className="text-gray-400">{role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center p-2 rounded-md border border-gray-300 hover:bg-red-600 hover:text-white"
            >
              <FaSignOutAlt className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/login" className="border border-gray-300 text-white px-4 py-2 rounded-md hover:bg-teal-500">
              Sign In
            </Link>
            <Link href="/signup" className="border border-gray-300 text-white px-4 py-2 rounded-md hover:bg-teal-500">
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
