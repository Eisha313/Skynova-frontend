"use client";
import React from "react";
import Header from "../components/LandingPage/header";
import { useRouter } from "next/router";
// import Header from "../components/LandingPage/header";

const page = () => {
  // const router = useRouter()

  return (
    <div>
      <Header />
      <p className="text-center text-3xl text-white font-bold mt-36 mb-[-12]">AIRCRAFTS</p>
      <div className="w-full flex justify-center flex-wrap mt-24 gap-5 px-5">
        <div className="relative rounded-lg h-96 w-96 shadow-lg overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg z-20">
            <h3>F16</h3>
          </div>
          <img className="absolute top-14 left-0 w-full h-72 object-cover z-10" src="/F16.svg" alt="Rafale" />
          <a
            href="/jets/f16-jet"
            className="absolute grid place-items-center bottom-0 left-0 w-full bg-blue-600 text-white border-none cursor-pointer transition duration-300 h-12 font-bold text-lg z-20 hover:bg-blue-800"
          >
            View in 3D
          </a>
        </div>
        <div className="relative rounded-lg h-96 w-96 shadow-lg overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg z-20">
            <h3>J10c</h3>
          </div>
          <img className="absolute top-14 left-0 w-full h-72 object-cover z-10" src="/j10c.svg" alt="F-16" />
          <a
            href="/jets/j10c-jet"
            className="absolute grid place-items-center bottom-0 left-0 w-full bg-blue-600 text-white border-none cursor-pointer transition duration-300 h-12 font-bold text-lg z-20"
          >
            View in 3D
          </a>
        </div>
        <div className="relative rounded-lg h-96 w-96 shadow-lg overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg z-20">
            <h3>JF-17-Thunder</h3>
          </div>
          <img className="absolute top-14 left-0 w-full h-72 object-cover z-10" src="/jf17.svg" alt="JF-17-Thunder" />
          <a
            href="/jets/jf17-jet"
            className="absolute grid place-items-center bottom-0 left-0 w-full bg-blue-600 text-white border-none cursor-pointer transition duration-300 h-12 font-bold text-lg z-20 hover:bg-blue-800"
            // onClick={() => router.push("/JF17")}
          >
            View in 3D
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
