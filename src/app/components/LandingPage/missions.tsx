import React from 'react';


const missions = [
  {
    title: 'Touch Down',
    description: 'Navigate through turbulent skies and land safely at Paradise Airport.',
    objective: 'Land within 500ft of runway threshold',
    difficulty: 'Medium',
    reward: '500 Flight Points',
    image: '/jahaz.svg',
  },
  {
    title: 'Skybound',
    description: 'Take off from Downtown Airfield and reach cruising altitude.',
    objective: 'Reach 30,000ft within 5 minutes',
    difficulty: 'Easy',
    reward: '500 Flight Points',
    image: '/jahaz.svg',
  },
  {
    title: 'Strike Eagle',
    description: 'Engage in aerial combat and neutralize all targets in the zone.',
    objective: 'Destroy 10 enemy jets',
    difficulty: 'Hard',
    reward: '1000 Flight Points',
    image: '/jahaz.svg',
  },
];

const VRMissions: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">VR Missions</h2>
        {missions.map((mission, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Mission Image */}
            <div className="w-full md:w-1/2">
              <img
                src={mission.image}
                alt={mission.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Mission Content */}
            <div className="w-full md:w-1/2 md:px-8 mt-6 md:mt-0">
              <h3 className="text-2xl font-semibold mb-4">{mission.title}</h3>
              <p className="mb-2">
                <span className="font-bold">Description: </span>
                {mission.description}
              </p>
              <p className="mb-2">
                <span className="font-bold">Objective: </span>
                {mission.objective}
              </p>
              <p className="mb-2">
                <span className="font-bold">Difficulty: </span>
                {mission.difficulty}
              </p>
              <p className="mb-4">
                <span className="font-bold">Reward: </span>
                {mission.reward}
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
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
