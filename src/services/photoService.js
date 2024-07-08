const { Photo: PhotoModel } = require("../models");

const addPhotoService = async (id_user, id_category, photo_url, title, description) => {
  try {
    console.log("ini sudah masuk ke dalam service");

    console.log("Ini id user yang bakal di save", id_user);
    console.log("Ini id category yang bakal di save", id_category);
    console.log("Ini url yang bakal di save", photo_url);
    console.log("Ini title yang bakal di save", title);
    console.log("Ini description yang bakal di save", description);
    const photo = await PhotoModel.create({ id_user, id_category, photo_url, title, description });
    console.log(
      "Ini harusnya mengeluarkan product hasil create di Product",
      photo
    );
    return photo;
  } catch (error) {
    console.error("Error in addPhotoService", error);
    throw error;
  }
};

module.exports = {
  addPhotoService,
};