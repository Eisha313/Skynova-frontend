// SkyNovaOffers.tsx
import React from "react";
import { FaUserAlt, FaStethoscope, FaRocket, FaQuestionCircle, FaTasks, FaRobot } from "react-icons/fa";

const SkyNovaOffers = () => {
  const cards = [
    {
      icon: <FaQuestionCircle />,
      title: "Aptitude Tests",
      description: "Assess your skills and knowledge with our comprehensive aptitude tests.",
    },
    {
      icon: <FaStethoscope />,
      title: "Medical Tests",
      description:"Perform the medical tests"
    },
    {
      icon: <FaRocket />,
      title: "Sky Venture Mode",
      description: "Explore the horizons",
    },
    {
      icon: <FaTasks />,
      title: "Quizzes",
      description: "Perform quizzes to see where you stand..",
    },
    {
      icon: <FaUserAlt />,
      title: "Missions",
      description: "Perform missions to polish your skills",
    },
    {
      icon: <FaRobot />,
      title: "Ask AI",
      description: "Clear the ambiguities with AI",
    },
  ];

  return (
    <section className="bg-[#0B1226] py-16 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-white text-3xl font-semibold mb-4">SkyNova Offers</h2>
        <div className="flex justify-center items-center mb-8">
          <div className="w-12 h-1 bg-blue-500"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-[rgb(192,192,192,0.1)] shadow-gray-400 border-white/50 border px-6 py-8 text-left transition-all hover:border-blue-500 hover:bg-[#112141]"
            >
              <div
              className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[50px] border-l-transparent border-r-transparent border-b-[#0B1226] absolute -top-[9px] -rotate-45 -left-[35px] before:content-[''] before:block before:w-[95px] before:absolute before:top-[49px] before:-left-[47px] before:h-px before:bg-white/50 group-hover:before:bg-blue-500 transition-all"
              ></div>
               <div
              className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[50px] border-l-transparent border-r-transparent border-b-[#0B1226] absolute -bottom-[9px] rotate-[135deg] -right-[35px] before:content-[''] before:block before:w-[95px] before:absolute before:top-[49px] before:-left-[47px] before:h-px before:bg-white/50 group-hover:before:bg-blue-500 transition-all"
              ></div> 
              <div
                className="text-4xl text-white mb-4 group-hover:text-blue-500 p-4"    
              >
                {card.icon}
              </div>
              <h3 className="text-xl text-white font-semibold mb-2 group-hover:text-blue-500">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkyNovaOffers;
