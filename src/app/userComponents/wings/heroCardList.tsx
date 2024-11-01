"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Hero } from "@/types/types";

type HeroCardListProps = {
  heroes: Hero[];
};

const HeroCardList: React.FC<HeroCardListProps> = ({ heroes }) => {
  const [visibleHeroes, setVisibleHeroes] = useState(4);

  const handleViewMore = () => setVisibleHeroes((prev) => prev + 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {heroes.slice(0, visibleHeroes).map((hero) => (
        <Link key={hero._id} href={`/wings/${hero._id}/heroDetails`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 cursor-pointer hover:shadow-lg transition">
            <img
              src={typeof hero.image === 'string' ? hero.image : hero.image ? URL.createObjectURL(hero.image) : undefined}
              alt={hero.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold text-center">{hero.name}</h3>
          </div>
        </Link>
      ))}
      {visibleHeroes < heroes.length && (
        <button onClick={handleViewMore} className="col-span-full text-blue-500 text-center py-2">
          View More
        </button>
      )}
    </div>
  );
};

export default HeroCardList;
