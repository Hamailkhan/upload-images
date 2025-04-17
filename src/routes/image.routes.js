const express = require("express");
const {
  uploadStoreImage,
  optimizeImage,
  uploadProductImage,
} = require("../controllers/image.controller");
const upload = require("../middleware/multer.middleware");

const route = express.Router();

route.post(
  "/upload-store-image",
  upload.fields([
    { name: "storeLogo", maxCount: 1 },
    { name: "storeCover", maxCount: 1 },
  ]),
  uploadStoreImage
);

route.post(
  "/upload-product-images",
  upload.array("productImages"),
  uploadProductImage
);

// route.get("/upload", uploadImage);
route.get("/optimize", optimizeImage);

module.exports = { route };
