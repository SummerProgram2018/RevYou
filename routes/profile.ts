import * as express from "express";
import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import { Database } from "../src/Database";
import { ReviewDatabase } from "../src/ReviewDatabase";
import { Review } from "../src/Review";
import { ProductDatabase } from "../src/ProductDatabase";
import { Product } from "../src/Product";
export const router = express.Router();

router.get("/:id", (req, res, next) => {
    const data = new UserDatabase("src/data/user.json").getData();
    const index = data.findIndex((e: User) => e.id = req.params.id);
    const user: User = data[index];
    const reviews: Review[] = new ReviewDatabase("src/data/reviews.json").getData();
    const reviewSet: any[][] = [];
    const dataSets: any = {
        game: new ProductDatabase("src/data/games.json"),
        movie: new ProductDatabase("src/data/movies.json"),
        book: new ProductDatabase("src/data/books.json")
    };
    for (const review of reviews) {
        if (review.authorId === user.id) {
            const productIndex = dataSets[review.type].getData()
            .findIndex((e: Product) => String(e.id) === review.productId);
            reviewSet.push([review, dataSets[review.type].getData()[productIndex]]);

        }
    }
    res.render("profile", {
        user,
        reviewSet
    });
});
