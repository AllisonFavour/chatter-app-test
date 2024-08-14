// app/api/posts/[id]/bookmark/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { userId } = await req.json();
    await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}