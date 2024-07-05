const { Category, Photo } = require('../models');

/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const index = async (_req, res, _next) => {
  const categories = await Category.findAll();

  return res.send({
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
    include: 'photos'
  });

  if (!category) {
    return res.status(404).send({
      message: "Category not found",
      data: null,
    });
  }

  return res.send({
    message: "Success",
    data: {
      id: category.id,
      category_name: category.category_name,
      photos: category.photos.map(photo => ({
        id: photo.id,
        photo_url: photo.photo_url,
        description: photo.description,
      })),
    },
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const search = async (req, res, _next) => {
  const { name } = req.query;

  try {
    const categories = await Category.findAll({
      where: {
        category_name: {
          [Sequelize.Op.iLike]: `%${name}%`
        }
      },
      include: {
        model: Photo,
        as: 'photos'
      }
    });

    if (!categories || categories.length === 0) {
      return res.status(404).send({
        message: "Category not found",
        data: null,
      });
    }

    const formattedCategories = categories.map(category => ({
      id: category.id,
      category_name: category.category_name,
      photos: category.photos.map(photo => ({
        id: photo.id,
        photo_url: photo.photo_url,
        description: photo.description,
      })),
    }));

    return res.send({
      message: "Success",
      data: formattedCategories,
    });
  } catch (error) {
    console.error("Error searching categories:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { index, show, search };
