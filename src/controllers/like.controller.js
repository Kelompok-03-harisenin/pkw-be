const { Photo: PhotoModel, Like: likeModel, User: userModel } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getLikesByPhotoID = async (req, res, next) => {
  const photoID = req.params.photoID
  const photoIDNum = Number(photoID)

  const photoFind = await PhotoModel.findOne({
    where: { id: photoIDNum },
  })

  if (!photoFind) {
    return res.status(404).send({
      message: "Error Photo not found"
    })
  }

  const likeFind = await likeModel.findAll({
    where: { id_photo: photoIDNum },
    attributes: ["id", "id_user"],
    include: [
      {
        model: userModel,
        attributes: ["id", "name"],
        as: "user"
      }
    ]
  })

  return res.status(200).send({
    message: "Photo found",
    data: likeFind
  })
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const addLikeByPhotoID = async (req, res, next) => {
  const photoID = req.params.photoID
  const photoIDNum = Number(photoID)

  const photoFind = await PhotoModel.findOne({
    where: { id: photoIDNum },
  })

  if (!photoFind) {
    return res.status(404).send({
      message: "Error Photo not found"
    })
  }

  const user = req.user

  const likeFind = await likeModel.findOne({
    where: {
      id_photo: photoIDNum,
      id_user: user.id
    }
  })

  if (likeFind) {
    return res.status(409).send({ message: "Error, Like already exists" })
  }

  const likeCreate = await likeModel.create({
    id_photo: photoIDNum,
    id_user: user.id
  })

  if (!likeCreate) {
    return res.status(500).send({ message: "Like creation failed" })
  }

  return res.status(201).send({
    message: "Like creation successful",
    data: {
      id: likeCreate.id,
      id_photo: likeCreate.id_photo,
      id_user: likeCreate.id_user
    }
  })
}


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const removeLikeByPhotoID = async (req, res, next) => {
  const photoID = req.params.photoID
  const photoIDNum = Number(photoID)

  const photoFind = await PhotoModel.findOne({
    where: { id: photoIDNum },
  })

  if (!photoFind) {
    return res.status(404).send({
      message: "Error Photo not found"
    })
  }

  const user = req.user

  const likeFind = await likeModel.findOne({
    where: {
      id_photo: photoIDNum,
      id_user: user.id
    }
  })

  if (!likeFind) {
    return res.status(404).send({ message: "Error, Like doesnt exist" })
  }

  const deletedLike = await likeModel.destroy({
    where: {
      id_photo: photoIDNum,
      id_user: user.id
    }
  })

  if (!deletedLike) {
    return res.status(500).send({ message: "Error unable to remove like" })
  }

  return res.status(200).send({
    message: "Like removed",
    data: {
      id_photo: likeFind.id_photo,
      id_user: likeFind.id_user
    }
  })
}

module.exports = { getLikesByPhotoID, addLikeByPhotoID, removeLikeByPhotoID }
