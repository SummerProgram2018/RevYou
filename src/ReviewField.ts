export class ReviewField {

    public readonly id: string; //Dunno what the fug to do here
    public readonly title: string; //eg. "Gameplay", "Graphics", "Sound", "Overall"
    public readonly description: string; //List of thoughts and opinions on the product
    public readonly rating: number; //Restrict this to be a number from 0-100, or 0-5. Whatever works.
    public readonly date: Date; //Date this review was generated. Technically shows edit dates if that gets done, since edit history is just a copy of the old version

    private readonly ratingMin = 0;
    private readonly ratingMax = 100;

    public constructor(id: string, title: string: description: string, rating: number, date: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        if (this.ratingMin <= rating && rating <= this.ratingMax) {
            this.rating = rating;
        } else {
            //TODO: throw error
        }
        this.date = date;
    }

    public getReviewField(): ReviewField {
        return this;
    }

    public retrieveDb(id: string) {
        return;
    }

}
