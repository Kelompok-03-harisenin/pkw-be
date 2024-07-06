const {
  Photo: PhotoModel,
} = require("../models");

const editPhoto = async (req, res, next) => {
    const { photoId } = req.params;
    const { photo_url, id_category } = req.body;
    // const currentUser = req.user;
  
    // Find the existing photo
    const existingPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    if (!existingPhoto) {
      return res.status(404).send({ message: "Photo not found" });
    }
  
    // Update the photo details
    await PhotoModel.update(
      {
        photo_url: photo_url || existingPhoto.photo_url,
        id_category: id_category || existingPhoto.id_category,
      },
      {
        where: { id: photoId }
      }
    );
  
    // Fetch the updated photo
    const updatedPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    return res.send({
      message: "Photo updated successfully",
      data: {
        id: updatedPhoto.id,
        photo_url: updatedPhoto.photo_url,
        id_category: updatedPhoto.id_category,
      }
    });
  };

  const deletePhoto = async (req, res, next) => {
    const { photoId } = req.params;
    // const currentUser = req.user;
  
    // Find the existing photo
    const existingPhoto = await PhotoModel.findOne({
      where: { id: photoId }
    });
  
    if (!existingPhoto) {
      return res.status(404).send({ message: "Photo not found" });
    }
  
    // Delete the photo
    await PhotoModel.destroy({
      where: { id: photoId }
    });
  
    return res.send({ message: "Photo deleted successfully" });
  };
  
  
  module.exports = {editPhoto, deletePhoto};