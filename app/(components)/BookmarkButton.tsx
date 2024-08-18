"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function BookmarkButton({
  postId,
  initialBookmarks,
}: {
  postId: string;
  initialBookmarks: string[];
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const { data: session } = useSession();

  const handleBookmark = async () => {
    if (!session) {
      alert("You must be logged in to bookmark a post");
      return;
    }

    const res = await fetch(`/api/posts/${postId}/bookmark`, {
      method: "POST",
    });
    if (res.ok) {
      const updatedBookmarks = await res.json();
      setBookmarks(updatedBookmarks);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="flex items-center space-x-1 text-gray-500 hover:text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
      <span>{bookmarks.length}</span>
    </button>
  );
}
