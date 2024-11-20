
"use client";
import React, { useState, useEffect } from "react";
import SearchFilterBar from "./searchFilter";
import ResourceSection from "./resourceSection";
import HeroCardList from "./heroCardList";
import { Resource } from "@/types/types";
import { Hero } from "@/types/types";

const MainResourceDisplay = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/viewWingsOfGloryResources")
      .then((res) => res.json())
      .then((data) => setResources(data));

    fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHeroes", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

 
 
const filteredResources = resources.filter((resource) => {
  const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesType =
    filterType === "" || 
    filterType === resource.type; 
  return matchesSearch && matchesType;
});


const filteredHeroes = heroes.filter((hero) => {
  const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesHeroType = filterType === "" || filterType === "hero"; 
  return matchesSearch && matchesHeroType;
});


  const movies = filteredResources.filter((res) => res.type === "movie");
  const documentaries = filteredResources.filter((res) => res.type === "documentary");
  const quotes = filteredResources.filter((res) => res.type === "quote");

  return (
    <div className="relative min-h-screen bg-[#0B1121] text-white">
      <div className='background-image-overlay'/>
      <div className="page-overlay" />

      <div className="max-w-screen-lg mx-auto px-4 py-12 z-10 relative">
        <div className="flex justify-center items-center h-full ">
          <img src="/wog.png" alt="Description" className="max-w-[50%] max-h-[60vh] object-contain mt-16" />
        </div>

       {/* Search Filter Bar */}
<SearchFilterBar onSearch={setSearchTerm} onFilter={setFilterType} />

{/* Category Buttons */}
<div className="flex gap-20 mt-20 mt-6 justify-center">
  <button
    onClick={() => setFilterType("hero")}
    className={`w-40  py-2 rounded-full border ${filterType === "hero" ? "bg-blue-500 text-white" : "bg-transparent text-bg-[#B5B5B5] border-[#B5B5B5]"} hover:bg-blue-600 hover:border-blue-600 transition-all`}
  >
    Heroes
  </button>
  <button
    onClick={() => setFilterType("movie")}
    className={`w-40 py-2 rounded-full border ${filterType === "movie" ? "bg-blue-500 text-white" : "bg-transparent text-bg-[#B5B5B5] border-[#B5B5B5]"} hover:bg-blue-600 hover:border-blue-600 transition-all`}
  >
    Movies
  </button>
  <button
    onClick={() => setFilterType("documentary")}
    className={`w-40 py-2 rounded-full border ${filterType === "documentary" ? "bg-blue-500 text-white" : "bg-transparent text-bg-[#B5B5B5] border-[#B5B5B5]"} hover:bg-blue-600 hover:border-blue-600 transition-all`}
  >
    Documentaries
  </button>
  <button
    onClick={() => setFilterType("quote")}
    className={`w-40  py-2 rounded-full border ${filterType === "quote" ? "bg-blue-500 text-white" : "bg-transparent text-bg-[#B5B5B5] border-[#B5B5B5]"} hover:bg-blue-600 hover:border-blue-600 transition-all`}
  >
    Quotes
  </button>
</div>

      

        
        {(filterType === "" || filterType === "hero") && filteredHeroes.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 mt-20">Heroes</h2>
            <HeroCardList heroes={filteredHeroes} />
          </>
        )}

        {(filterType === "" || filterType === "movie") && movies.length > 0 && (
          <ResourceSection title="Movies" resources={movies} />
        )}

        {(filterType === "" || filterType === "documentary") && documentaries.length > 0 && (
          <ResourceSection title="Documentaries" resources={documentaries} />
        )}

        {(filterType === "" || filterType === "quote") && quotes.length > 0 && (
          <ResourceSection title="Quotes" resources={quotes} />
        )}
      </div>
    </div>
  );
};

export default MainResourceDisplay;
