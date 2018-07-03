"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
router.get("/", (req, res, next) => {
    res.render("index", {
        "title": "RevYou"
    });
});
module.exports = router;
