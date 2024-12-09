// SkyNovaOffers.tsx
import React from "react";
import { FaUserAlt, FaStethoscope, FaRocket, FaQuestionCircle, FaTasks, FaRobot } from "react-icons/fa";

const SkyNovaOffers = () => {
  const cards = [
    {
      icon: <FaQuestionCircle />,
      title: "Aptitude Tests",
      description: "Evaluate your cognitive abilities and problem-solving skills with our detailed aptitude tests designed for all levels.",
    },
    {
      icon: <FaStethoscope />,
      title: "Medical Tests",
      description: "Access and perform a variety of medical tests to monitor and understand your health better.",
    },
    {
      icon: <FaRocket />,
      title: "Sky Venture Mode",
      description: "Embark on exciting adventures, pushing your limits while exploring uncharted horizons.",
    },
    {
      icon: <FaTasks />,
      title: "Quizzes",
      description: "Challenge yourself with quizzes that help measure your understanding and knowledge on various topics.",
    },
    {
      icon: <FaUserAlt />,
      title: "Missions",
      description: "Engage in tasks and missions tailored to enhance your expertise and skill set.",
    },
    {
      icon: <FaRobot />,
      title: "Ask AI",
      description: "Get instant, intelligent answers to your queries and resolve doubts with the power of AI.",
    },
  ];
  

  return (
    <section className="bg-custom-image py-16 px-6 flex justify-center">
      <div className="max-w-screen-xl mx-auto text-center">
      <div className="flex flex-col items-center mb-8">
  <div className="flex items-center">
    <div className="w-16 h-1 bg-blue-500"></div>
    <h2 className="text-white text-4xl font-semibold font-inter mx-4">SkyNova Offers</h2>
    <div className="w-16 h-1 bg-blue-500"></div>
  </div>
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
              className="w-0 h-0 bg-transparent border-l-[50px] border-r-[50px] border-b-[50px] border-l-transparent border-r-transparent border-b-[#0B1226] absolute -bottom-[9px] rotate-[135deg] -right-[35px] before:content-[''] before:block before:w-[95px] before:absolute before:top-[49px] before:-left-[47px] before:h-px before:bg-white/50 group-hover:before:bg-blue-500 transition-all"
              ></div> 
              <div
                className="text-4xl flex justify-center text-white  group-hover:text-blue-500 p-4"    
              >
                {card.icon}
              </div>
              <h3 className="text-xl text-center text-white font-semibold mb-4 group-hover:text-blue-500">
                {card.title}
              </h3>
              <p className="text-white  text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkyNovaOffers;
