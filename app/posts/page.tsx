import { headers } from "next/headers";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  Suspense,
} from "react";
import PostsSkeleton from "@/app/(components)/PostsSkeleton";
import Footer from "../(components)/Footer";

interface Post {
  _id: string;
  title: string;
  author: {
    firstName: string;
    lastName: string;
  } | null;
  createdAt: string;
}

async function getPosts(): Promise<Post[]> {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = headers().get("host") || "localhost:3000";
  const apiUrl = `${protocol}://${host}/api/posts`;

  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div>
        {session && (
          <Link
            href="/create-post"
            className="mb-4 inline-block px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Create New Post
          </Link>
        )}
      </div>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
    </div>
  );
}

async function PostsList() {
  const posts: Post[] = await getPosts();

  return (
    <>
      <div className="grid gap-6 my-6">
        {posts.map((post: Post) => (
          <div
            key={post._id}
            // className="border border-violet-200 p-4 rounded shadow-[-3px_3px_0px_#7c3aed]"
            className="border p-4 rounded"
          >
            <Link href={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold mb-2">
                <span className="text-violet-600 hover:text-violet-800">
                  {post.title}
                </span>
              </h2>
              <p className="text-gray-600 mb-2">
                Author:{" "}
                {post.author
                  ? `${post.author.firstName} ${post.author.lastName}`
                  : "Unknown Author"}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

// import Link from "next/link";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/auth";
// import {
//   AwaitedReactNode,
//   JSXElementConstructor,
//   Key,
//   ReactElement,
//   ReactNode,
//   ReactPortal,
//   Suspense,
// } from "react";
// import PostsSkeleton from "@/app/(components)/PostsSkeleton";
// import Footer from "../(components)/Footer";

// interface Post {
//   _id: string;
//   title: string;
//   author: {
//     firstName: string;
//     lastName: string;
//   } | null;
//   createdAt: string;
// }

// async function getPosts(): Promise<Post[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return res.json();
// }

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
//       <div>
//         {session && (
//           <Link
//             href="/create-post"
//             className="mb-4 inline-block px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
//           >
//             Create New Post
//           </Link>
//         )}
//       </div>
//       <Suspense fallback={<PostsSkeleton />}>
//         <PostsList />
//       </Suspense>
//     </div>
//   );
// }

// async function PostsList() {
//   const posts: Post[] = await getPosts();

//   return (
//     <>
//       <div className="grid gap-6 my-6">
//         {posts.map((post: Post) => (
//           <div
//             key={post._id}
//             // className="border border-violet-200 p-4 rounded shadow-[-3px_3px_0px_#7c3aed]"
//             className="border p-4 rounded"
//           >
//             <Link href={`/posts/${post._id}`}>
//               <h2 className="text-xl font-semibold mb-2">
//                 <span className="text-violet-600 hover:text-violet-800">
//                   {post.title}
//                 </span>
//               </h2>
//               <p className="text-gray-600 mb-2">
//                 Author:{" "}
//                 {post.author
//                   ? `${post.author.firstName} ${post.author.lastName}`
//                   : "Unknown Author"}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//             </Link>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </>
//   );
// }
