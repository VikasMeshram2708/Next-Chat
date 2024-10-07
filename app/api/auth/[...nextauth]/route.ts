/* eslint-disable @typescript-eslint/ban-ts-comment */
import { prismaInstance } from "@/lib/PrismaInstance";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  username?: string;
  password: string;
}
const handler = NextAuth({
  pages: {
    signIn: "/u/login",
    newUser: "/u/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in seconds
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      // @ts-ignore
      async authorize(credentials: Credentials) {
        const userExist = await prismaInstance.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!userExist) throw new Error("Invalid User");
        // compare the password
        const validPassword = await bcrypt.compare(
          credentials?.password,
          userExist?.password
        );

        if (!validPassword) throw new Error("Invalid Credentials");

        return {
          id: userExist.id,
          username: userExist?.username,
          email: userExist?.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user?.id;
        token.email = user?.email;
        // @ts-ignore
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token?.id;
        // @ts-ignore
        session.user.email = token?.email;
        // @ts-ignore
        session.user.username = token?.username;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
