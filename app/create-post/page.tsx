"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Editor as EditorType,
  EditorProps as ToastUIEditorProps,
} from "@toast-ui/react-editor";

interface ExtendedEditorProps extends ToastUIEditorProps {
  forwardedRef?: React.RefObject<EditorType>;
}

const EditorWrapper = dynamic<ExtendedEditorProps>(
  () =>
    import("@toast-ui/react-editor").then((mod) => {
      import("@toast-ui/editor/dist/toastui-editor.css");
      return ({ forwardedRef, ...props }) => <mod.Editor ref={forwardedRef} {...props} />;
    }),
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const editorRef = useRef<EditorType>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (status !== "authenticated" || !session?.user) {
      setError("You must be logged in to create a post");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title for your post");
      return;
    }

    const content = editorRef.current?.getInstance().getMarkdown();

    if (!content || !content.trim()) {
      setError("Please enter some content for your post");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response.ok) {
        router.push("/posts");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <EditorWrapper
          forwardedRef={editorRef}
          initialValue="Write your post content here..."
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}