
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Resource {
  _id: number;
  title: string;
  resourceFile?: string;
  type: string;
}

interface DocumentSectionProps {
  searchTerm: string;
  showAll: boolean;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  searchTerm,
  showAll,
}) => {
  const [documents, setDocuments] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState<boolean>(showAll);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources",
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data: Resource[] = await response.json();
        console.log("data doc", data);
        const documentResources = data.filter(
          (resource) => resource.type === "pdf" || resource.type === "image"
        );
        setDocuments(documentResources);
      } catch (error) {
        setError("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedDocuments = viewAll
    ? filteredDocuments
    : filteredDocuments.slice(0, 4);

  if (loading) {
    return <p className="text-gray-700">Loading documents...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {displayedDocuments.map((doc) => (
        <div
          key={doc._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <Link href={`/userRender/view-resource/${doc._id}/resourceDetails`} passHref>
            <div className="p-4 flex flex-col items-center space-y-2 cursor-pointer">
              {doc.type === "pdf" && (
                <iframe
                  src={doc.resourceFile}
                  width="100%"
                  height="150px"
                  className="mb-2"
                />
              )}
              {doc.type === "image" && (
                <img
                  src={doc.resourceFile}
                  alt={doc.title}
                  className="w-full h-32 object-cover mb-2"
                />
              )}
              <span className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                {doc.title}
              </span>
            </div>
          </Link>
        </div>
      ))}
      {filteredDocuments.length > 4 && (
        <button
          onClick={() => setViewAll(!viewAll)}
          className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      )}
    </div>
  );
};

export default DocumentSection;
