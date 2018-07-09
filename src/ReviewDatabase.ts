import * as fs from "fs";
import { Database } from "Database";
import { User } from "User";
import { IDatabase } from "IDatabase";
import { Review } from "Review";

export class ReviewDatabase extends Database implements IDatabase {
    public constructor(db: string) {
        super(db);
    }
    public addReview(review: Review): boolean {
        fs.writeFile(this.db, review, (err: any) => {
            if (err) {
                return false;
            }
        });
        return true;
    }
    public containsUser(user: string): boolean {
        return;
    }
}
