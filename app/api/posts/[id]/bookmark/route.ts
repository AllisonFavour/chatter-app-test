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

    const userBookmarkedIndex = post.bookmarks.indexOf(userId);

    if (userBookmarkedIndex === -1) {
      // User hasn't bookmarked the post, so add the bookmark
      post.bookmarks.push(userId);
    } else {
      // User has already bookmarked the post, so remove the bookmark
      post.bookmarks.splice(userBookmarkedIndex, 1);
    }

    await post.save();

    return NextResponse.json(post.bookmarks);
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
