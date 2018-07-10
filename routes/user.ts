import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import * as express from "express";
import { RevYouStatus } from "../src/RevYouStatus";
export const router = express.Router();

router.get("/:method", (req, res, next) => {
    const userDb = new UserDatabase("src/data/user.json");
    let response: RevYouStatus;
    const renderProfile = (id: string): void => {
        const userData: User[] = userDb.getData();
        const index = userData.findIndex((e: User) => e.id === req.params.id);
        res.render("profile", {
            data: userData[index]
        });
    };
    switch (req.params.method) {
        case ("newUser"):
            response = userDb.addUser(new User("test", "pass"));
            break;
        case ("deleteUser"):
            response = userDb.removeUser(req.params.id);
            break;
        case ("profile"):
            renderProfile(req.params.id);
            break;
    }
    if (!response.status) {
        res.send(response.message);
    }
});
