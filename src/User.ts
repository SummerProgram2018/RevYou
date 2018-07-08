import { IUser } from "IUser";
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
    public constructor(id: string, password: string, settings?: any) {
        this.id = id;
        this.password = password;
        if (!settings) {
            this.settings = {
                themes: {
                    contrast: "",
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
    public setPassword(pass: string): void {
        this.password = pass;
    }
}
