import * as express from "express";
import { UserDatabase } from "../src/UserDatabase";
import { ProductDatabase } from "../src/ProductDatabase";
import { User } from "../src/User";
import { randInt } from "../src/Utils";
import { Product } from "../src/Product";

export const router = express.Router();
const x = new UserDatabase("src/data/user.json");
const u = new User("egg2", "pass");
x.addUser(u);
router.get("/", (req, res, next) => {
    res.render("index", {
        title: "RevYou"
        
    });
    
    
});
