'use client';

import { useSession } from "next-auth/react";

export default function ClientSideSessionCheck({ children }: { children: (session: any) => React.ReactNode }) {
  const { data: session } = useSession();
  return children(session);
}