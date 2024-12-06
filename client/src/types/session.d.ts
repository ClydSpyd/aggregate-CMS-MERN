declare interface User {
  username: string;
  id: string;
  role: UserRole;
  avatarUrl: string;
}

type UserRole = "admin" | "contributor" | "readonly";