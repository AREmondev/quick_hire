import Credentials from "next-auth/providers/credentials";
import { login } from "@/lib/api/auth";
import type { AuthUser } from "@/services/types";
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authConfig: AuthOptions = {
  session: { strategy: "jwt" as SessionStrategy },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const { user, tokens } = await login(email, password);
        // console.log("Login", user, tokens);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      if (trigger === "update" && session?.user) {
        token.user = { ...token.user, ...session.user };
        if (session.user.accessToken)
          token.accessToken = session.user.accessToken;
        if (session.user.refreshToken)
          token.refreshToken = session.user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session", session, token);
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-only",
};
