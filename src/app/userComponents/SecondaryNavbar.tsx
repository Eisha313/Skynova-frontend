
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function SecondaryNavbar() {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
   
    const path = window.location.pathname;
    if (path === '/emergencyTactics') {
      setActiveTab('communication');
    } else if (path === '/handGestures') {
      setActiveTab('gestures');
    } else if (path === '/aviationCharts') {
      setActiveTab('charts');
    }
  }, []); 

  return (
    <div className="flex justify-center   pt-[170px] pb-12 space-x-8">
      <Link href="/emergencyTactics">
        <button
          className={`w-[332px] h-[70px] rounded-[30px] border-2 text-lg font-semibold ${
            activeTab === 'communication'
              ? 'bg-[#5AA0BC] text-white'
              : 'border-[rgba(181,181,181,0.25)] text-gray-300'
          }`}
        >
          Communication
        </button>
      </Link>
      <Link href="/handGestures">
        <button
          className={`w-[332px] h-[70px] rounded-[30px] border-2 text-lg font-semibold ${
            activeTab === 'gestures'
              ? 'bg-[#5AA0BC] text-white'
              : 'border-[rgba(181,181,181,0.25)] text-gray-300'
          }`}
        >
          Hand Gestures
        </button>
      </Link>
      <Link href="/aviationCharts">
        <button
          className={`w-[332px] h-[70px] rounded-[30px] border-2 text-lg font-semibold ${
            activeTab === 'charts'
              ? 'bg-[#5AA0BC] text-white'
              : 'border-[rgba(181,181,181,0.25)] text-gray-300'
          }`}
        >
          Aviation Charts
        </button>
      </Link>
    </div>
  );
}
