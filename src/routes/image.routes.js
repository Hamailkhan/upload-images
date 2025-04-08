const multer = require("multer");
const express = require("express");
const {
  uploadStoreImage,
  optimizeImage,
} = require("../controllers/image.controller");

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // Adjust path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

route.post(
  "/upload-store-image",
  upload.fields([
    { name: "storeLogo", maxCount: 1 },
    { name: "storeCover", maxCount: 1 },
  ]),
  uploadStoreImage
);
// route.get("/upload", uploadImage);
route.get("/optimize", optimizeImage);

module.exports = { route };
