
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
    accomplishments: "",
    medals: "",
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

  const [tags, setTags] = useState<Resource[]>([]); // For movies
  const [documentaryTags, setDocumentaryTags] = useState<Resource[]>([]); // For documentaries
  const [quoteTags, setQuoteTags] = useState<Resource[]>([]); // For quotes
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchResources = async () => {
      const types = ["movie", "documentary", "quote"];
      const res = await Promise.all(
        types.map((type) =>
          fetch(
            `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/viewWingsOfGloryResources/${type}`
          ).then((res) => res.json())
        )
      );

      setResources({
        movies: res[0],
        documentaries: res[1],
        quotes: res[2],
      });
    };

    fetchResources();
  }, []);

  
  useEffect(() => {
    const fetchHero = async () => {
      if (heroId) {
        const res = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/viewWarHero/${heroId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("edit her0",data)
        setHero({
          ...data,
          accomplishments: data.accomplishments || "", 
          medals: data.medals || "", 
          movies: data.movies || [], 
          documentaries: data.documentaries || [], 
          quotes: data.quotes || [], 
        });
        if (data.image) {
          setPreviewImage(data.image);
        }
        setTags(data.movies || []);
        setDocumentaryTags(data.documentaries || []);
        setQuoteTags(data.quotes || []);
        console.log("Resources: ", resources);
        setIsEditMode(true);
      }
    };

    fetchHero();
  }, [heroId ,resources]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  
  //     if (file.type.startsWith("image/")) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setHero({ ...hero, image: reader.result as string }); 
  //         setPreviewImage(reader.result as string); 
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       alert("Please upload a valid image file.");
  //     }
  //   }
  // };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setHero({ ...hero, image: base64String }); // Always set as Base64
          setPreviewImage(base64String);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };
  
  // const handleSave = async () => {
  //   let base64Image: string | undefined;
  
  //   // Check if the image is already in Base64 or needs conversion
  //   if (hero.image && typeof hero.image === "string") {
  //     if (!hero.image.startsWith("data:image")) {
  //       // Convert the URL to Base64 if it's not already
  //       base64Image = await convertUrlToBase64(hero.image);
  //     } else {
  //       // Already in Base64 format
  //       base64Image = hero.image;
  //     }
  //   }
  
  //   // Prepare the updated hero object
  //   const updatedHero = {
  //     ...hero,
  //     image: base64Image, // Use Base64 image
  //     movies: tags.map((movie) => movie._id),
  //     documentaries: documentaryTags.map((doc) => doc._id),
  //     quotes: quoteTags.map((quote) => quote._id),
  //   };
  
  //   const endpoint = isEditMode
  //     ? `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/updateWarHero/${hero._id}`
  //     : "https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/createWarHero";
  
  //   const method = isEditMode ? "PATCH" : "POST";
  
  //   try {
  //     const response = await fetch(endpoint, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(updatedHero),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Error: ${response.status} ${errorText}`);
  //     }
  
  //     console.log("Hero saved successfully");
  //     router.push("/wings/Hero");
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };
  
  
  // const convertUrlToBase64 = async (imageUrl: string): Promise<string> => {
  //   if (!imageUrl.startsWith("data:image")) {
  //     try {
  //       const response = await fetch(imageUrl, {
  //         mode: 'cors',
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch image. Status: ${response.status}`);
  //       }
  
  //       const blob = await response.blob();
  //       const reader = new FileReader();
  
  //       return new Promise((resolve, reject) => {
  //         reader.onloadend = () => resolve(reader.result as string);
  //         reader.onerror = () => reject("Error converting image to Base64");
  //         reader.readAsDataURL(blob);
  //       });
  //     } catch (error) {
  //       console.error("Failed to convert image URL to Base64:", error);
  //       return ""; // Return an empty string or handle the error as needed
  //     }
  //   }
  
  //   return imageUrl; // Return the original if it's already Base64
  // };
  
  
  
  const handleSave = async () => {
    // Prepare the updated hero object using the tags state
    const updatedHero = {
      ...hero,
      movies: tags.map((movie) => movie._id), // use the updated tags for movies
      documentaries: documentaryTags.map((doc) => doc._id), // use the updated tags for documentaries
      quotes: quoteTags.map((quote) => quote._id), // use the updated tags for quotes
    };
  
    const endpoint = isEditMode
      ? `https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/updateWarHero/${hero._id}`
      : "https://sky-nova-8ccaddc754ce.herokuapp.com/warHeroes/createWarHero";
  
    const method = isEditMode ? "PATCH" : "POST";
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedHero), // Use updatedHero instead of heroData
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }
  
      console.log("Hero saved successfully");
      router.push("/wings/Hero");
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
     
{previewImage && (
  <div className="mb-4">
    <img src={previewImage} alt="Hero Image" className="w-32 h-32 object-cover rounded mb-2" />
  </div>
)}
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

      <div className="mt-4">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isEditMode ? "Update Hero" : "Save Hero"}
        </button>
        <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-300 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddHero;
