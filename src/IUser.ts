export interface IUser {
    id: string;
    password: string;
    setUser(id: string): void;
    setPassword(pass: string): void;
}
