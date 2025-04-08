const uploadImage = async (req, res) => {
  return res.status(200).json({
    message: "Image uploaded successfully",
  });
};

module.exports = {
  uploadImage,
};
