import { ReviewField } from "./ReviewField";
import { User } from "./User";
import { ReviewEdit } from "./ReviewEdit";

export class Review {
    public readonly productId: string;
    public readonly authorId: string;
    public contents: ReviewEdit[];
    public constructor(productId: string, authorId: string,
                       timestamp: Date, overall: ReviewField, categories: ReviewField[]) {
        this.productId = productId;
        this.authorId = authorId;
        this.contents = [];
        this.addEdit(timestamp, overall, categories);
    }
    public addEdit(timestamp: Date, overall: ReviewField, categories: ReviewField[]): void {
        this.contents.push(new ReviewEdit(timestamp, overall, categories));
    }
}
