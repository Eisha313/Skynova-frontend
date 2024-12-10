'use client';
import { useState } from 'react';
import Link from 'next/link';
import SecondaryNavbar from "../userComponents/SecondaryNavbar";
import Header from '@/app/components/LandingPage/header';


export default function HandGestures() {
  const [activeNavItem, setActiveNavItem] = useState('Home'); // Default active navbar title
  const [activeTab, setActiveTab] = useState('gestures'); // Active tab for buttons

  const navItems = ['Home', 'Evaluation', 'Avionics', 'Missions', 'Quizzes', 'Extras'];

  

 

  return (
    <div className='bg-custom-image'>
      <Header/>

      <SecondaryNavbar/>

      {/* Video Section */}
      <div className="max-w-5xl mx-auto flex justify-center items-center">
        <iframe
          width="100%" 
          height="500"
          src="https://www.youtube.com/embed/As7zQPkkv8c"
          title="Aircraft Carriers Crew hand signals explained - preflight and launch"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 m-[16px] space-y-12 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-[#ffffff] text-center">
          The Art of Hand Signals in Aviation
        </h2>
        <p className="text-lg leading-relaxed text-center text-white">
          Hand signals are a vital part of aviation, particularly in environments where verbal communication is
          impractical. Ground crew members use specific gestures to direct pilots during ground operations,
          including parking, preflight checks, and aircraft launches.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          {/* Text Section */}
          <div className="space-y-6">
            <h3 className="text-2xl text-white font-semibold">1. Common Hand Signals</h3>
            <p className="text-lg text-white ">
              Examples of universal hand gestures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-white ">
              <li>
                <strong>Stop Signal:</strong> Both arms crossed above the head.
              </li>
              <li>
                <strong>Move Forward:</strong> Arms extended forward and beckoning inward.
              </li>
              <li>
                <strong>Turn Left or Right:</strong> Corresponding arm extended outward, other arm moving in a circular motion.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 text-white ">2. Communication Without Words</h3>
            <p className="text-lg text-white ">
              In busy environments, such as aircraft carriers or airports, these gestures ensure safety, reduce miscommunication,
              and allow seamless coordination between the crew and pilots.
            </p>
            <h3 className="text-2xl font-semibold mt-8 text-white ">
              3. Training for Precision 
            </h3>
            <p className="text-lg leading-relaxed text-white ">
              Ground crew undergo extensive training to master these gestures. Precision and clarity are crucial to ensure
              that pilots understand the instructions, even in noisy or low-visibility conditions.
            </p>
          </div>
          
          <div className="space-y-4">
            <img
              src="/sign1.jpg"
              alt="Crew member signaling to aircraft"
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        
</div>
  <div>
    <div className="w-full max-w-5xl mx-auto">
      <img
        src="/firepower.gif"
        alt="Crew member signaling to aircraft"
        className="rounded-lg shadow-lg object-cover w-full"
      />
    </div>
  </div>
  </div>
    
  );
}
