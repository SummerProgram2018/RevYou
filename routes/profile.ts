import * as express from "express";
import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import { Database } from "../src/Database";
export const router = express.Router();

router.get("/:id", (req, res, next) => {
    res.render("profile", {
        user: user
    });
});
