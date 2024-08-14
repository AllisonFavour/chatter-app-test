// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import CommentList from "@/app/(components)/CommentList";
// import PostCard from "@/app/(components)/PostCard";
// import Image from "next/image";

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   comments: string[];
//   files?: string[];
//   likes: number;
// }

// export default function PostPage({ params }: { params: { postId: string } }) {
//   const { postId } = params;
//   const [post, setPost] = useState<Post | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [commentContent, setCommentContent] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await fetch(`/api/posts/${postId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setPost(data);
//       } else {
//         console.error("Failed to fetch post.");
//       }

//       setLoading(false);
//     };

//     fetchPosts();
//   }, [postId]);

//   const handleCommentSubmit = async () => {
//     const res = await fetch("api/comments/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ content: commentContent, postId }),
//     });

//     if (res.ok) {
//       const updatedPost = await res.json();
//       setPost(updatedPost);
//       setCommentContent("");
//     } else {
//       console.error("Failed to add comment");
//     }
//   };

//   const handleLike = async () => {
//     const res = await fetch("/api/likes/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ postId }),
//     });

//     if (res.ok) {
//       const updatedPost = await res.json();
//       setPost(updatedPost);
//     } else {
//       console.error("Failed to like post.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <div>
//         <h1>{post?.title}</h1>
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {post?.content || ""}
//         </ReactMarkdown>
//         {post?.files &&
//           post.files.map((file, index) => (
//             <div key={index}>
//               {file.endsWith(".mp4") ? (
//                 <video controls>
//                   <source src={file} type="video/mp4" />
//                 </video>
//               ) : (
//                 <Image src={file} alt="uploaded image" />
//               )}
//             </div>
//           ))}
//         <button onClick={handleLike}>Like ({post?.likes})</button>
//       </div>

//       <div>
//         <textarea
//           value={commentContent}
//           onChange={(e) => setCommentContent(e.target.value)}
//           placeholder="Add a comment..."
//         />
//         <button onClick={handleCommentSubmit}>Add comment</button>
//         <CommentList comments={post?.comments || []} />
//       </div>
//     </>
//   );
// }
