
// import React, { useState } from "react";

// type LikeButtonProps = {
//   resourceId: string;
//   initialLiked: boolean;
//   onToggleLike: (resourceId: string, isLiked: boolean) => void;
// };

// const LikeButton: React.FC<LikeButtonProps> = ({ resourceId, initialLiked, onToggleLike }) => {
//   const [liked, setLiked] = useState(initialLiked);

//   const handleLike = async (event: React.MouseEvent) => {
//     event.stopPropagation(); 
//     const updatedLikeStatus = !liked;

//     try {
//       await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/likedWingsOfGloryResource/${resourceId}`, {
//         method: updatedLikeStatus ? "PATCH" : "DELETE",
//         credentials: "include",
//       });
//       setLiked(updatedLikeStatus);
//       onToggleLike(resourceId, updatedLikeStatus);
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleLike}
//       className={`p-2 rounded ${liked ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//     >
//       {liked ? "Liked" : "Like"}
//     </button>
//   );
// };

// export default LikeButton;
import React, { useState } from "react";

type LikeButtonProps = {
  resourceId: string;
  initialLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({ resourceId, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from propagating to the parent

    const updatedLikeStatus = !liked;

    try {
      // Send the request to toggle like status
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/likedWingsOfGloryResource/${resourceId}`,
        {
          method: updatedLikeStatus ? "PATCH" : "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to update like status");
        return;
      }

      // Update the local state to reflect the like status
      setLiked(updatedLikeStatus);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`p-2 rounded ${liked ? "bg-blue-500 text-white" : "bg-gray-300"}`}
    >
      {liked ? "Liked" : "Like"}
    </button>
  );
};

export default LikeButton;
