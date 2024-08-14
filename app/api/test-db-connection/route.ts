import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';

export async function GET() {
    try {
        console.log('API route called');
        await connectToDatabase();
        return NextResponse.json({ message: 'Database connected successfully' });
    } catch (error) {
        console.error('Error connecting to database:', error);
        return NextResponse.json({ message: 'Error connecting to database', error }, { status: 500 });
    }
}
