// // app/analytics/page.tsx
// import React from 'react';
// import Post from '@/models/Post';
// import User from '@/models/User';
// import connectToDatabase from '@/lib/mongoose';

// interface AnalyticsProps {
//   postsCount: number;
//   totalLikes: number;
//   totalComments: number;
//   totalBookmarks: number;
// }

// export default async function Analytics() {
//   await connectToDatabase();

//   // Assuming user is authenticated and you have userId
//   const userId = 'AUTHENTICATED_USER_ID';

//   const posts = await Post.find({ author: userId });
//   const postsCount = posts.length;
//   const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);
//   const totalComments = posts.reduce((acc, post) => acc + post.comments.length, 0);

//   const user = await User.findById(userId);
//   const totalBookmarks = user?.bookmarks.length || 0;

//   const analytics: AnalyticsProps = { postsCount, totalLikes, totalComments, totalBookmarks };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold">Analytics</h1>
//       <div className="mt-4">
//         <p>Total Posts: {analytics.postsCount}</p>
//         <p>Total Likes: {analytics.totalLikes}</p>
//         <p>Total Comments: {analytics.totalComments}</p>
//         <p>Total Bookmarks: {analytics.totalBookmarks}</p>
//       </div>
//     </div>
//   );
// }
