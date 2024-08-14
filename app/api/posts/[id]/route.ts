// to fetch a single post
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Post from "@/models/Post";


export async function GET(req: NextRequest) {
    const {postId} = req.nextUrl.pathname.split('/').pop() as string;

    await connectToDatabase();

    const post = Post.findById(postId).populate('comments').exec();

    return NextResponse.json(post);
}
