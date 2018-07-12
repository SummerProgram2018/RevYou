import * as fs from "fs";
import { Database } from "Database";
import { User } from "User";
import { IDatabase } from "IDatabase";
import { Review } from "Review";

export class ReviewDatabase extends Database implements IDatabase {
    public constructor(db: string) {
        super(db);
    }
    public addReview(review: Review): void {
        super.addField(review);
    }
    public containsUser(user: string): boolean {
        return;
    }
}
