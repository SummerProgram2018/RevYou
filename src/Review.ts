
import { ReviewField } from "ReviewField";
import { User } from "User";

export class Review {
    public readonly id: string;
    public readonly content: ReviewField; // If we use this, the title for this one must be "Overall".
    // This one's for having a bunch of sub-fields (eg. Sound, Gameplay). User specified
    public readonly categories: ReviewField[];
    public readonly writer: User;
    public constructor(id: string, content: ReviewField, categories: ReviewField[], writer: User) {
        this.id = id;
        this.content = content;
        this.categories = categories;
        this.writer = writer;
    }
}
