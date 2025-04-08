const express = require("express");
const { uploadImage } = require("../controllers/image.controller");

const route = express.Router();

route.post("/upload", uploadImage);

module.exports = { route };
