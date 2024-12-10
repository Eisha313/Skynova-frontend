'use client';
import SecondaryNavbar from "../userComponents/SecondaryNavbar";
import Header from '@/app/components/LandingPage/header';
export default function NavigationCharts() {
  return (
    <>
       

<div className='bg-custom-image'>
<Header/>
<SecondaryNavbar/>
      {/* Video Section */}
      <div className="max-w-6xl mx-auto flex justify-center items-center ">
        <iframe

          width="100%" 
          height="500"
          src="https://www.youtube.com/embed/6ITjUfl80bs"
          title="Weather BASICS explained (EASY to Understand) PPL Lesson 39"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="object-cover"
        />
      </div>

     
      <div className="p-6 space-y-8 max-w-4xl mx-auto text-white">
        <h2 className="text-3xl font-bold text-[#5AA0BC]">
          Navigation Charts: Mastering the Essentials
        </h2>
        <p className="text-lg leading-relaxed">
          Navigation charts are essential tools for pilots to ensure safe and accurate flight planning. Below are key aspects of understanding and reading aviation charts:
        </p>
        <ul className="space-y-4 text-lg">
          <li>
            <strong>1. Types of Charts:</strong> There are different charts for different purposes:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Sectional Charts:</strong> Provide detailed information for VFR (Visual Flight Rules) navigation.</li>
              <li><strong>Enroute Charts:</strong> Used for IFR (Instrument Flight Rules) navigation at higher altitudes.</li>
              <li><strong>Approach Plates:</strong> Detail approach and landing procedures for specific airports.</li>
            </ul>
          </li>
          <li>
            <strong>2. Key Features:</strong> 
            Charts include information such as terrain elevation, airspace boundaries, navigation aids (NAVAIDs), and airport locations. Pay attention to:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Terrain and Obstacles:</strong> Look for contour lines and symbols indicating high terrain or obstacles.</li>
              <li><strong>Airspace Classes:</strong> Identify controlled and uncontrolled airspaces, restricted areas, and MOAs (Military Operations Areas).</li>
            </ul>
          </li>
          <li>
            <strong>3. Scale and Distance:</strong>
            Understand the scale of the chart to measure distances accurately. Use the provided legend for conversions.
          </li>
          <li>
            <strong>4. Reading Latitude and Longitude:</strong>
            Use the grid system to pinpoint exact locations. This is crucial for navigation and emergency situations.
          </li>
          <li>
            <strong>5. Symbols and Markings:</strong>
            Familiarize yourself with the legend to understand the symbols for airports, NAVAIDs, and weather services.
          </li>
          <li>
            <strong>6. Magnetic Variation:</strong>
            Charts display the difference between true north and magnetic north, critical for accurate navigation.
          </li>
          <li>
            <strong>7. Weather Information:</strong>
            Some charts include data on weather patterns and hazards like turbulence and icing.
          </li>
          <li>
            <strong>8. Flight Planning:</strong>
            Combine chart reading with other tools, such as flight plans and navigation logs, for comprehensive route planning.
          </li>
        </ul>
      </div>
      </div>
    </>
  );
}
