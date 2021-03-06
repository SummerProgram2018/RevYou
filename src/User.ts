import { IUser } from "IUser";
import * as crypto from "crypto";
import * as sha from "sha.js";
export class User implements IUser {
    public id: string;
    public password: string;
    public settings?: {
        themes: {
            contrast: string,
            light: boolean
        },
        searchPref: {
            type: string;
        }
    };
    private salt: string;
    public constructor(id: string, password: string, settings?: any) {
        this.id = id;
        this.setPassword(password, "egg");
        this.salt = crypto.randomBytes(32).toString("hex");
        if (!settings) {
            this.settings = {
                themes: {
                    contrast: "#ee6c30",
                    light: true
                },
                searchPref: {
                    type: "anything"
                }
            };
        } else {
            this.settings = settings;
        }
    }
    public setUser(id: string): void {
        this.id = id;
    }
    public setPassword(pass: string, key: string): void {
        this.password = this.hashPassword(pass, key);
    }
    public checkPassword(pass: string, key: string): boolean {
        return this.password === this.hashPassword(pass, key);
    }
    private hashPassword(pass: string, key: string): string {
        const saltedPass = this.salt + pass;
        return sha("sha512").update(saltedPass).digest("hex");
    }
}
