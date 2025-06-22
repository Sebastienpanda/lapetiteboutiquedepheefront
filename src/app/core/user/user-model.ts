export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
}

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
