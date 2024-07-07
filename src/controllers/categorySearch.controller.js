const { Category, Photo, Sequelize } = require('../models');
const { Op } = Sequelize;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const search = async (req, res, _next) => {
  const { category_name } = req.params;

  try {
    const categories = await Category.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('category_name')),
        {
          [Op.like]: `%${category_name.toLowerCase()}%`
        }
      ),
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
      })),
    }));

    return res.status(200).send({
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

module.exports = { search };
