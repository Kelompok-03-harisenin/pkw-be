const { Photo: PhotoModel } = require("../models");

const addPhotoService = async (id_user, id_category, photo_url, title, description) => {
  try {
    const photo = await PhotoModel.create({ id_user, id_category, photo_url, title, description });

    return photo;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPhotoService,
};