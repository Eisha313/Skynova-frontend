"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import ResourceModal from "./resourceModdal";
import { Hero, Resource } from "@/types/types";

const HeroDetails: React.FC<{ id: string }> = ({ id }) => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [modalResource, setModalResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHero/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setHero(data);
    };
    fetchHero();
  }, [id]);

  const openResourceModal = (resource: Resource) => setModalResource(resource);
  const closeModal = () => setModalResource(null);

  const getImageSrc = (image: string | File | null): string | undefined => {
    if (!image) return undefined;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return undefined;
  };

  const details = [
    {
      key: "Description",
      value: hero?.description,
    },
    {
      key: "Medals",
      value: hero?.medals,
    },
    {
      key: "Accomplishments",
      value: hero?.accomplishments,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center text-white"
      style={{
        backgroundImage: "url('/back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center h-full mt-20">
        <img
          src="/wog.png"
          alt="Wings Of Glory"
          className="max-w-[50%] max-h-[60vh] object-contain mt-16"
        />
      </div>

      {hero && (
        <div className="max-w-4xl w-full mt-10 space-y-10">
          {/* Hero Details Section */}
          <div className="bg-opacity-70 bg-[#7E7E7E3B] rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {hero.image && (
                <Image
                  src={getImageSrc(hero.image) || ""}
                  alt={hero.name}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              )}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">{hero.name}</h1>

                <div className="mt-4 text-gray-300 flex flex-col gap-4">
                  {
                    details.map((detail, index) => (
                      <div key={index} className="grid grid-cols-3">
                        <p className="text-lg font-bold">{detail.key}</p>
                        <p className="text-base col-span-2">{detail.value}</p>
                        </div>
                    ))
                  }
                  {/* <p>
                    <strong>Description: </strong> {hero.description}
                  </p>
                  <p>
                    <strong>Medals: </strong> {hero.medals}
                  </p>
                  <p>
                    <strong>Accomplishments:</strong> {hero.accomplishments}
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {hero.quotes && hero.quotes.length > 0 && (
            <div className="p-6  rounded-lg ">
              <h2 className="text-xl font-semibold mb-4">Quotes</h2>
              <div className="bg-[rgba(255,255,255,0.12)] p-4 rounded-md shadow-md">
                <p className="text-center italic text-gray-300">
                  "{hero.quotes[0]?.content || "No quotes available"}"
                </p>
              </div>
            </div>
          )}

          {/* Documentaries Section */}
          {hero.documentaries && hero.documentaries.length > 0 && (
            <div className="p-6 bg-opacity-70  rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Documentaries</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hero.documentaries.map((doc, index) => (
                  <div
                    key={index}
                    className="
                    // bg-gray-700
                     p-4 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <h4 className="text-lg font-medium mb-2">{doc.name}</h4>
                    <ReactPlayer
                      url={doc.content}
                      width="100%"
                      height="150px"
                      className="rounded-md overflow-hidden"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {modalResource && (
        <ResourceModal resource={modalResource} onClose={closeModal} />
      )}
    </div>
  );
};

export default HeroDetails;
