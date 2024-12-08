"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type Resource = {
  _id?: string;
  title: string;
  type: string;
  description?: string;
  resourceImage?: string;
  resourceFile?: File | null;
};

type ResourceFormProps = {
  id?: string;
};

const ResourceForm: React.FC<ResourceFormProps> = ({ id }) => {
  const [resource, setResource] = useState<Resource>({
    title: "",
    type: "",
    description: "",
    resourceImage: "",
    resourceFile: null,
  });
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [showResource, setShowResource] = useState(false);
  const [generatedResource, setGeneratedResource] = useState<Resource | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResource/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const resourceData = data[0];
            setResource(resourceData);

            if (resourceData.resourceFile) {
              setPreviewFile(resourceData.resourceFile);
            }
          }
        })
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setResource({ ...resource, resourceFile: file });
      setPreviewFile(URL.createObjectURL(file)); 
    } else {
      setResource({ ...resource, resourceFile: null });
      setPreviewFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", resource.title);
    formData.append("type", resource.type);
    formData.append("description", resource.description || "");

    if (resource.resourceImage) {
      formData.append("resourceImage", resource.resourceImage);
    }

    
    if (resource.resourceFile) {
      formData.append("resourceFile", resource.resourceFile);
    }

    try {
      const method = id ? "PATCH" : "POST";
      const url = id
        ? `https://sky-nova-8ccaddc754ce.herokuapp.com/resources/updateResource/${id}`
        : "https://sky-nova-8ccaddc754ce.herokuapp.com/resources/createResource";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(response);
      setGeneratedResource(response.data);
      setShowResource(true);
      router.push("/view-resource");
    } catch (error) {
      console.error("Error saving resource:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Error in request setup.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className=" mx-auto p-4 sm:max-w-lg">
      <div className="bg-[#212C44]   rounded-lg shadow-md p-6 align-center text-white">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {id ? "Edit Resource" : "Create Resource"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-white text-sm font-medium"
              
            >
              Title
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={resource.title}
              onChange={handleChange}
              
               className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-white text-sm font-medium"
            >
              Type
              <span className="text-red-500"> *</span>
            </label>
            <select
              id="type"
              name="type"
              value={resource.type}
              onChange={handleChange}
              
              className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

              required
            >
              <span className="text-red-500"> *</span>
              <option className="" value="">Select a type</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
             
              <option value="image">Book</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-white text-sm font-medium"
            >
              Description
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={resource.description}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
             
             
            />
          </div>
          <div>
            <label
              htmlFor="resourceImage"
              className="block text-white text-sm font-medium"
            >
              Resource URL
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="resourceImage"
              name="resourceImage"
              value={resource.resourceImage || ""}
              onChange={handleChange}
             
              className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

            />

            {resource.resourceImage && (
              <div className="mt-2">
                {resource.resourceImage.endsWith(".jpg") ||
                resource.resourceImage.endsWith(".png") ? (
                  <img
                    src={resource.resourceImage}
                    alt="Resource"
                    className="w-full h-auto mt-2"
                  />
                ) : (
                  <a
                    href={resource.resourceImage}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resource
                  </a>
                )}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="resourceFile"
              className="block text-white text-sm font-medium"
            >
              Upload File
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="file"
              id="resourceFile"
              name="resourceFile"
              onChange={handleFileChange}
              
              className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

            />
            {previewFile && (
              <div className="mt-2">
                {previewFile.endsWith(".pdf") ? (
                  <embed
                    src={previewFile}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                ) : (
                  <p>
                    File uploaded:{" "}
                    <a
                      href={previewFile}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {id ? "Update Resource" : "Create Resource"}
          </button>
        </form>
        <Link href="/view-resource">
          <div className="flex justify-end">
            <button className="mt-7 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Back
            </button>
          </div>
        </Link>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        {showResource && generatedResource && (
          <div className="mt-8 bg-white border border-gray-300 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              {generatedResource.title}
            </h3>
            <p className="text-gray-600">Type: {generatedResource.type}</p>
            <p className="text-gray-600">
              Description: {generatedResource.description}
            </p>
            {generatedResource.resourceImage && (
              <a
                href={generatedResource.resourceImage}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resource
              </a>
            )}
            {generatedResource.resourceFile && (
              <div className="mt-2">
                {generatedResource.resourceFile && (
                  <div className="mt-2">
                    {generatedResource.resourceFile.type ===
                    "application/pdf" ? (
                      <embed
                        src={URL.createObjectURL(
                          generatedResource.resourceFile
                        )}
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(
                          generatedResource.resourceFile
                        )}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Resource
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceForm;
