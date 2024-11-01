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
      
    fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/warHero/viewWarHeroes", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType ? resource.type === filterType : true)
  );

  const filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const movies = filteredResources.filter((res) => res.type === "movie");
  const documentaries = filteredResources.filter((res) => res.type === "documentary");
  const quotes = filteredResources.filter((res) => res.type === "quote");

  return (
    <div className="container mx-auto p-4">
      <SearchFilterBar onSearch={setSearchTerm} onFilter={setFilterType} />
      <h2 className="text-xl font-bold mb-4">Heroes</h2>
      <HeroCardList heroes={filteredHeroes} />
      <ResourceSection title="Movies" resources={movies} />
      <ResourceSection title="Documentaries" resources={documentaries} />
      <ResourceSection title="Quotes" resources={quotes} />
    </div>
  );
};

export default MainResourceDisplay;
