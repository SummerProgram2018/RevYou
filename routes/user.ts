import { UserDatabase } from "../src/UserDatabase";
import { User } from "../src/User";
import * as express from "express";
import { RevYouStatus } from "../src/RevYouStatus";
export const router = express.Router();

router.post("/:method", (req, res, next) => {
    const userDb = new UserDatabase("src/data/user.json");
    let response: RevYouStatus;
    const login = () => {
        const data: User[] = userDb.getData();
        const index = data.findIndex((e: User) => e.id === req.body.username);
        if (index === -1) {
            res.send(JSON.stringify(new RevYouStatus(false, "Invalid details.")));
            return;
        }
        const password = data[index].password;
        const user = new User(req.body.username, req.body.password);
        if (password !== user.password) {
            res.send(JSON.stringify(new RevYouStatus(false, "Invalid details")));
            return;
        }
        res.cookie("id", req.body.username);
        res.send(JSON.stringify(new RevYouStatus(true, "Logged in.")));
    };
    const getSettings = () => {
        const data: User[] = userDb.getData();
        const index = data.findIndex((e: User) => e.id === req.cookies.id);
        if (index === -1) {
            res.send(JSON.stringify(new RevYouStatus(false, "Not found.")));
            return;
        }
        res.send(JSON.stringify(data[index].settings));
    };
    switch (req.params.method) {
        case ("newUser"):
            response = userDb.addUser(new User(req.body.username, req.body.password));
            if (response.status) {
                res.cookie("id", req.body.username);
            }
            break;
        case ("getSessionId"):
            res.send(req.cookies.id);
            break;
        case ("login"):
            login();
            break;
        case ("getSettings"):
            getSettings();
            break;
        case ("logout"):
            res.clearCookie("id");
            response = new RevYouStatus(true, "Logged out");
            break;
        case ("deleteUser"):
            response = userDb.removeUser(req.params.username);
            break;
    }
    if (response) {
        res.send(JSON.stringify(response));
    }
});
