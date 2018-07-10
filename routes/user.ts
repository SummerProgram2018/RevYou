import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import * as express from "express";
export const router = express.Router();

router.get("/:method", (req, res, next) => {
    const userDb = new UserDatabase("src/data/user.json");
    let response;
    switch (req.params.method) {
        case ("newUser"): response = userDb.addUser(new User("test", "pass"));
                          break;
        case ("profile"): res.render("profile", {});
                          break;
    }
});
