import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ResourceModal from "./resourceModdal";
import { Hero,Resource } from "@/types/types";

const HeroDetails: React.FC = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [modalResource, setModalResource] = useState<Resource | null>(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchHero = async () => {
      if (query.id) {
        const res = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/warHero/viewWarHero/${query.id}`, { credentials: "include" });
        const data = await res.json();
        setHero(data);
      }
    };
    fetchHero();
  }, [query.id]);

  const openResourceModal = (resource: Resource) => setModalResource(resource);
  const closeModal = () => setModalResource(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {hero && (
        <>
          <h1 className="text-2xl font-bold">{hero.name}</h1>
          <p className="mt-2 text-gray-700">{hero.description}</p>
          <h3 className="mt-4 text-lg font-semibold">Medals & Accomplishments</h3>
          <ul className="list-disc list-inside text-gray-600">
            {hero.medals.map((medal, index) => <li key={index}>{medal}</li>)}
            {hero.accomplishments.map((acc, index) => <li key={index}>{acc}</li>)}
          </ul>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="flex gap-4">
            {hero.movies.map((movie, index) => (
  <button
    key={index}
    onClick={() => openResourceModal({ name: movie, type: 'movie' } as Resource)}
    className="text-blue-500 underline"
  >
    {movie}
  </button>
))}
{hero.documentaries.map((doc, index) => (
  <button
    key={index}
    onClick={() => openResourceModal({ name: doc, type: 'documentary' } as Resource)}
    className="text-blue-500 underline"
  >
    {doc}
  </button>
))}

            </div>
          </div>
          {modalResource && <ResourceModal resource={modalResource} onClose={closeModal} />}
        </>
      )}
    </div>
  );
};

export default HeroDetails;
