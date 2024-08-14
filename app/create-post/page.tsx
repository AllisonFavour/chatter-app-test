"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ToastEditorRef } from "../(components)/ToastEditor";

// Dynamically import ToastEditor to ensure it's only rendered on the client side
const ToastEditor = dynamic(() => import("../(components)/ToastEditor"), {
  ssr: false,
});

const CreatePostPage: React.FC = () => {
  const router = useRouter();
  const editorRef = useRef<ToastEditorRef>(null);
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editorRef.current) {
      console.error("Editor reference is not available");
      return;
    }

    try {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown();

      if (!title || !content) {
        alert("Title and content are required");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <ToastEditor ref={editorRef} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostPage;
































// // app/create-post/page.tsx

// "use client";

// import React, { useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

// // Dynamically import ToastEditor to ensure it's only rendered on the client side
// const ToastEditor = dynamic(() => import("../(components)/ToastEditor"), {
//   ssr: false,
// });

// type ToastEditorRef = {
//   getInstance: () => any;
// };

// const CreatePostPage = () => {
//   const router = useRouter();
//   const editorRef = useRef<ToastEditorRef>(null);
//   const [title, setTitle] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     console.log("Editor ref:", editorRef.current);

//     if (!editorRef.current) {
//       console.error("Editor reference is not available");
//       return;
//     }

//     try {
//       const editorInstance = editorRef.current.getInstance();
//       const content = editorInstance.getMarkdown();

//       console.log("Title:", title);
//       console.log("Content:", content);

//       if (!title || !content) {
//         alert("Title and content are required");
//         return;
//       }

//       const response = await fetch("/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, content }),
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         const data = await response.json();
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Failed to create post:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-16">
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="content">Content</label>
//         <ToastEditor ref={editorRef} />
//       </div>
//       <button type="submit">Create Post</button>
//     </form>
//   );
// };

// export default CreatePostPage;
