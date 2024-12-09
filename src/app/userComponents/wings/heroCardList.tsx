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
        <Link key={hero._id} href={`/userRender/wings/${hero._id}/heroDetails`} className="w-full h-full block">
          <div className=" text-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition w-full h-full relative">
            <img
              src={
                typeof hero.image === "string" ? hero.image : hero.image ? URL.createObjectURL(hero.image) : undefined
              }
              alt={hero.name}
              className="w-full h-full aspect-[0.9] object-cover rounded-md mb-2"
            />
            <h3 className=" absolute bottom-0 left-0 right-0 text-lg font-semibold py-4 text-center text-white bg-[#293347]">
              {hero.name}
            </h3>
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
