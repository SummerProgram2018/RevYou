import * as express from "express";
import * as path from "path";
import * as lessMiddleware from "less-middleware";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { router as index } from "./routes/index";
import { router as user } from "./routes/user";
import { router as review } from "./routes/review";
import { router as query } from "./routes/query";
import { router as profile } from "./routes/profile";

export const app = express();

app.use(lessMiddleware(__dirname + "/public", [{
    render: {
        compress: true
    }
}]));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/user", user);
app.use("/review", review);
app.use("/query", query);
app.use("/profile", profile);

app.use((req, res, next) => {
    let err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});
