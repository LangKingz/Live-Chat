import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "langking",
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const user = [
          {
            id: 1,
            name: "John Doe",
            email: "DmKXp@example.com",
            username: "lang",
            password: "lang",
          },
          {
            id: 2,
            name: "Jane Doe",
            email: "DmKXp@example.com",
            username: "gilang",
            password: "gilang",
          },
        ];

        if (username === "lang" && password === "lang") {
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
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
