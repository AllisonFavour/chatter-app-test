import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import sendEmail from "@/lib/sendEmail";

interface RegisterDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body: RegisterDetails = await req.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all input fields." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // send email
    await sendEmail(email);

    return NextResponse.json({ message: "new user created." }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
