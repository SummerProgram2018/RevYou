import * as express from "express";
import { ProductDatabase } from "../src/ProductDatabase";
import { Product } from "../src/Product";
export const router = express.Router();

router.get("/:type/:id", (req, res, next) => {
    const data: any = {
        game: new ProductDatabase("src/data/games.json"),
        movie: new ProductDatabase("src/data/movies.json"),
        book: new ProductDatabase("src/data/books.json")
    };
    const dataSet = data[req.params.type.toLowerCase()].getData();
    const index = dataSet.findIndex((e: Product) => Number(e.id) === Number(req.params.id));
    let rating = Number(dataSet[index].score);
    let activeRating = 0;
    console.log(rating)
    while (rating > 10) {
        rating -= 10;
        activeRating++;
    }
    const inactiveRating = 10 - rating;
    console.log(activeRating)
    res.render("review", {
        product: dataSet[index],
        ratings: {
            activeRating,
            inactiveRating
        }
    });
});
