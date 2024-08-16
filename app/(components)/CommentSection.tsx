"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IComment } from "@/models/Comment";

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${postId}/comments`);
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      fetchComments();
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-4 p-4 bg-gray-100 rounded">
          <p className="mb-2">{comment.content}</p>
          <small className="text-gray-600">
            By {(comment.author as any).firstName}{" "}
            {(comment.author as any).lastName} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
      {session ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mt-4 text-gray-600">
          Please{" "}
          <span className="text-violet-600 font-bold">
            <Link href="/login">sign in</Link>
          </span>{" "}
          to leave a comment.
        </p>
      )}
    </div>
  );
}
