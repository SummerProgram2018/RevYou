import * as express from "express";
import { ProductDatabase } from "../src/ProductDatabase";
import { Product } from "../src/Product";
import { ReviewDatabase } from "../src/ReviewDatabase";
import { RevYouStatus } from "../src/RevYouStatus";
import { Review } from "../src/Review";
import { ReviewField } from "../src/ReviewField";
export const router = express.Router();
router.post("/:method", (req, res, next) => {
    const reviewDb = new ReviewDatabase("src/data/reviews.json");
    const category: ReviewField[] = [];
    if (req.body.category) {
        for (const cat of JSON.parse(req.body.category)) {
            category.push(new ReviewField(cat[0], Number(cat[1])));
        }
    }
    const review = new Review(
        req.body.pId,
        req.body.userId,
        req.body.type,
        new Date(),
        new ReviewField(req.body.title, Number(req.body.overall), req.body.reviewText),
        category
    );
    reviewDb.addReview(review);
    const data: any = {
        game: new ProductDatabase("src/data/games.json"),
        movie: new ProductDatabase("src/data/movies.json"),
        book: new ProductDatabase("src/data/books.json")
    };
    const db: ProductDatabase = data[req.body.type].addTrackerNum(req.body.pId, 1, "reviews");
    res.send(new RevYouStatus(true, "Added review to DB"));
});
router.get("/:type/:id", (req, res, next) => {
    if (req.params.type === "site" && req.params.id === "0") {
        res.render("e");
    }
    const data: any = {
        game: new ProductDatabase("src/data/games.json"),
        movie: new ProductDatabase("src/data/movies.json"),
        book: new ProductDatabase("src/data/books.json")
    };
    const dataSet = data[req.params.type.toLowerCase()].getData();
    const index = dataSet.findIndex((e: Product) => Number(e.id) === Number(req.params.id));
    let rating = Number(dataSet[index].score);
    let activeRating = 0;
    while (rating >= 10) {
        rating -= 10;
        activeRating++;
    }
    const inactiveRating = 10 - activeRating;
    const reviewDb = new ReviewDatabase("src/data/reviews.json");
    const reviewSet: Review[] = [];
    for (const review of reviewDb.getData()) {
        if (review.type.toLowerCase() === req.params.type.toLowerCase()
            && review.productId === req.params.id) {
                reviewSet.push(review);
        }
    }
    res.render("review", {
        product: dataSet[index],
        reviewSet,
        ratings: {
            activeRating,
            inactiveRating
        }
    });
});
