import type { User as AppUser } from "@/services/types";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: AppUser;
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: AppUser["role"];
    companyId?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AppUser;
    accessToken?: string;
    refreshToken?: string;
  }
}
