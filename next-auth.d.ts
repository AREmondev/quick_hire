import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
    companyId?: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      companyId?: string;
    };
    accessToken: string;
    refreshToken?: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}
