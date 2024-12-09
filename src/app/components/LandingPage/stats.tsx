// import React from 'react';
// import CountUp from 'react-countup';
// import { useInView } from 'react-intersection-observer';

// const statsData = [
//   { value: 100, label: 'Fighter Jets', suffix: '+' },
//   { value: 50, label: 'Missions', suffix: '+' },
//   { value: 200, label: 'Lifetime Users', suffix: 'M+' },
// ];

// const Stats = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.2, 
//     triggerOnce: true, 
//   });

//   return (
//     <div ref={ref} className="bg-[#0B132B] text-white py-12 px-8 flex justify-center gap-8">
//       {statsData.map((stat, index) => (
//         <div
//           key={index}
//           className="flex flex-col items-center bg-[#1C2541] py-8 px-6 rounded-lg shadow-lg min-h-[100px] min-w-[100px] "
//         >
//           <h2 className="text-4xl font-bold">
//             {inView ? (
//               <CountUp
//                 start={0}
//                 end={stat.value}
//                 duration={2} 
//                 suffix={stat.suffix}
//               />
//             ) : (
//               `0${stat.suffix}`
//             )}
//           </h2>
//           <p className="text-lg mt-2">{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stats;
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const statsData = [
  { value: 100, label: 'Fighter Jets', suffix: '+' },
  { value: 50, label: 'Missions', suffix: '+' },
  { value: 200, label: 'Lifetime Users', suffix: 'M+' },
];

const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true, 
  });

  return (
    <div ref={ref} className="bg-[#0B132B] text-white py-12 px-8 flex justify-center gap-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-[#1C2541] py-8 px-6 rounded-lg shadow-lg w-[300px] h-[200px] justify-center" // Ensuring equal height and width
        >
          <h2 className="text-4xl font-bold">
            {inView ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2} 
                suffix={stat.suffix}
              />
            ) : (
              `0${stat.suffix}`
            )}
          </h2>
          <p className="text-lg mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
