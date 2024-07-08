const { User } = require('../models');

/**
 * Get user profile by ID
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        data: null,
      });
    }

    return res.send({
      message: "Success",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile by ID:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getUserById,
};
