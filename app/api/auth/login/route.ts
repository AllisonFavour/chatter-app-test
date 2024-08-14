import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import {sign} from 'jsonwebtoken';
import { generateToken } from "@/utils/jwt";


export async function POST(req: NextRequest) {
    const {email, password} = await req.json();

    await connectToDatabase();

    const user = await User.findOne({email});

    if (!user) {
        return NextResponse.json({message: 'Invalid email or pass, try again!'}, {status: 401});
    }

    // to create JWT payload
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    // sign token
    const token = generateToken(payload);

    // to set token in cookies or return in response body
    const response = NextResponse.json({message: 'Login successful'});
    response.cookies.set('token', token, {httpOnly: true});

    return response;
}