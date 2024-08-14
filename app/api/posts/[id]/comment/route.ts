// app/api/posts/[id]/comment/route.ts
import { NextResponse } from 'next/server';
import Comment from '@/models/Comment';
import Post from '@/models/Post';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { content, authorId } = await req.json();
    const comment = await Comment.create({ content, author: authorId, postId: params.id });
    await Post.findByIdAndUpdate(params.id, { $push: { comments: comment._id } });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.error();
  }
}