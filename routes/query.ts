import * as express from "express"
export const router = express.Router();

class data {
    name: string;
    desc: string;
    rating: number;
    public constructor(name, desc, rating) {
        this.name = name;
        this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        this.rating = rating;
    }
}

let x = [
    new data("James", "Jiejie", 5),
    new data("Chris", "Dada", 2),
    new data("Mikalea", "WuYi", 5),
    new data("Stephen", "Dab", 10),
    new data("Andrea", "Yangyang", 10)
]

router.get("/", (req, res, next) =>
{
    let ret = [];
    console.log("query", req.query)
    if (req.query.search === "" || ! req.query.search) {
        ret = x;
    } else {
        for (let i of x) {
            if (i.name.toLowerCase() === req.query.search.toLowerCase())
                ret.push(i);
        }
    }
    res.render("query", {
        array: ret
    });
});
