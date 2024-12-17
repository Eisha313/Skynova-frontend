import React from "react";
import Header from "../components/LandingPage/header";
// import Header from "@/components/Header";


const page = () => {
  return (
    <div>
      <p className="text-center text-white text-3xl font-bold mt-8 mb-[-12px]">
        COCKPITS
      </p>
      <div className="flex justify-center flex-wrap mt-24 gap-5 px-5">
        <div className="relative rounded-lg h-96 w-96 shadow-md overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg">
            <h3>F16 cockpit</h3>
          </div>
          <img
            className="absolute top-12 left-0 w-full h-[295px] object-cover z-1"
            src="cockpit_f16.svg"
            alt="F16 Cockpit"
          />
          <a
            href="/cockpits/f16-cockpit"
            className="absolute bottom-0 left-0 w-full bg-[#1286B5] text-white border-none cursor-pointer transition-colors duration-300 hover:bg-[#0303D4] h-15 font-bold text-lg z-2"
          >
            View in 3D
          </a>
        </div>
        <div className="relative rounded-lg h-96 w-96 shadow-md overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg">
            <h3>JF-17 Thunder cockpit</h3>
          </div>
          <img
            className="absolute top-12 left-0 w-full h-[295px] object-cover z-1"
            src="JF17_cockpit.svg"
            alt="JF-17 Thunder Cockpit"
          />
          <a
            href="/cockpits/jf17-cockpit"
            className="absolute bottom-0 left-0 w-full bg-[#1286B5] text-white border-none cursor-pointer transition-colors duration-300 hover:bg-[#0303D4] h-15 font-bold text-lg z-2"
          >
            View in 3D
          </a>
        </div>
        <div className="relative rounded-lg h-96 w-96 shadow-md overflow-hidden text-center transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full h-12 flex justify-center items-center text-white font-bold text-lg">
            <h3>J-10c cockpit</h3>
          </div>
          <img
            className="absolute top-12 left-0 w-full h-[295px] object-cover z-1"
            src="j10c_cockpit.svg"
            alt="J-10c Cockpit"
          />
          <a
            href="/cockpits/j10c-cockpit"
            className="absolute bottom-0 left-0 w-full bg-[#1286B5] text-white border-none cursor-pointer transition-colors duration-300 hover:bg-[#0303D4] h-15 font-bold text-lg z-2"
          >
            View in 3D
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
