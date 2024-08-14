// "use client";

// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";

// export default function PostForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState<File[]>([]);

//   const onDrop = (acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     files.forEach((file, index) => {
//       formData.append(`file${index}`, file);
//     });
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Post Title"
//           required
//         />
//       </div>
//       <div>
//         <SimpleMDE value={content} onChange={setContent} />
//       </div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag & drop some files here, or click to select files</p>
//       </div>
//       <button type="submit">Create Post</button>
//     </form>
//   );
// }
