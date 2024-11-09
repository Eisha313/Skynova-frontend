
// 'use client';

// import { useState, useEffect } from "react";
// import Image from "next/image"; 
// import ReactPlayer from "react-player"; // Import ReactPlayer
// import ResourceModal from "./resourceModdal";
// import { Hero, Resource } from "@/types/types";

// const HeroDetails: React.FC<{ id: string }> = ({ id }) => {
//   const [hero, setHero] = useState<Hero | null>(null);
//   const [modalResource, setModalResource] = useState<Resource | null>(null);

//   useEffect(() => {
//     const fetchHero = async () => {
//       const res = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHero/${id}`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log("Hero Data:", data); 
//       setHero(data);
//     };
//     fetchHero();
//   }, [id]);

//   const openResourceModal = (resource: Resource) => setModalResource(resource);
//   const closeModal = () => setModalResource(null);

//   const convertToArray = (value: string | string[]) => {
//     if (typeof value === "string") {
//       return value === "None" ? [] : [value];
//     }
//     return value; 
//   };

//   const getImageSrc = (image: string | File | null): string | undefined => {
//     if (!image) return undefined;
//     if (typeof image === "string") return image; 
//     if (image instanceof File) return URL.createObjectURL(image); 
//     return undefined;
//   };

//   const Section = ({ title, items, type }: { title: string; items: Resource[]; type: string }) => (
//     <>
//       {items.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">{title}</h3>
//           <div className="flex flex-wrap gap-4">
//             {items.map((item) => (
//               <button
//                 key={item._id}
//                 onClick={() => openResourceModal(item)}
//                 className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg hover:bg-gray-50 transition"
//               >
//                 <h4 className="font-medium text-gray-700">{item.name}</h4>
//                 <p className="text-sm text-gray-500">{type}</p>

//                 {/* Display ReactPlayer for movie and documentary */}
//                 {(item.type === "movie" || item.type === "documentary") && (
//                   <div className="mb-2">
//                     <ReactPlayer url={item.content} width="100%" height="120px" />
//                   </div>
//                 )}

//                 {/* Display quote for quotes */}
//                 {item.type === "quote" && (
//                   <div className="text-center text-xs mt-2">
//                     <p>"{item.content}"</p>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-20">
//       {hero && (
//         <>
//           {/* Hero Image and Details */}
//           {hero.image && (
//             <div className="flex justify-center my-6">
//               <Image
//                 src={getImageSrc(hero.image) || ""}
//                 alt={hero.name}
//                 width={300} 
//                 height={300} 
//                 className="rounded-lg shadow-lg"
//               />
//             </div>
//           )}

//           <h1 className="text-3xl font-bold text-center">{hero.name}</h1>
//           <p className="mt-4 text-gray-700 text-center">{hero.description}</p>

//           {/* Medals & Accomplishments */}
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold border-b pb-2 text-gray-800">Medals & Accomplishments</h3>
//             <ul className="mt-4 list-disc list-inside text-gray-600">
//               {convertToArray(hero.medals).length > 0 ? (
//                 convertToArray(hero.medals).map((medal, index) => <li key={index}>{medal}</li>)
//               ) : (
//                 <li>No medals available</li>
//               )}
//               {convertToArray(hero.accomplishments).length > 0 ? (
//                 convertToArray(hero.accomplishments).map((acc, index) => <li key={index}>{acc}</li>)
//               ) : (
//                 <li>No accomplishments available</li>
//               )}
//             </ul>
//           </div>

//           {/* Movies Section */}
//           <Section title="Movies" items={hero.movies || []} type="Movie" />

//           {/* Documentaries Section */}
//           <Section title="Documentaries" items={hero.documentaries || []} type="Documentary" />

//           {/* Quotes Section */}
//           {hero.quotes.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold border-b pb-2 text-gray-800">Quotes</h3>
//               <ul className="mt-4 list-disc list-inside text-gray-600">
//                 {hero.quotes.map((quote, index) => (
//                   <li key={index}>"{quote}"</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Modal */}
//           {modalResource && <ResourceModal resource={modalResource} onClose={closeModal} />}
//         </>
//       )}
//     </div>
//   );
// };

// export default HeroDetails;
'use client';

import { useState, useEffect } from "react";
import Image from "next/image"; 
import ReactPlayer from "react-player"; // Import ReactPlayer
import ResourceModal from "./resourceModdal";
import { Hero, Resource } from "@/types/types";

const HeroDetails: React.FC<{ id: string }> = ({ id }) => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [modalResource, setModalResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHero/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Hero Data:", data); 
      setHero(data);
    };
    fetchHero();
  }, [id]);

  const openResourceModal = (resource: Resource) => setModalResource(resource);
  const closeModal = () => setModalResource(null);

  const convertToArray = (value: string | string[]) => {
    if (typeof value === "string") {
      return value === "None" ? [] : [value];
    }
    return value; 
  };

  const getImageSrc = (image: string | File | null): string | undefined => {
    if (!image) return undefined;
    if (typeof image === "string") return image; 
    if (image instanceof File) return URL.createObjectURL(image); 
    return undefined;
  };

  const Section = ({ title, items, type }: { title: string; items: Resource[]; type: string }) => (
    <>
      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">{title}</h3>
          <div className="flex flex-wrap gap-4">
            {items.map((item) => (
              <button
                key={item._id}
                onClick={() => openResourceModal(item)}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg hover:bg-gray-50 transition"
              >
                <h4 className="font-medium text-gray-700">{item.name}</h4>
                <p className="text-sm text-gray-500">{type}</p>

                
                {(item.type === "movie" || item.type === "documentary") && (
                  <div className="mb-2">
                    <ReactPlayer url={item.content} width="100%" height="120px" />
                  </div>
                )}

               
                {item.type === "quote" && (
                  <div className="text-center text-xs mt-2">
                    {/* <p>"{item.content}"</p> */}
                    <p>&quot;{item.content}&quot;</p>

                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      {hero && (
        <>
    
          {hero.image && (
            <div className="flex justify-center my-6">
              <Image
                src={getImageSrc(hero.image) || ""}
                alt={hero.name}
                width={300} 
                height={300} 
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-center">{hero.name}</h1>
          <p className="mt-4 text-gray-700 text-center">{hero.description}</p>

          
          <div className="mt-6">
            <h3 className="text-xl font-semibold border-b pb-2 text-gray-800">Medals & Accomplishments</h3>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              {convertToArray(hero.medals).length > 0 ? (
                convertToArray(hero.medals).map((medal, index) => <li key={index}>{medal}</li>)
              ) : (
                <li>No medals available</li>
              )}
              {convertToArray(hero.accomplishments).length > 0 ? (
                convertToArray(hero.accomplishments).map((acc, index) => <li key={index}>{acc}</li>)
              ) : (
                <li>No accomplishments available</li>
              )}
            </ul>
          </div>

         
          <Section title="Movies" items={hero.movies || []} type="Movie" />

         
          <Section title="Documentaries" items={hero.documentaries || []} type="Documentary" />

    
          <Section title="Quotes" items={hero.quotes || []} type="Quote" />

          {modalResource && <ResourceModal resource={modalResource} onClose={closeModal} />}
        </>
      )}
    </div>
  );
};

export default HeroDetails;
