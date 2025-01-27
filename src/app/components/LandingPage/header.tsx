"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "../context/userContext";
import { FaSignOutAlt, FaUserCircle, FaSun } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import ProfileModal from "../viewprofile";
import { toast } from "react-toastify";

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

  const handleDownload = (link: string) => {
    const a = document.createElement("a");
    a.href = link;
    a.download = link;
    a.click();

    toast.success("Download started!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      try {
        await axios.post(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`, {}, { withCredentials: true });
        setUser({ _id: "", firstName: "", lastName: "", role: "", email: "", token: "", profileImage: "" });

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        signOut({
          redirect: false,
          // callbackUrl: "https://localhost:3000/",
        }).then(() => {
          setTimeout(() => {
            router.push("/");
          }, 1000);
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <header className=" absolute top-0 left-0 w-full z-50  bg-opacity-80 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/skylogo.svg" alt="Logo" height={60} width={100} className="mr-4" />
      </div>

      <nav className="hidden md:flex space-x-6 items-stretch px-10 bg-[#7E7E7E4D] border border-white/30 rounded-full">
        {[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/userRender/view-resource" },
        
          { name: "Jets", path: "/jets" },
          { name: "Cockpits", path: "/cockpits" },
          

          ...(firstName
            ? [
                { name: "Certificates", path: "/userRender/certificate-list" },
                { name: "Chats", path: "/userRender/chat" },
                
                { name: "Medical Test", path: "/medicalTest" },
                { name: "Quiz", path: "/userRender/quiz" },
                { name: "Competency Evaluation", path: "/userRender/competency" },
              ]
            : []),
        ].map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`px-3 py-6 flex items-center text-center rounded-md relative transition-colors duration-300 ${
              pathname === link.path ? "text-white font-bold" : "text-gray-300 hover:text-white"
            }`}
          >
            {pathname === link.path && (
              <>
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-20px)]
 h-[5px] rounded-b-lg bg-blue-300  shadow-blue-300 shadow-[0px_3px_27px_0px_#B5EAFF]"
                />
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-20px)]
 h-[5px] rounded-t-lg bg-blue-300 shadow-[0px_3px_27px_0px_#B5EAFF]"
                />
              </>
            )}
            {link.name}
          </Link>
        ))}
        <div className="relative flex items-center">
          <button
            onClick={() => setExtrasOpen(!isExtrasOpen)}
            className={`px-3 py-2 rounded-md ${
              pathname.startsWith("/userRender/wings") || pathname.startsWith("/userRender/viewCommunityQuestions")
                ? "text-white border-b-4 border-t-4 border-[#5AA0BC]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Extras
          </button>
          {isExtrasOpen && (
            <div className="absolute top-10 left-0 bg-gray-900 shadow-lg rounded-md py-2 z-20">
              <Link href="/userRender/wings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                Wings of Glory
              </Link>
              <Link
                href="/userRender/viewCommunityQuestions"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Community
              </Link>
              <Link href="/emergencyTactics" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                Emergency Tactics
              </Link>
              {/* <a href="/skyventure-mod.rar" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                Emergency Tactics
              </a> */}
              <button
                onClick={() => {
                  handleDownload("/skyventure-mod.rar");
                }}
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Download Skyventure Mod
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100"></button>

        {firstName ? (
          <div className="flex items-center space-x-3">
            <img
              src={profileImage || "/avatar.png"}
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
