// SkyNovaOffers.tsx
import React from "react";
import { FaUserAlt, FaStethoscope, FaRocket, FaQuestionCircle, FaTasks, FaRobot } from "react-icons/fa";

const SkyNovaOffers = () => {
  const cards = [
    {
      icon: <FaQuestionCircle />,
      title: "Aptitude Tests",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
    },
    {
      icon: <FaStethoscope />,
      title: "Medical Tests",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
    },
    {
      icon: <FaRocket />,
      title: "Sky Venture Mode",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
    },
    {
      icon: <FaTasks />,
      title: "Quizzes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
    },
    {
      icon: <FaUserAlt />,
      title: "Missions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
    },
    {
      icon: <FaRobot />,
      title: "Ask AI",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor urna sit amet vehicula porttitor.",
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
              className="group relative bg-[#0D1A36] border border-gray-600 rounded-lg px-6 py-8 text-left transition-all hover:border-blue-500 hover:bg-[#112141] hover:shadow-lg"
            >
              <div
                className="text-4xl text-white mb-4 group-hover:text-blue-500"
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
