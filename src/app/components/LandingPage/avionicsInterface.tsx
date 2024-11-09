
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Images for Jets
import f36Image from "/public/f36Image.png";
import rafaleImage from "/public/rafaleImage.png";
import su35Image from "/public/su35Image.png";

// Images for Cockpits
import jf17_cockpit from "/public/jf17_cockpit.svg";
import cockpit_f16 from "/public/cockpit_f16.svg";
import j10c_cockpit from "/public/j10c_cockpit.svg";

const VirtualAvionics = () => {
  const router = useRouter();
  const [view, setView] = useState<"jets" | "cockpits">("jets"); // State for jets or cockpits

  // Data for Jets
  const jets = [
    { name: "F 36", image: f36Image, path: "/jets/f36" },
    { name: "Rafale", image: rafaleImage, path: "/jets/rafale" },
    { name: "SU 35", image: su35Image, path: "/jets/su35" },
  ];

  // Data for Cockpits
  const cockpits = [
    { name: "F-16 Cockpit", image: jf17_cockpit, path: "/cockpits/f16" },
    { name: "B-2 Cockpit", image: cockpit_f16, path: "/cockpits/b2" },
    { name: "MIG-29 Cockpit", image: j10c_cockpit , path: "/cockpits/mig29" },
  ];

  // Button Handlers
  const handleViewJets = () => setView("jets");
  const handleViewCockpits = () => setView("cockpits");

  // Function to handle navigation
  const handleCardClick = (path: string) => {
    router.push(path);
  };

  // Data to display (based on the view)
  const dataToDisplay = view === "jets" ? jets : cockpits;

  return (
    <section className="bg-[#0B1226] text-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Heading */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold">Virtual Avionics</h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 gap-6">
          <button
            onClick={handleViewJets}
            className={`px-6 py-3 ${
              view === "jets" ? "bg-blue-600" : "bg-none border border-white  "
            } text-white rounded-full shadow-lg hover:bg-blue-600 transition focus:outline-none`}
          >
            View Jets
          </button>
          <button
            onClick={handleViewCockpits}
            className={`px-6 py-3 ${
              view === "cockpits" ? "bg-blue-600" : "bg-none border border-white "
            } text-white rounded-full shadow-lg hover:bg-blue-600 transition focus:outline-none`}
          >
            View Cockpits
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dataToDisplay.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.path)}
              className="bg-[#101a3f] rounded-lg shadow-lg hover:shadow-2xl transition p-4 cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="rounded-lg mb-4"
                width={500}
                height={300}
              />
              <h3 className="text-xl font-bold text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualAvionics;
