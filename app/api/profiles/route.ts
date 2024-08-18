import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth";
import connectToDatabase from "@/lib/mongoose";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    let profile = await Profile.findOne({ user: session.user.id }).populate(
      "user",
      "firstName lastName email"
    );

    if (!profile) {
      const user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      profile = new Profile({
        user: session.user.id,
        bio: "",
        website: "",
        location: "",
        socialLinks: {
          twitter: "",
          facebook: "",
          instagram: "",
          linkedin: "",
        },
      });

      await profile.save();
      profile = await Profile.findOne({ user: session.user.id }).populate(
        "user",
        "firstName lastName email"
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { bio, website, location, socialLinks } = await request.json();

    if (
      typeof bio !== "string" ||
      typeof website !== "string" ||
      typeof location !== "string" ||
      typeof socialLinks !== "object"
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    let profile = await Profile.findOne({ user: session.user.id });

    if (!profile) {
      profile = new Profile({ user: session.user.id });
    }

    profile.bio = bio;
    profile.website = website;
    profile.location = location;
    profile.socialLinks = {
      twitter: socialLinks.twitter || "",
      facebook: socialLinks.facebook || "",
      instagram: socialLinks.instagram || "",
      linkedin: socialLinks.linkedin || "",
    };

    await profile.save();

    return NextResponse.json(
      { message: "Profile updated successfully", profile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
