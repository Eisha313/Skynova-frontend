"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Resource {
  _id: number;
  title: string;
  resourceFile?: string;
  type: string;
  description?: string;
}

interface DocumentSectionProps {
  searchTerm: string;
  showAll: boolean;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({ searchTerm, showAll }) => {
  const [documents, setDocuments] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState<boolean>(showAll);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data: Resource[] = await response.json();
        console.log("data doc", data);
        const documentResources = data.filter((resource) => resource.type === "pdf" || resource.type === "image");
        setDocuments(documentResources);
      } catch (error) {
        setError("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const displayedDocuments = viewAll ? filteredDocuments : filteredDocuments.slice(0, 4);

  if (loading) {
    return <p className="text-gray-700">Loading documents...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const docThumbnails = ["/doc-1.png", "/doc-2.png", "/doc-3.png", "/doc-4.png"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {displayedDocuments.map((doc, index) => (
        <div
          key={doc._id}
          className="bg-[#293347] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <Link href={`/userRender/view-resource/${doc._id}/resourceDetails`} passHref>
            <div className="flex flex-col cursor-pointer">
              {doc.type === "pdf" ? (
                // <iframe src={doc.resourceFile} width="100%" height="150px" className="mb-2" />
                <img
                  src={docThumbnails[index % docThumbnails.length]}
                  alt={doc.title}
                  className="w-full aspect-[1.1] object-cover mb-2"
                />
              ) : (
                <img src={doc.resourceFile} alt={doc.title} className="w-full h-32 object-cover mb-2" />
              )}
              <div className="text-white  px-4 py-2">
                <p className="font-semibold text-lg">{doc.title}</p>
                <p className="text-sm line-clamp-2">{toTitleCase(doc.description || "No description")}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DocumentSection;
