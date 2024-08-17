import getDataApi from "@/app/services";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [
    Credentials({
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const response = await getDataApi("http://localhost:3000/api/Account");
        const users = response;

        const user = users.find((e) => e.username === username && e.password === password);

        if (!user) {
          throw new Error("User tidak ditemukan");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.email = token.email;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
