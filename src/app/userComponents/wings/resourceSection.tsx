
import React, { useState } from "react";
import ResourceModal from "./resourceModdal";
import LikeButton from "./likeButton";
import { Resource } from "@/types/types";
import ReactPlayer from 'react-player';

type ResourceSectionProps = {
  title: string;
  resources: Resource[];
};

const ResourceSection: React.FC<ResourceSectionProps> = ({ title, resources }) => {
  const [modalResource, setModalResource] = useState<Resource | null>(null);
  const [resourceList, setResourceList] = useState<Resource[]>(resources);
  const [visibleCount, setVisibleCount] = useState(4); 

  const handleToggleLike = (resourceId: string, newLikedStatus: boolean) => {
    setResourceList((prevResources) =>
      prevResources.map((resource) =>
        resource._id === resourceId ? { ...resource, likedByUser: newLikedStatus } : resource
      )
    );
  };

  const handleViewMore = () => setVisibleCount((prevCount) => prevCount + 4);
  const handleViewLess = () => setVisibleCount(4);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="flex flex-wrap">
        {/* {resourceList.slice(0, visibleCount).map((resource) => (
          <div key={resource._id} className="p-2 w-1/2 md:w-1/3 lg:w-1/4">
            <div className="p-2 border rounded transition hover:shadow-lg cursor-pointer h-full" onClick={() => setModalResource(resource)}>
              <h3 className="text-xs font-semibold">{resource.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{resource.description}</p>

              {(resource.type === "movie" || resource.type === "documentary") && (
                <div className="mb-2">
                  <ReactPlayer url={resource.content} width="100%" height="120px" />
                </div>
              )}

              {resource.type !== "movie" && resource.type !== "documentary" && (
                <div className="text-center text-xs">{resource.content}</div>
              )} */}
 {resources.slice(0, visibleCount).map((resource) => (
          <div key={resource._id} className="p-2 w-1/2 md:w-1/3 lg:w-1/4">
            <div
              className="p-2 border rounded transition hover:shadow-lg cursor-pointer h-full"
              onClick={() => setModalResource(resource)} 
            >
              <h3 className="text-xs font-semibold">{resource.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{resource.description}</p>

              {(resource.type === "movie" || resource.type === "documentary") && (
                <div className="mb-2">
                  <ReactPlayer url={resource.content} width="100%" height="120px" />
                </div>
              )}

              {resource.type !== "movie" && resource.type !== "documentary" && (
                <div className="text-center text-xs">{resource.content}</div>
              )}

              <LikeButton
                resourceId={resource._id}
                initialLiked={!!resource.likedByUser}
               
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        {visibleCount < resources.length ? (
          <button onClick={handleViewMore} className="text-blue-500">
            View More
          </button>
        ) : (
          <button onClick={handleViewLess} className="text-blue-500">
            View Less
          </button>
        )}
      </div>
      {modalResource && (
        <ResourceModal resource={modalResource} onClose={() => setModalResource(null)} />
      )}
    </div>
  );
};

export default ResourceSection;