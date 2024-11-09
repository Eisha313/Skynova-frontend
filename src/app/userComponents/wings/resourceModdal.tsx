
// import React from "react";
// import ReactPlayer from "react-player"; 
// import LikeButton from "./likeButton";
// import { Resource } from "@/types/types";

// type ResourceModalProps = {
//   resource: Resource;
//   onClose: () => void;
// };

// const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
//   const handleToggleLike = async (resourceId: string, isLiked: boolean) => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/likedWingsOfGloryResource/${resourceId}`, {
//         method: isLiked ? "DELETE" : "POST",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         console.error("Failed to update like status");
//         return;
//       }

//       console.log(`Resource ID: ${resourceId}, Toggled like status to: ${!isLiked}`);
//     } catch (error) {
//       console.error("Error toggling like status:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
//         <button onClick={onClose} className="text-gray-600 float-right">
//           Close
//         </button>
//         <h2 className="text-xl font-semibold">{resource.name}</h2>
//         <p className="mb-4">{resource.description}</p>
        
     
//         {(resource.type === "movie" || resource.type === "documentary") && (
//           <ReactPlayer url={resource.content} width="100%" controls />
//         )}
//         {resource.type !== "movie" && resource.type !== "documentary" && (
//                 <div className="text-center text-xs">{resource.content}</div>
//               )}

//         <LikeButton 
//           resourceId={resource._id} 
//           initialLiked={!!resource.likedByUser} 
//           onToggleLike={handleToggleLike} 
//         />
//       </div>
//     </div>
//   );
// };

// export default ResourceModal;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <button onClick={onClose} className="text-gray-600 float-right">
          Close
        </button>
        <h2 className="text-xl font-semibold">{resource.name}</h2>
        <p className="mb-4">{resource.description}</p>
        
        {(resource.type === "movie" || resource.type === "documentary") && (
          <ReactPlayer url={resource.content} width="100%" controls />
        )}
        {resource.type !== "movie" && resource.type !== "documentary" && (
          <div className="text-center text-xs">{resource.content}</div>
        )}

        {/* LikeButton handles its own logic now */}
        <LikeButton 
          resourceId={resource._id} 
          initialLiked={!!resource.likedByUser} 
        />
      </div>
    </div>
  );
};

export default ResourceModal;
