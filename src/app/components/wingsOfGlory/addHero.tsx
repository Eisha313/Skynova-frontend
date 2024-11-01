
"use client";

import { useState, useEffect } from "react";
import { Hero, Resource } from "@/types/types";
import TagSelector from "./TagSelector";
import { useRouter } from "next/navigation";

type AddHeroProps = {
  heroId?: string;
  onClose: () => void;
};

const AddHero = ({ heroId, onClose }: AddHeroProps) => {
  const [hero, setHero] = useState<Hero>({
    _id: "",
    name: "",
    image: undefined,
    description: "",
    accomplishments: [],
    medals: [],
    movies: [],
    documentaries: [],
    quotes: [],
  });

  const [resources, setResources] = useState<{
    movies: Resource[];
    documentaries: Resource[];
    quotes: Resource[];
  }>({
    movies: [],
    documentaries: [],
    quotes: [],
  });

  const [tags, setTags] = useState<Resource[]>([]);
  const [documentaryTags, setDocumentaryTags] = useState<Resource[]>([]);
  const [quoteTags, setQuoteTags] = useState<Resource[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const router=useRouter();

  useEffect(() => {
    setHero((prev) => ({ ...prev, movies: tags.map((tag) => tag._id) }));
  }, [tags]);

  useEffect(() => {
    setHero((prev) => ({
      ...prev,
      documentaries: documentaryTags.map((tag) => tag._id),
    }));
  }, [documentaryTags]);

  useEffect(() => {
    setHero((prev) => ({
      ...prev,
      quotes: quoteTags.map((tag) => tag._id),
    }));
  }, [quoteTags]);

  useEffect(() => {
    const fetchResources = async () => {
      const types = ["movie", "documentary", "quote"];
      const res = await Promise.all(
        types.map((type) =>
          fetch(
            `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/viewWingsOfGloryResources?type=${type}`
          ).then((res) => res.json())
        )
      );

      setResources({
        movies: res[0],
        documentaries: res[1],
        quotes: res[2],
      });
      console.log("Fetched Resources:", res);
    };
   
    const fetchHero = async () => {
      if (heroId) {
        const res = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHero/${heroId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setHero(data);
        setIsEditMode(true);
      }
    };

    fetchResources();
    fetchHero();
  }, [heroId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
    
      if (file.type.startsWith('image/')) {
        setHero({ ...hero, image: file });
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleSave = async () => {
    const endpoint = isEditMode
      ? `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/updateWarHero/${hero._id}`
      : "https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/createWarHero";
  
    const method = isEditMode ? "PUT" : "POST";
  
    const formData = new FormData();
    Object.keys(hero).forEach((key) => {
      const value = (hero as any)[key];
      if (Array.isArray(value)) {
        value.forEach((v: string) => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value);
      }
    });
  
    if (!hero.image) {
      console.error("No image file selected.");
      return;
    }
  
    console.log("Endpoint URL:", endpoint);
    
    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Error: ${response.status} ${errorText}`);
      }
  
      console.log('Hero saved successfully');
      router.push('/wings/Hero');
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        {isEditMode ? "Edit" : "Add"} Hero
      </h2>

      <label className="block mb-1 font-medium">Hero Name</label>
      <input
        type="text"
        name="name"
        value={hero.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-1 font-medium">Hero Image</label>
      <input
        type="file"
         accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-1 font-medium">Medals</label>
      <input
        type="text"
        name="medals"
        value={hero.medals}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-1 font-medium">Description</label>
      <textarea
        name="description"
        value={hero.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-1 font-medium">Accomplishments</label>
      <textarea
        name="accomplishments"
        value={hero.accomplishments}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <div className="space-y-1">
        <div className="h-20">
          <label className="block mb-0.5 font-medium">Movies</label>
          <TagSelector tags={tags} setTags={setTags} allTags={resources.movies} />
        </div>

        <div className="h-20">
          <label className="block mb-0.5 font-medium">Documentaries</label>
          <TagSelector
            tags={documentaryTags}
            setTags={setDocumentaryTags}
            allTags={resources.documentaries}
          />
        </div>

        <div className="h-20">
          <label className="block mb-0.5 font-medium">Quotes</label>
          <TagSelector tags={quoteTags} setTags={setQuoteTags} allTags={resources.quotes} />
        </div>
      </div>

      <div className="mt-4">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isEditMode ? "Update Hero" : "Save Hero"}
        </button>
        <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddHero;
