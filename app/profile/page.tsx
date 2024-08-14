"use client";

import { use, useEffect, useState } from "react";
import UserProfile from "../(components)/UserProfile";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>

      {user ? <UserProfile user={user} /> : <p>Loading...</p>}
    </div>
  );
}
