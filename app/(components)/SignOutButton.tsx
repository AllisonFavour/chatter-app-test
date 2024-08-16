"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="block mt-2 md:mt-0 md:ml-4 text-violet-600 hover:text-gray-700"
    >
      Log out
    </button>
  );
}
