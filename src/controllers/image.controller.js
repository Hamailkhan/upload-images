const fs = require("fs");
const cloudinary = require("../config/cloudinary.config");

// const uploadImage = async (req, res) => {
//   try {
//     const { folder } = req.body;

//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       public_id: `${req.file.filename}`,
//       folder: folder,
//     });

//     fs.unlinkSync(req.file.path);

//     return res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully!",
//       url: uploadResult.secure_url,
//       public_id: uploadResult.public_id,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Image upload failed",
//       error: error.message,
//     });
//   }
// };

const uploadStoreImage = async (req, res) => {
  try {
    let imageData = {};

    if (req.files.storeLogo) {
      const file = req.files.storeLogo[0];
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${file.filename}`,
        folder: "storesLogos",
      });
      fs.unlinkSync(file.path);
      imageData.storeLogo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files.storeCover) {
      const file = req.files.storeCover[0];
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${file.filename}`,
        folder: "storesCoverPhotos",
      });
      fs.unlinkSync(file.path);
      imageData.storeCover = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

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
};
