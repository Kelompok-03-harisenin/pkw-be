const { getAllCategories, findCategoryById } = require("../models/category");

/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const index = async (_req, res, _next) => {
  const categories = await getAllCategories();

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
  const category = await findCategoryById(id);

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
    },
  });
};

module.exports = { index, show };
