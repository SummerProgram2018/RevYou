import { Review } from "Review";

export class Product {
    public name: string;
    public description: string;
    public reviews: Review[];
    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
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
