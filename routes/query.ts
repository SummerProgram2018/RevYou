import * as express from "express"
export const router = express.Router();

class data {
    name: string;
    desc: string;
    rating: number;
    public constructor(name, desc, rating) {
        this.name = name;
        this.desc = desc;
        this.rating = rating;
    }
}

let x = [
    new data("james", "Jiejie", 5),
    new data("chris", "Dada", 2),
    new data("mikalea", "WuYi", 5),
    new data("stephen", "Dab", 10),
    new data("andrea", "Yangyang", 10)
]

router.get("/", (req, res, next) =>
{
    console.log(req.query);
    let newX = [];
    for (let i of x) {
        console.log(i)
        if(i.name==req.query.query)
            newX.push(i);
    }
    res.render("query", {
        array: newX
    });
});
