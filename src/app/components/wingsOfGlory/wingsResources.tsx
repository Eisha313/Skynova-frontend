
"use client";

import { useState, useEffect } from "react";
import { Resource } from "@/types/types";
import { useRouter } from 'next/navigation';

type WingsResourcesProps = {
  resourceId?: string; 
  onClose: () => void; 
};

const WingsResources = ({ resourceId, onClose }: WingsResourcesProps) => {
  const [resource, setResource] = useState<Resource>({
    _id: "",
    name: "",
    description: "",
    type: "movie",
    content: "",
    file: null, 
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const  router=useRouter();

  useEffect(() => {
    if (resourceId) {
      const fetchResource = async () => {
        const res = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/viewWingsOfGloryResource/${resourceId}`, { credentials: "include" });
        const data = await res.json();
        setResource(data);
        setIsEditMode(true);
      };
      fetchResource();
    }
  }, [resourceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setResource({ ...resource, file });
  };
  const handleSave = async () => {
    const endpoint = isEditMode
      ? `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/updateWingsOfGloryResource/${resource._id}`
      : "https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/createWingsOfGloryResource";
    const method = isEditMode ? "PATCH" : "POST";
  
    const body = JSON.stringify({
      name: resource.name,
      description: resource.description,
      type: resource.type,
      content: resource.content,
    });
  
    try {
      
      await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
        credentials: "include",
      });
  
    
      if (resource.file) {
        const fileUploadEndpoint = `https://sky-nova-8ccaddc754ce.herokuapp.com/upload`; // Adjust endpoint if needed
        const fileData = new FormData();
        fileData.append("file", resource.file);
        fileData.append("resourceId", resource._id);
  
        await fetch(fileUploadEndpoint, {
          method: "POST",
          body: fileData,
          credentials: "include",
        });
      }
  
     
      setResource({ name: "", description: "", type: "movie", content: "", file: null, _id: "" });
      setIsEditMode(false);
      router.push("/wings/wingsResources");
    } catch (error) {
      console.error("Failed to save resource:", error);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
  <div className="p-4 text-white mx-auto bg-[#212C44] rounded-lg shadow-lg max-w-md w-full overflow-auto">
      <h2 className="text-lg text-center font-semibold mb-4">{isEditMode ? "Edit" : "Add"} Resource</h2>
      <div className="mt-4">
      <label className="block mt-7 font-medium">Name
      <span className="text-red-500"> *</span>
      </label>
      <input
        type="text"
        name="name"
        value={resource.name}
        onChange={handleChange}
        placeholder="Resource Name"
         className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
      />
       <label className="block mt-7 font-medium">Description
      <span className="text-red-500"> *</span>
      </label>
      <textarea
        name="description"
        value={resource.description}
        onChange={handleChange}
        placeholder="Description"
         className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
      />
      <label className="block mt-7 font-medium">Resource Type
      <span className="text-red-500"> *</span>
      </label>
      <select
        name="type"
        value={resource.type}
        onChange={handleChange}
        className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
      >
        <option className="bg-transparent text-black" value="documentary">Documentary</option>
        <option className="bg-transparent text-black"  value="movie">Movie</option>
        <option className="bg-transparent text-black"  value="quote">Quote</option>
      </select>

      {/* <label className="block mt-7 font-medium">Resource content
      <span className="text-red-500"> *</span>
      </label>
      {resource.type === "quote" ? (
        <textarea
          name="content"
          value={resource.content}
          onChange={handleChange}
          placeholder="Enter Quote"
           className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
        />
      ) : (
        <>
          <input
            type="text"
            name="content"
            value={resource.content}
            onChange={handleChange}
            placeholder="Enter Link"
             className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
          />
        </>
      )} */}
<label className="block mt-7 font-medium">Resource Content
  <span className="text-red-500"> *</span>
</label>
{resource.type === "quote" ? (
  <textarea
    name="content"
    value={resource.content}
    onChange={handleChange}
    placeholder="Enter Quote"
    className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
  />
) : resource.type === "documentary" || resource.type === "movie" ? (
  <>
    <input
      type="text"
      name="content"
      value={resource.content}
      onChange={handleChange}
      placeholder="Enter Link"
      className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
    />
    <input
      type="file"
      onChange={handleFileChange}
      className="w-full mt-7 px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
    />
  </>
) : null}

      <button onClick={handleSave} className="px-4 mt-12 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
      <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
        Cancel
      </button>
    </div>
    </div>
    </div>
  );
};

export default WingsResources;
