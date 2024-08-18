import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth";
import CommentSection from "../../(components)/CommentSection";
import LikeButton from "../../(components)/LikeButton";
import BookmarkButton from "../../(components)/BookmarkButton";
import MarkdownRenderer from "../../(components)/MarkdownRenderer";
import PostSkeleton from "../../(components)/PostSkeleton";

async function getPost(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent id={params.id} />
    </Suspense>
  );
}

async function PostContent({ id }: { id: string }) {
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : "Unknown Author";

  return (
    <div className="container mx-auto p-4 mt-14">
      <h1 className="text-3xl font-bold mb-4 text-black">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {authorName} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none mb-6">
        {post.content && <MarkdownRenderer content={post.content} />}
      </div>
      <div className="flex space-x-4 mb-6">
        <LikeButton
          postId={post._id.toString()}
          initialLikes={post.likes.length}
        />
        <BookmarkButton
          postId={post._id.toString()}
          initialBookmarks={post.bookmarks.length}
        />
      </div>
      <CommentSection postId={post._id.toString()} />
    </div>
  );
}

// export default async function PostPage({ params }: { params: { id: string } }) {
//   const post = await getPost(params.id);

//   if (!post) {
//     notFound();
//   }

//   const session = await getServerSession(authOptions);

//   const authorName = post.author
//     ? `${post.author.firstName} ${post.author.lastName}`
//     : "Unknown Author";

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <p className="text-gray-600 mb-4">
//         By {authorName} on {new Date(post.createdAt).toLocaleDateString()}
//       </p>
//       <div className="prose max-w-none mb-6">
//         {post.content && <MarkdownRenderer content={post.content} />}
//       </div>
//       <div className="flex space-x-4 mb-6">
//         <LikeButton
//           postId={post._id.toString()}
//           initialLikes={post.likes.length}
//         />
//         <BookmarkButton
//           postId={post._id.toString()}
//           initialBookmarks={post.bookmarks.length}
//         />
//       </div>
//       <CommentSection postId={post._id.toString()} />
//     </div>
//   );
// }
