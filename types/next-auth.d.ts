// types/next-auth.d.ts
import { User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    firstName?: string;
    lastName?: string;
  }
}
