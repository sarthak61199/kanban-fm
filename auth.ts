import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.user.findUnique({ where: { id: token.sub } });

      if (!user) return token;

      token.id = user.id;
      token.name = user.name;
      token.email = user.email;

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
