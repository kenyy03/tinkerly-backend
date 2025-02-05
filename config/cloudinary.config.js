const cloudinary = require("cloudinary").v2;
const config = require('./index').config;

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (filePath, folderName, userId) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      public_id: userId,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    return response;
  }catch(error){
    return {};
  }
};