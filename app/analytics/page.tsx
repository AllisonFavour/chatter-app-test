"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AnalyticsSkeleton from "@/app/(components)/AnalyticsSkeleton";

interface UserAnalytics {
  posts: number;
  comments: number;
  likes: number;
  bookmarks: number;
}

interface GeneralAnalytics {
  users: number;
  posts: number;
  comments: number;
  likes: number;
  bookmarks: number;
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(
    null
  );
  const [generalAnalytics, setGeneralAnalytics] =
    useState<GeneralAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const userResponse = await fetch(`/api/analytics?userId=${session?.user.id}`);
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(`Failed to fetch user analytics: ${userResponse.status} ${userResponse.statusText}. ${errorData.error || ''}`);
      }
      const userData = await userResponse.json();
      setUserAnalytics(userData);
  
      const generalResponse = await fetch("/api/analytics");
      if (!generalResponse.ok) {
        const errorData = await generalResponse.json();
        throw new Error(`Failed to fetch general analytics: ${generalResponse.status} ${generalResponse.statusText}. ${errorData.error || ''}`);
      }
      const generalData = await generalResponse.json();
      setGeneralAnalytics(generalData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError(`Failed to load analytics. ${(error as Error).message}`);
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status, router, fetchAnalytics]);

  if (status === "loading") return <AnalyticsSkeleton />;

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-violet-800">Analytics</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-violet-800">Analytics</h1>

      {userAnalytics && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2 text-violet-700">
            Your Activity
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Posts</h3>
              <p>{userAnalytics.posts}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Comments</h3>
              <p>{userAnalytics.comments}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Likes</h3>
              <p>{userAnalytics.likes}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Bookmarks</h3>
              <p>{userAnalytics.bookmarks}</p>
            </div>
          </div>
        </div>
      )}

      {generalAnalytics && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-violet-700">
            General Analytics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Users</h3>
              <p>{generalAnalytics.users}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Posts</h3>
              <p>{generalAnalytics.posts}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Comments</h3>
              <p>{generalAnalytics.comments}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Likes</h3>
              <p>{generalAnalytics.likes}</p>
            </div>
            <div className="bg-violet-100 p-4 rounded">
              <h3 className="font-bold">Bookmarks</h3>
              <p>{generalAnalytics.bookmarks}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import AnalyticsSkeleton from "@/app/(components)/AnalyticsSkeleton";

// interface UserAnalytics {
//   posts: number;
//   comments: number;
//   likes: number;
//   bookmarks: number;
// }

// interface GeneralAnalytics {
//   users: number;
//   posts: number;
//   comments: number;
//   likes: number;
//   bookmarks: number;
// }

// export default function AnalyticsPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(
//     null
//   );
//   const [generalAnalytics, setGeneralAnalytics] =
//     useState<GeneralAnalytics | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     } else if (status === "authenticated") {
//       fetchAnalytics();
//     }
//   }, [status, router]);

//   const fetchAnalytics = async () => {
//     try {
//       const userResponse = await fetch(
//         `/api/analytics?userId=${session?.user.id}`
//       );
//       if (userResponse.ok) {
//         const userData = await userResponse.json();
//         setUserAnalytics(userData);
//       } else {
//         throw new Error("Failed to fetch user analytics");
//       }

//       const generalResponse = await fetch("/api/analytics");
//       if (generalResponse.ok) {
//         const generalData = await generalResponse.json();
//         setGeneralAnalytics(generalData);
//       } else {
//         throw new Error("Failed to fetch general analytics");
//       }
//     } catch (error) {
//       console.error("Error fetching analytics:", error);
//       setError("Failed to load analytics. Please try again later.");
//     }
//   };

//   if (status === "loading") return <AnalyticsSkeleton />;

//   if (error) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4 text-violet-800">Analytics</h1>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 text-violet-800">Analytics</h1>

//       {userAnalytics && (
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-2 text-violet-700">
//             Your Activity
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Posts</h3>
//               <p>{userAnalytics.posts}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Comments</h3>
//               <p>{userAnalytics.comments}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Likes</h3>
//               <p>{userAnalytics.likes}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Bookmarks</h3>
//               <p>{userAnalytics.bookmarks}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {generalAnalytics && (
//         <div>
//           <h2 className="text-xl font-bold mb-2 text-violet-700">
//             General Analytics
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Users</h3>
//               <p>{generalAnalytics.users}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Posts</h3>
//               <p>{generalAnalytics.posts}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Comments</h3>
//               <p>{generalAnalytics.comments}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Likes</h3>
//               <p>{generalAnalytics.likes}</p>
//             </div>
//             <div className="bg-violet-100 p-4 rounded">
//               <h3 className="font-bold">Bookmarks</h3>
//               <p>{generalAnalytics.bookmarks}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
