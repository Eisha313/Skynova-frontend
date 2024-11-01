// import React, { useState } from "react";

// type LikeButtonProps = {
//   resourceId: string;
//   initialLiked: boolean;
//   onToggleLike: (resourceId: string, isLiked: boolean) => void;
// };

// const LikeButton: React.FC<LikeButtonProps> = ({ resourceId, initialLiked, onToggleLike }) => {
//   const [liked, setLiked] = useState(initialLiked);

//   const handleLike = async () => {
//     const updatedLikeStatus = !liked;

//     try {
//       await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/like/${resourceId}`, {
//         method: updatedLikeStatus ? "POST" : "DELETE",
//         credentials: "include",
//       });
//       setLiked(updatedLikeStatus);
//       onToggleLike(resourceId, updatedLikeStatus);
//     } catch (error) {
//       console.error("Error toggling like:", error);
//     }
//   };

//   return (
//     <button onClick={handleLike} className={`p-2 rounded ${liked ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
//       {liked ? "Liked" : "Like"}
//     </button>
//   );
// };

// export default LikeButton;
import React, { useState } from "react";

type LikeButtonProps = {
  resourceId: string;
  initialLiked: boolean;
  onToggleLike: (resourceId: string, isLiked: boolean) => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ resourceId, initialLiked, onToggleLike }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from bubbling up to parent elements
    const updatedLikeStatus = !liked;

    try {
      await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/like/${resourceId}`, {
        method: updatedLikeStatus ? "POST" : "DELETE",
        credentials: "include",
      });
      setLiked(updatedLikeStatus);
      onToggleLike(resourceId, updatedLikeStatus);
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
