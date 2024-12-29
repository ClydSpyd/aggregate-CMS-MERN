declare interface AdminUser {
    _id: string;
    username: string;
    email: string;
    avatarUrl: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
}

type UserRole = "admin" | "contributor" | "readonly";

declare interface ClientUser{
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    role: string;
    genres: string[];
    favorites: string[];
    restricted: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
}
