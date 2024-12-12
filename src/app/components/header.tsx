"use client";
import React from "react";
import { useUser } from "./context/userContext";
import { FaSun, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";

const Header: React.FC = () => {
  const { firstName, lastName, role, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to log outttttttt?");

    if (isConfirmed) {
      try {
        await axios.post(`https://sky-nova-8ccaddc754ce.herokuapp.com/users/logout`, {}, { withCredentials: true });

        setUser({ _id: "", firstName: "", lastName: "", role: "", email: "", token: " ", profileImage: "" });
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        console.log("Signin out using signout function");

        // document.cookie.split(";").forEach((c) => {
        //   document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        // });

        await signOut({
          redirect: false,
        }).then(() => {
          router.push("/");
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <header className="flex items-center justify-between p-2 bg-eisha shadow-md text-white">
      {/* Left Side */}
      <div className="flex items-center">
        {/* <div className="flex border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 px-2 text-gray-700 flex-grow border-r text-sm"
          />
          <button className="bg-blue-500 text-white p-1 flex items-center justify-center">
            <FaSearch className="w-4 h-4" />
          </button>
        </div> */}
      </div>

      <div className="flex items-center space-x-4 text-white">
        {/* <button className="p-2 rounded-full hover:bg-gray-100">
          <FaSun className="w-5 h-5 text-white" />
        </button> */}
        <button className="p-2 rounded-full hover:bg-blue-100">
          <FaBell className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center space-x-3">
          {/* <FaUserCircle className="w-7 h-7 text-white" /> */}
          <div className="text-sm">
            <div className="font-semibold">{firstName}</div>
            <div className="text-white">{role}</div>
          </div>
        </div>
        <div className="bg-gray-200 p-2 rounded-full flex items-center space-x-4">
          {/* <FaCog className="w-5 h-5 text-gray-500" /> */}
          <button onClick={handleLogout} className="focus:outline-none">
            <FaSignOutAlt className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
