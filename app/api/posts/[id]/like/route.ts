import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongoose';
import Post from '@/models/Post';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  const postId = params.id;
  const userId = session.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const userLikedIndex = post.likes.indexOf(userId);

    if (userLikedIndex === -1) {
      // User hasn't liked the post, so add the like
      post.likes.push(userId);
    } else {
      // User has already liked the post, so remove the like
      post.likes.splice(userLikedIndex, 1);
    }

    await post.save();

    return NextResponse.json(post.likes);
  } catch (error) {
    console.error('Error updating like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}