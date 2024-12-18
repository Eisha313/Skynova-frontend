"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Link from "next/link";

interface Resource {
  _id: number;
  title: string;
  type: string;
  description: string;
  resourceImage?: string | null;
  resourceFile?: string | null;
}

interface VideoSectionProps {
  searchTerm: string;
  showAll: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({ searchTerm, showAll }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setResources(data);
      } catch (error) {
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const isVideoLink = (url: string) => {
    return ReactPlayer.canPlay(url);
  };

  const filteredResources = resources.filter(
    (resource) => resource.title.toLowerCase().includes(searchTerm.toLowerCase()) && resource.type !== "pdf"
  );

  const displayedResources = showAll ? filteredResources : filteredResources.slice(0, 4);

  if (loading) {
    return <p className="text-gray-700">Loading resources...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {displayedResources.map((resource) => (
        <div key={resource._id} className="bg-[#293347]  text-white shadow-lg rounded-lg overflow-hidden">
          <Link href={`/userRender/view-resource/${resource._id}/resourceDetails`} passHref>
            <div className="cursor-pointer">
              {resource.resourceFile && (
                <ReactPlayer url={resource.resourceFile} width="100%" height="240px" controls />
              )}
              {resource.resourceImage && isVideoLink(resource.resourceImage) && (
                <ReactPlayer url={resource.resourceImage} width="100%" height="240px" controls />
              )}
              {resource.resourceImage && !isVideoLink(resource.resourceImage) && (
                <img src={resource.resourceImage} alt={resource.title} className="w-full h-56 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{resource.title}</h3>
                <h4 className="text-l font-semibold text-white truncate">{resource.description}</h4>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
