import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<AuthUser | null> {
        await connectToDatabase();

        const user = (await User.findOne({ email: credentials?.email })
          .lean()
          .exec()) as UserType | null;

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        const isValid = await bcrypt.compare(
          credentials?.password!,
          user.password!
        );

        if (!isValid) {
          throw new Error("Password incorrect.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
