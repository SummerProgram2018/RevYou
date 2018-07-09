import * as express from "express";
import { ProductDatabase } from "../src/ProductDatabase";
import { randInt } from "../src/Utils";
import { Product } from "../src/Product";
export const router = express.Router();

router.get("/", (req, res, next) => {
    const data: object = {
        games: new ProductDatabase("src/data/games.json"),
        movies: new ProductDatabase("src/data/movies.json")
        // books: new ProductDatabase("src/data/books.json")
    };
    let dataSet: any[] = [];
    let filteredSet: any[] = [];
    if (!req.query.productType || req.query.productType === "anything") {
        for (let i = 0; i < 100; i++) {
            const set: number = randInt(0, Object.keys(data).length);
            const products: Product[] = data[Object.keys(data)[set]].getData();
            const selection: Product = products[randInt(0, products.length)];
            if (dataSet.findIndex((e: Product) => e.name === selection.name) === -1) {
                dataSet.push(selection);
            }
        }
    } else {
        dataSet = data[req.query.productType].getData();
        if (!dataSet) {
            dataSet = [];
        }
    }
    if (req.query.search) {
        for (const d of dataSet) {
            if (d.name.toLowerCase().trim() === req.query.search.toLowerCase().trim()) {
                filteredSet.push(d);
            }
        }
    } else {
        filteredSet = dataSet;
    }
    res.render("query", {
        results: filteredSet,
        resultLength: filteredSet.length
    });
});
