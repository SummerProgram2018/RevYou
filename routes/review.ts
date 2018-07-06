import * as express from "express"
export const router = express.Router();

const x = {
    name: "good game",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 10
}

router.get("/", (req, res, next) =>
{
    res.render("review", {
        array: [1, 2, 3, 4, 5],
        game: [x, x, x, x, x]
    });
});
