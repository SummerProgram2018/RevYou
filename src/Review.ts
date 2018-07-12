import { ReviewField } from "./ReviewField";
import { User } from "./User";
import { ReviewEdit } from "./ReviewEdit";

export class Review {
    public readonly productId: string;
    public readonly authorId: string;
    public type: string;
    public contents: ReviewEdit[];
    public constructor(productId: string, authorId: string, type: string,
                       timestamp: Date, overall: ReviewField, categories: ReviewField[]) {
        this.productId = productId;
        this.authorId = authorId;
        this.type = type;
        this.contents = [];
        this.addEdit(timestamp, overall, categories);
    }
    public addEdit(timestamp: Date, overall: ReviewField, categories: ReviewField[]): void {
<<<<<<< HEAD
        this.contents.push(new ReviewEdit(timestamp, overall, categories));
=======
        const e = new ReviewEdit(timestamp, overall, categories);
        this.contents.push(e);
>>>>>>> c397006f36c01c07826633a849859b8eea8e88ab
    }
}
