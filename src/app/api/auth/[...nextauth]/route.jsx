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

        const user = [
          {
            id: "1",
            name: "Gilang",
            email: "VJWjv@example.com",
            username: "gilang",
            password: "123",
          },
          {
            id: "2",
            name: "Miko",
            email: "VJWjv@example.com",
            username: "Miko",
            password: "123",
          },
        ];
        if (username === user[0].username && password === user[0].password) {
          return user[0];
        } else if (username === user[1].username && password === user[1].password) {
          return user[1];
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, accounts }) {
      if (accounts?.provider === "credentials" && user) {
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
