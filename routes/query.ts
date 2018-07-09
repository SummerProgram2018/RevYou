import * as express from "express";
import { ProductDatabase } from "../src/ProductDatabase";
export const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(req.query);
    const dataSet = new ProductDatabase("src/data/games.json");
    // for (let i of x) {
    //     console.log(i)
    //     if(i.name==req.query.query)
    //         newX.push(i);
    // }
    console.log("m", dataSet.getData());
    res.render("query", {
        array: dataSet.getData()
    });
});
