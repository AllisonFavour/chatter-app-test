"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function LikeButton({
  postId,
  initialLikes,
}: {
  postId: string;
  initialLikes: string[];
}) {
  const [likes, setLikes] = useState(initialLikes);
  const { data: session } = useSession();

  const handleLike = async () => {
    if (!session) {
      alert("You must be logged in to like a post");
      return;
    }

    const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    if (res.ok) {
      const updatedLikes = await res.json();
      setLikes(updatedLikes);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-1 text-red-500 hover:text-red-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      <span>{likes.length}</span>
    </button>
  );
}
