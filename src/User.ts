import { IUser } from "IUser";
export class User implements IUser {
    public id: string;
    public password: string;
    public constructor(id: string, password: string) {
        this.id = id;
        this.password = "";
    }
    public setUser(id: string): void {
        this.id = id;
    }
    public setPassword(pass: string): void {
        this.password = pass;
    }
}
