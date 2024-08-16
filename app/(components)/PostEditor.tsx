"use client";

import React, { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

const Editor = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Editor), {
  ssr: false,
});

interface PostEditorProps {
  onSubmit: (title: string, content: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onSubmit }) => {
  const editorRef = useRef<any>(null);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        console.error("Image upload failed");
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (editorRef.current) {
      const title = (document.getElementById("post-title") as HTMLInputElement)
        .value;
      const content = editorRef.current.getInstance().getMarkdown();
      onSubmit(title, content);
    }
  }, [onSubmit]);

  return (
    <div>
      <input type="text" id="post-title" placeholder="Enter post title" />
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const url = await uploadImage(blob);
            callback(url, "alt text");
            return false;
          },
        }}
      />
      <button onClick={handleSubmit}>Submit Post</button>
    </div>
  );
};

export default PostEditor;
