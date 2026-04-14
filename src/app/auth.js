import { loginService } from "../service/login.service.js";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await loginService(credentials);
        return response;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user from loginService:", JSON.stringify(user, null, 2));
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
  if (token?.user) {
    session.user = {
      ...session.user,
      id: token.user.id,
      accessToken: token.user.payload?.token,
    };
  }
  return session;
},
  },
});
