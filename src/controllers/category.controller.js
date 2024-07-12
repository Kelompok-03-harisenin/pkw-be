const { Category, Photo, User, Sequelize } = require('../models');
const { Op } = Sequelize; // Import Op dari Sequelize

/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const index = async (_req, res, _next) => {
  const categories = await Category.findAll();

  if (!categories) {
    return res.status(404).send({
      message: "Error, categories not found"
    })
  }

  return res.status(200).send({
    message: "Success",
    data: categories.map((category) => ({
      id: category.id,
      category_name: category.category_name,
    })),
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const show = async (req, res, _next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id, {
    include: [
      {
      model: Photo,
      as: "photos",
      include: [
        {
          model: User,
          as: "user"
        }
      ]
      },
    ]
  });

  if (!category) {
    return res.status(404).send({
      message: "Category not found",
      data: null,
    });
  }

  return res.status(200).send({
    message: "Success",
    data: {
      id: category.id,
      category_name: category.category_name,
      photos: category.photos.map(photo => ({
        id: photo.id,
        photo_url: photo.photo_url,
        user_id: photo.user.id,
        user_name: photo.user.name,
        user_profile_picture: photo.user.profile_picture,
        user_title: photo.user.title
      })),
    },
  });
};

module.exports = { index, show };
