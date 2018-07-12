import { Review } from "Review";

export class Product {
    public id: string;
    public name: string;
    public description: string;
    public reviews: Review[];
    public type: string;
    public trackers: {
        likes: number
        reviews: number;
    };
    public constructor(name: string, description: string, type: string) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.reviews = [];
    }
    public addReview(review: Review): boolean {
        if (this.reviews.indexOf(review) === -1) {
            this.reviews.push(review);
            return true;
        }
        return false;
    }
}
