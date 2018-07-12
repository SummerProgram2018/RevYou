import * as fs from "fs";
import { Database } from "./Database";
import { IDatabase } from "./IDatabase";
import { Review } from "./Review";
import { ReviewField } from "./ReviewField";

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
    public editReview(authorId: string, productId: string, timestamp: Date,
                      overall: ReviewField, categories: ReviewField[]) {
        fs.readFile(this.db, (err: any, res: any) => {
            if (err) {
                throw err;
            }
            const reviews: Review[] = JSON.parse(res);
            const index = reviews.findIndex(e => e.authorId === authorId && e.productId === productId);
            reviews[index].addEdit(timestamp, overall, categories);
            fs.writeFileSync(this.db, JSON.stringify(reviews));
        });
    }
}
