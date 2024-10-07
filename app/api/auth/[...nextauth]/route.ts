import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface Credentials {
//   email: string;
//   username?: string;
//   password: string;
// }
const handler = NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: "credentials",
    //   async authorize(credentials: Credentials) {
    //     const res = await fetch()

    //   },
    // }),
  ],
});

export { handler as GET, handler as POST };
