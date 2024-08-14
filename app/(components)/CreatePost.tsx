// app/components/CreatePost.tsx
'use client';

import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    const title = (document.getElementById('title') as HTMLInputElement).value;

    try {
      await axios.post('/api/posts', { title, content });
      router.push('/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        id="title"
        type="text"
        placeholder="Post Title"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <Editor
        initialValue="Start writing your post..."
        previewStyle="vertical"
        height="400px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
      />
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
