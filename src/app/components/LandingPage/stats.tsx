// Stats.tsx
import React from 'react';

const statsData = [
  { value: '100+', label: 'Fighter Jets' },
  { value: '50+', label: 'Missions' },
  { value: '200M+', label: 'Lifetime Users' },
];

const Stats = () => {
  return (
    <div className="bg-[#0B132B] text-white py-12 px-8 flex justify-center gap-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-[#1C2541] py-8 px-6 rounded-lg shadow-lg"
        >
          <h2 className="text-4xl font-bold">{stat.value}</h2>
          <p className="text-lg mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
