"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileSkeleton from "../(components)/ProfileSkeleton";

interface Profile {
  bio: string;
  website: string;
  location: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfileData();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);

      const profileRes = await fetch("/api/profiles");
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();
      setProfile(profileData);

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) return <ProfileSkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-violet-800">Your Profile</h1>
      {profile ? (
        <div className="mb-8">
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <p>
            <strong>Website:</strong> {profile.website}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <h2 className="text-xl font-bold mt-4 mb-2 text-violet-700">
            Social Links
          </h2>
          <ul>
            {Object.entries(profile.socialLinks).map(([platform, url]) => (
              <li key={platform}>
                <strong>{platform}:</strong> {url}
              </li>
            ))}
          </ul>
          <Link
            href="/profile/edit"
            className="text-violet-600 hover:underline"
          >
            Edit Profile
          </Link>
        </div>
      ) : (
        <div className="mb-8">
          <p>No profile details yet.</p>
          <Link
            href="/profile/edit"
            className="text-violet-600 hover:underline"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
}
