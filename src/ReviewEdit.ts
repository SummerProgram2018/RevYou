import {ReviewField } from "ReviewField";

export class ReviewEdit {
    public readonly timestamp: Date;
    public readonly overall: ReviewField;
    public readonly categories: ReviewField[];
    public constructor(timestamp: Date, overall: ReviewField, categories: ReviewField[]) {
        this.timestamp = timestamp;
        this.overall = overall;
        this.categories = categories;
    }
}
