import React from "react";

const missions = [
  {
    title: "Touch Down",
    description:
      "Navigate through turbulent skies and land safely at Paradise Airport.",
    objective: "Land within 500ft of runway threshold",
    difficulty: "Medium",
    reward: "500 Flight Points",
    image: "/jahaz.svg",
  },
  {
    title: "Skybound",
    description: "Take off from Downtown Airfield and reach cruising altitude.",
    objective: "Reach 30,000ft within 5 minutes",
    difficulty: "Easy",
    reward: "500 Flight Points",
    image: "/jahaz.svg",
  },
  {
    title: "Strike Eagle",
    description:
      "Engage in aerial combat and neutralize all targets in the zone.",
    objective: "Destroy 10 enemy jets",
    difficulty: "Hard",
    reward: "1000 Flight Points",
    image: "/jahaz.svg",
  },
];


const VRMissions: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">VR Missions</h2>
        {missions.map((mission, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center mb-12 h-96 relative overflow-hidden`}
          >
            <div className={`w-[63%] absolute top-0 bottom-0  ${ index % 2 === 0 ? "landing-page-image-container left-0":"landing-page-image-container-reverse right-0"}`}>
              <img src={mission.image}  className="w-full h-full object-cover"/>
            </div>
            {/* <div className={`w-[49%] flex items-center justify-center absolute top-0 bottom-0  bg-[#212C44] ${ index % 2 === 0 ? "landing-page-text-container right-0":"landing-page-text-container-reverse left-0"}`}>
            <h3 className="text-2xl font-semibold mb-4">{mission.title}</h3>
              <p className="mb-3">{mission.description}</p>
              <p className="mb-3">
                <strong>Objective:</strong> {mission.objective}
              </p>
              <p className="mb-3">
                <strong>Difficulty:</strong> {mission.difficulty}
              </p>
              <p className="mb-4">
                <strong>Reward:</strong> {mission.reward}
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                Play
              </button>
            </div> */}
<div
  className={`w-[49%] flex flex-col items-start justify-center align-center absolute top-0 bottom-0 bg-[#212C44] p-6 rounded-lg shadow-lg ${
    index % 2 === 0
      ? "landing-page-text-container right-0"
      : "landing-page-text-container-reverse left-0"
  }`}
>
  <h3 className="text-2xl font-semibold mb-4 text-white">
    {mission.title}
  </h3>
  <p className="mb-3 text-gray-300">{mission.description}</p>
  <p className="mb-3 text-gray-300">
    <strong>Objective:</strong> {mission.objective}
  </p>
  <p className="mb-3 text-gray-300">
    <strong>Difficulty:</strong> {mission.difficulty}
  </p>
  <p className="mb-4 text-gray-300">
    <strong>Reward:</strong> {mission.reward}
  </p>
  <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
    Play
  </button>
</div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default VRMissions;
