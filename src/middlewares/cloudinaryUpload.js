
const cloudinary = require('cloudinary').v2
const upload = require('../storage/multer-config');
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
* @param {import("express").Request} req
* @param {import("express").Response} res
* @param {import("express").NextFunction} next
*/
const cloudinaryUpload = async (req, res, next) => {
  if (req.file) {
    try {
      // Upload image to Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'pkw'
      });

      // Send the Cloudinary URL in the response
      req.img = result.secure_url
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading image to Cloudinary' });
    }
  } else {
    next()
  }

}

module.exports = { cloudinaryUpload }
