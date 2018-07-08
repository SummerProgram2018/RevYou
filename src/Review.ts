import * as fs from "fs";
import { ReviewField } from "ReviewField"; 

export class Review {
    public readonly id: string;
    public readonly overall: ReviewField; // If we use this, the title for this one must be "Overall".
    public readonly categories: Array<ReviewField>; //This one's for having a bunch of sub-fields (eg. Sound, Gameplay). User specified

    public constructor(id: string, overall: ReviewField, categories: Array<ReviewField>) {
        this.id = id;
        this.overall = overall;
        this.categories = categories;
    }

    public getReview(): Review {
        return this;
    }

    public retrieveDb(id: string) {
        return;
    }

    public saveReview(path: string) {
        const content = JSON.stringify(this);
        fs.writeFile(path, content, "utf8", (err: any) => {
            //
        });
    }
}
