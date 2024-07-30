import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const user = [
          {
            id: "1",
            name: "Gilang",
            username: "gilang",
            password: "123",
          },
          {
            id: "2",
            name: "Miko",
            username: "Miko",
            password: "123",
          },
        ];

        if (username === user.username && password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, accounts }) {
      if (accounts?.provider === "Credentials" && user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name;

      return session;
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
