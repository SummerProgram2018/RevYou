import * as fs from "fs";
import { Database } from "./Database";
import { IDatabase } from "IDatabase";
import { User } from "./User";
import { RevYouStatus } from "./RevYouStatus";
import { fail } from "assert";

export class UserDatabase extends Database implements IDatabase {
    public constructor(db: string) {
        super(db);
    }
    public addUser(user: User): RevYouStatus {
        if (!this.containsUser(user)) {
            super.addField(user);
            return new RevYouStatus(true, "Added user");
        } else {
            return new RevYouStatus(false, "User already exists");
        }
    }
    public removeUser(user: User): RevYouStatus {
        if (this.containsUser(user)) {
            super.removeField(user, "id");
            return new RevYouStatus(true, "Removed user");
        } else {
            return new RevYouStatus(false, "Failed to remove user");
        }
    }
    public containsUser(user: User): boolean {
        try {
            const data = fs.readFileSync(this.db, "utf-8");
            const users: User[] = JSON.parse(data);
            for (const u of users) {
                if (u.id === user.id) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            if (e) {
                throw e;
            }
        }
    }
}
