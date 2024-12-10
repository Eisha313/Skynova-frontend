'use client';
import { useState } from 'react';

import SecondaryNavbar from '../userComponents/SecondaryNavbar';
import Header from '@/app/components/LandingPage/header';
export default function CommunicationControlTower() {
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [activeTab, setActiveTab] = useState('communication'); 

  const navItems = ['Home', 'Evaluation', 'Avionics', 'Missions', 'Quizzes', 'Extras'];

  return (
    <>

<div className='bg-custom-image'>
<Header/>
<SecondaryNavbar/>
      
      <div className= "max-w-6xl mx-auto flex justify-center items-center">
        <iframe
          width="100%" 
          height="500"
          src="https://www.youtube.com/embed/mcAn_elsWG0"
          title="How To Talk To Air Traffic Control | ATC Radio Basics for Pilots"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-8 max-w-4xl mx-auto text-white">
        <h2 className="text-3xl font-bold text-[#5AA0BC]">
          {activeNavItem === 'Home' ? 'Communication with the Control Tower' : `Active Page: ${activeNavItem}`}
        </h2>
        {activeNavItem === 'Home' && (
          <>
            <h3 className="text-2xl font-semibold">1. Understanding Aviation Language</h3>
            <p className="text-lg">
              Aviation communication is a vital skill for maintaining safety and efficiency. Below are key components of the aviation language:
            </p>
            <ul className="space-y-4 text-lg">
              <li>
                <strong>Phonetic Alphabet:</strong> Pilots use the NATO phonetic alphabet (e.g., Alpha for A, Bravo for B) to spell out letters, ensuring clarity even in noisy environments.
              </li>
              <li>
                <strong>Unique Number Pronunciation:</strong> Numbers are pronounced uniquely to avoid miscommunication. Examples include niner for nine and fife for five.
              </li>
              <li>
                <strong>Concise Phraseology:</strong> Standardized phrases like "Cleared for takeoff" and "Hold short" minimize ambiguity. Pilots respond with terms like Roger (received) and Wilco (will comply).
              </li>
              <li>
                <strong>Universal Time (UTC):</strong> All communication uses Coordinated Universal Time (UTC) to prevent confusion across time zones.
              </li>
              <li>
                <strong>Stress on Readbacks:</strong> Pilots repeat back instructions to confirm understanding. For example:
                <br />
                <em>ATC:</em> Climb to flight level 350. <br />
                <em>Pilot:</em> Climbing to flight level 350.
              </li>
              <li>
                <strong>Emergency Communication:</strong> Distress calls like Mayday (life-threatening) and Pan-Pan (urgent, but non-critical) ensure clear communication during emergencies.
              </li>
            </ul>
            <h3 className="text-2xl font-semibold">2. Radio Communication Basics</h3>
            <p className="text-lg">
              Pilots use radio frequencies to communicate with air traffic control. Common phrases like Roger,
              Affirmative, and Wilco are used to acknowledge instructions and confirm actions.
            </p>

            <h3 className="text-2xl font-semibold">3. Emergency Protocols</h3>
            <p className="text-lg">
              In emergency situations, clear communication is critical. Pilots must use the **MAYDAY** call
              (repeated three times) for life-threatening emergencies or PAN-PAN for urgent but non-critical
              situations.
            </p>
          </>
        )}
      </div>
      </div>
    </>
  );
}
