"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Resource {
  id: number;
  title: string;
  link?: string;
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
          key={doc.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <Link href={doc.link || "#"} passHref>
              <div className="flex items-center space-x-4 cursor-pointer">
                <svg
                  className="w-16 h-16 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 0a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V6l-6-6H8zM9 2h5.5L17 4.5V16a1 1 0 01-1 1H9a1 1 0 01-1-1V2zm2 10a1 1 0 112 0v4a1 1 0 01-2 0v-4zM8 7h8v1H8V7z" />
                </svg>
                <span className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                  {doc.title}
                </span>
              </div>
            </Link>
          </div>
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
