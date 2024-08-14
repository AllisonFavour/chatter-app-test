"use client";

import { useEffect, useState } from "react";
import PostCard from "../(components)/PostCard";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("api/posts/");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>All blog posts</h1>
        {posts.length === 0 ? (
          <p>No post available yet, make your first post.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
