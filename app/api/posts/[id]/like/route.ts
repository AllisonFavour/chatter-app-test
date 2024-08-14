import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { getServerSession } from 'next-auth';
import  authOptions  from '@/app/api/auth/[...nextauth]/route';

// POST /api/posts
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const post = new Post({
      title,
      content,
      author: session.user.id,
    });

    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// GET /api/posts
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const posts = await Post.find()
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
