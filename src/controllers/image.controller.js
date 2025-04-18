const fs = require("fs");
const cloudinary = require("../config/cloudinary.config");
const uploadQueue = require("../queues/image.queue");

const uploadStoreImage = async (req, res) => {
  try {
    let imageData = {};

    const processUpload = async (file, folderName) => {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${file.filename}`,
        folder: folderName,
      });
      fs.unlinkSync(file.path);
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    };

    const tasks = [];

    if (req.files.storeLogo) {
      const file = req.files.storeLogo[0];
      tasks.push(
        uploadQueue
          .add(() => processUpload(file, "storesLogos"))
          .then((data) => (imageData.storeLogo = data))
      );
    }

    if (req.files.storeCover) {
      const file = req.files.storeCover[0];
      tasks.push(
        uploadQueue
          .add(() => processUpload(file, "storesCoverPhotos"))
          .then((data) => (imageData.storeCover = data))
      );
    }

    await Promise.all(tasks);

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      images: imageData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const files = req.files;
    let imageData = [];

    const processUpload = async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${file.filename}`,
        folder: "Products",
      });
      fs.unlinkSync(file.path);
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    };

    const tasks = files.map((file) =>
      uploadQueue
        .add(() => processUpload(file))
        .then((data) => imageData.push(data))
    );

    await Promise.all(tasks);

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      images: imageData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

const optimizeImage = async (req, res) => {
  try {
    const { publicId } = req.query;

    const optimizedUrl = cloudinary.url(publicId, {
      fetch_format: "auto",
      quality: "auto",
    });

    return res.status(200).json({
      success: true,
      optimized_url: optimizedUrl,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Image optimization failed" });
  }
};

module.exports = {
  uploadStoreImage,
  optimizeImage,
  uploadProductImage,
};
