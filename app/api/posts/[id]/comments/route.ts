import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth";
import connectToDatabase from "@/lib/mongoose";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const comments = await Comment.find({ post: params.id })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName");
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      content,
      author: session.user.id,
      post: params.id,
    });

    // Update the post to include the new comment
    await Post.findByIdAndUpdate(params.id, {
      $push: { comments: comment._id },
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "author",
      "firstName lastName"
    );

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
