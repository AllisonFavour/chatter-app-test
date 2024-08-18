import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth";
import connectToDatabase from "@/lib/mongoose";
import Post from "@/models/Post";
import User from "@/models/User";
import Comment from "@/models/Comment";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      // Individual user analytics
      const userPosts = await Post.countDocuments({ author: userId });
      const userComments = await Comment.countDocuments({ author: userId });
      const userLikes = await Post.countDocuments({ likes: userId });
      const userBookmarks = await Post.countDocuments({ bookmarks: userId });

      return NextResponse.json({
        posts: userPosts,
        comments: userComments,
        likes: userLikes,
        bookmarks: userBookmarks,
      });
    } else {
      // General analytics
      const totalUsers = await User.countDocuments();
      const totalPosts = await Post.countDocuments();
      const totalComments = await Comment.countDocuments();

      // Modified aggregation queries
      const totalLikes = await Post.aggregate([
        {
          $project: {
            likesCount: {
              $cond: {
                if: { $isArray: "$likes" },
                then: { $size: "$likes" },
                else: 0,
              },
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$likesCount" } } },
      ]);

      const totalBookmarks = await Post.aggregate([
        {
          $project: {
            bookmarksCount: {
              $cond: {
                if: { $isArray: "$bookmarks" },
                then: { $size: "$bookmarks" },
                else: 0,
              },
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$bookmarksCount" } } },
      ]);

      return NextResponse.json({
        users: totalUsers,
        posts: totalPosts,
        comments: totalComments,
        likes: totalLikes[0]?.total || 0,
        bookmarks: totalBookmarks[0]?.total || 0,
      });
    }
  } catch (error) {
    console.error("Error in analytics API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
