import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div>
        {session && (
          <Link
            href="/create-post"
            className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Post
          </Link>
        )}
      </div>
      <div className="grid gap-6 mt-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-2">
              By{" "}
              {post.author
                ? `${post.author.firstName} ${post.author.lastName}`
                : "Unknown Author"}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// import Link from 'next/link';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectToDatabase from '@/lib/mongoose';
// import Post from '@/models/Post';

// export default async function Home() {
//   await connectToDatabase();
//   const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'firstName lastName');

//   const session = await getServerSession(authOptions);

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
//       <div>
//       {session && (
//         <Link href="/create-post" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           Create New Post
//         </Link>
//       )}
//       </div>
//       <div className="grid gap-6 mt-6">
//         {posts.map((post) => (
//           <div key={post._id} className="border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">
//               <Link href={`/posts/${post._id}`}>{post.title}</Link>
//             </h2>
//             <p className="text-gray-600 mb-2">
//               By {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Unknown Author'}
//             </p>
//             <p className="text-gray-500 text-sm">
//               {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
