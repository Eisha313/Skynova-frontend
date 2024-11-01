
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
    const endpoint = isEditMode ? `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/updateWingsOfGloryResource/${resource._id}` : "https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/createWingsOfGloryResource";
    const method = isEditMode ? "PATCH" : "POST";

    const formData = new FormData();
    formData.append("name", resource.name);
    formData.append("description", resource.description);
    formData.append("type", resource.type);
    
    formData.append("content", resource.content);

    if (resource.file) {
      formData.append("file", resource.file); 
    }

    await fetch(endpoint, {
      method,
      body: formData,
      credentials: "include",
    });

    setResource({ name: "", description: "", type: "movie", content: "", file: null ,_id:''}); 
    setIsEditMode(false);
    // onClose(); 
    router.push('/wings/wingsResources')
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">{isEditMode ? "Edit" : "Add"} Resource</h2>
      <input
        type="text"
        name="name"
        value={resource.name}
        onChange={handleChange}
        placeholder="Resource Name"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <textarea
        name="description"
        value={resource.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <select
        name="type"
        value={resource.type}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="documentary">Documentary</option>
        <option value="movie">Movie</option>
        <option value="quote">Quote</option>
      </select>

     
      {resource.type === "quote" ? (
        <textarea
          name="content"
          value={resource.content}
          onChange={handleChange}
          placeholder="Enter Quote"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      ) : (
        <>
          <input
            type="text"
            name="content"
            value={resource.content}
            onChange={handleChange}
            placeholder="Enter Link"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </>
      )}

      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
      <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
        Cancel
      </button>
    </div>
  );
};

export default WingsResources;
