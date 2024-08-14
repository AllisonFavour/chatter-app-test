import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { Types } from 'mongoose';

// GET /api/posts/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Post ID' }, { status: 400 });
    }

    const post = await Post.findById(id).populate('author', 'firstName lastName');

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
