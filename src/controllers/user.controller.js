const { User: UserModel, Photo: PhotoModel } = require('../models');
const bcrypt = require("bcryptjs");

/**
 * Get user profile by ID
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUserById = async (req, res, _next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
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

/**
 * Get user profile by ID
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUserByToken = async (req, res, _next) => {
  const id = req.user.id;

  try {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
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

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const updateUserByID = async (req, res, _next) => {
  const { id } = req.params
  const { name, email, password, biography, title } = req.body

  if (req.user.id != id) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  const userFind = await UserModel.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!userFind) {
    return res.status(404).send({
      message: "User not found",
      data: null,
    });
  }

  const passwordHashed = userFind.password

  if (password) {
    passwordHashed = bcrypt.hash(password, 10)
  }

  const updatedUser = await UserModel.update(
    {
      name: name || userFind.name,
      email: email || userFind.email,
      password: passwordHashed || userFind.password,
      biography: biography || userFind.biography,
      title: title || userFind.title,
      profile_picture: req.img || userFind.profile_picture
    },
    {
      where: { id: id }
    }
  )

  if (!updatedUser) {
    return res.status(500).send({ message: "Error updating user" })
  }

  const userFindUpdated = await UserModel.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return res.status(200).send({
    message: "User updated",
    data: userFindUpdated
  })
}

/**
 * Get photos by user id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getPhotosByUserId = async (req, res, next) => {
  const { id } = req.params

  const userFind = await UserModel.findByPk(id);

  if (!userFind) {
    return res.status(404).send({
      message: "User not found",
      data: null,
    });
  }


  const photosFind = await PhotoModel.findAll({
    where: { id_user: id },
    attributes: ["id", "id_user", "id_category", "photo_url", "title", "description"]
  })

  if (!photosFind) {
    return res.status(404).send({
      message: "Photos not found",
      data: null,
    });
  }

  return res.status(200).send({
    message: "User updated",
    data: photosFind
  })
}

module.exports = {
  getUserById,
  updateUserByID,
  getUserByToken,
  getPhotosByUserId
};
