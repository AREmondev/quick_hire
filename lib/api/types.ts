export type Role = "candidate" | "employer" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyId?: string;
};

export type AuthUser = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
};

