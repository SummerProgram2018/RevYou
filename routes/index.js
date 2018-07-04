"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
exports.router.get("/", (req, res, next) => {
    res.render("index", {
        "title": "RevYou"
    });
});
