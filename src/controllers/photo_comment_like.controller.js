const { Photo: PhotoModel, Comment: commentModel, Like: likeModel, User: userModel } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const photoGetComments = async (req, res, next) => {
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

  const commentFind = await commentModel.findAll({
    where: { id_photo: photoIDNum },
    attributes: ["id", "id_user", "id_photo", "comment"],
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
    data: commentFind
  })
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const photoAddComments = async (req, res, next) => {
  const { comment } = req.body

  if (!comment) {
    return res.status(401).send({ message: "ERROR body is empty/isnt filled properly" })
  }

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

  const commentCreate = await commentModel.create({
    id_photo: photoIDNum,
    id_user: user.id,
    comment: comment
  })

  if (!commentCreate) {
    return res.status(401).send({ message: "Comment creation failed" })
  }

  return res.status(201).send({
    message: "Comment creation successful",
    data: {
      id: commentCreate.id,
      id_photo: commentCreate.id_photo,
      id_user: commentCreate.id_user,
      comment: commentCreate.comment
    }
  })
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const photoGetLikes = async (req, res, next) => {
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

module.exports = { photoGetComments, photoGetLikes, photoAddComments }
