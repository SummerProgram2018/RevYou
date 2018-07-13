import * as express from "express";
import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import { ReviewDatabase } from "../src/ReviewDatabase";
import { ProductDatabase } from "../src/ProductDatabase";
import { Product } from "Product";
export const router = express.Router();

router.get("/", (req, res, next) => {
    const userData = new UserDatabase("src/data/user.json").getData();
    const reviewData = new ReviewDatabase("src/data/reviews.json").getData();
    const data: any = {
        game: new ProductDatabase("src/data/games.json"),
        movie: new ProductDatabase("src/data/movies.json"),
        book: new ProductDatabase("src/data/books.json")
    };
    const dataSet: any[] = [];
    for (const review of reviewData) {
        const index = data[review.type].getData().findIndex((e: Product) => String(e.id) === review.productId);
        review.item = data[review.type].getData()[index];
        dataSet.push(review);
    }
    res.render("index", {
        dataSet,
        title: "RevYou"
    });
});
