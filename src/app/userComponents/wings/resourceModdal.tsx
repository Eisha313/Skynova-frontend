import React from "react";
import ReactPlayer from "react-player";
import LikeButton from "./likeButton";
import { Resource } from "@/types/types";

type ResourceModalProps = {
  resource: Resource;
  onClose: () => void;
};

const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 bg-[#212C44] text-white rounded-xl shadow-xl animate-fadeIn transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Resource Details */}
        <h2 className="text-3xl font-semibold text-center mb-4">{resource.name}</h2>
        <p className="text-gray-300 text-sm text-center mb-6">{resource.description}</p>

        {/* Dynamic Content */}
        <div className="mb-6">
          {resource.type === "movie" || resource.type === "documentary" ? (
            <ReactPlayer
              url={resource.content}
              className="rounded-md overflow-hidden shadow-md"
              width="100%"
              controls
            />
          ) : (
            <div className="bg-[#2A3A5D] p-4 rounded-md text-gray-200 text-center text-sm">{resource.content}</div>
          )}
        </div>

        {/* Like Button */}
        <div className="flex justify-center">
          <LikeButton resourceId={resource._id} initialLiked={!!resource.likedByUser} />
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
