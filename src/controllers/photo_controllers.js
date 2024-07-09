const {
  Photo: PhotoModel,
} = require("../models");
const photo = require("../models/photo");
const { addPhotoService } = require("../services/photoService");

const uploadPhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      throw { statusCode: 400, message: "Tidak ada foto yang di upload" };
    }

    const { id_category, title, description } = req.body;

    if (!title) {
      throw { statusCode: 400, message: "Nama foto tidak boleh kosong" };
    }

    const result = await addPhotoService(userId, id_category, req.file.path, title, description);
    res
      .status(201)
      .send({ message: "Berhasil menambahkan foto", photo: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editPhoto = async (req, res, next) => {
    const { photoId } = req.params;
    const { photo_url, id_category, title, description } = req.body;
    const userId = req.user.id;
  
    // Find the existing photo
    const existingPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    if (!existingPhoto) {
      return res.status(404).send({ message: "Photo not found" });
    }
  
    
    if (existingPhoto.id_user !== userId) {
      return res.status(403).send({ message: "You don't have permission to edit this photo" });
    }

    // Update the photo details
    await PhotoModel.update(
      {
        id_category: id_category || existingPhoto.id_category,
        photo_url: req.file?.path || photo_url || existingPhoto.photo_url,
        title: title || existingPhoto.title,
        description: description || existingPhoto.description,
      },
      {
        where: { id: photoId }
      }
    );
  
    // Fetch the updated photo
    const updatedPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    return res.status(200).send({
      message: "Photo updated successfully",
      data: {
        id: updatedPhoto.id,
        photo_url: updatedPhoto.photo_url,
        id_category: updatedPhoto.id_category,
        title: updatedPhoto.title,
        description: updatedPhoto.description,
      }
    });
  };

  const deletePhoto = async (req, res, next) => {
    const { photoId } = req.params;
    const userId = req.user.id;
  
    // Find the existing photo
    const existingPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    if (!existingPhoto) {
      return res.status(404).send({ message: "Photo not found" });
    }

    if (existingPhoto.id_user !== userId) {
      return res.status(403).send({ message: "You don't have permission to delete this photo" });
    }

    // Delete the photo
    await PhotoModel.destroy({
      where: { id: photoId }
    });
  
    return res.status(200).send({ message: "Photo deleted successfully" });
  };
  
  
  module.exports = {uploadPhoto, editPhoto, deletePhoto};