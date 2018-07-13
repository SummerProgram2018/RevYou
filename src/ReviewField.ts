export class ReviewField {
    public readonly title: string; // eg. "Gameplay", "Graphics", "Sound", "Overall"
    public readonly description?: string; // List of thoughts and opinions on the product
    public readonly rating: number; // Restrict this to be a number from 0-100, or 0-5. Whatever works.
    private readonly ratingMin = 0;
    private readonly ratingMax = 100;
    public constructor(title: string, rating: number, description?: string) {
        this.title = title;
        this.description = description;
        this.rating = Math.min(Math.max(rating, this.ratingMin), this.ratingMax);
    }
}
