const { Photo: PhotoModel, Comment: commentModel, User: userModel } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getCommentsByPhoto = async (req, res, next) => {
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
const addCommentsToPhoto = async (req, res, next) => {
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
    return res.status(500).send({ message: "Comment creation failed" })
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
const removeCommentByID = async (req, res, _next) => {
  const { commentID } = req.params

  if (!commentID) {
    return res.status(401).send({ message: "ERROR param is not filled properly" })
  }

  const commentIDnum = Number(commentID)

  const existingComment = await commentModel.findOne({
    where: { id: commentIDnum },
    attributes: ["id", "id_photo", "id_user", "comment"]
  })

  if (!existingComment) {
    return res.status(404).send({ message: "Comment not found" });
  }

  if (req.user.id != existingComment.id_user) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  const deletedComment = await commentModel.destroy({
    where: { id: commentIDnum }
  })

  if (!deletedComment) {
    return res.status(500).send({ message: "Error unable to delete comment" })
  }

  return res.status(200).send({
    message: "Comment removed",
    data: existingComment
  })
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const editCommentByID = async (req, res, next) => {
  const { commentID } = req.params
  const { comment } = req.body

  if (!commentID) {
    return res.status(401).send({ message: "ERROR param is not filled properly" })
  }

  const commentIDnum = Number(commentID)

  const existingComment = await commentModel.findOne({
    where: { id: commentIDnum },
    attributes: ["id", "id_photo", "id_user", "comment"]
  })

  if (!existingComment) {
    return res.status(404).send({ message: "Comment not found" });
  }

  if (req.user.id != existingComment.id_user) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  const updateComment = await commentModel.update(
    {
      comment: comment || existingComment.comment
    },
    {
      where: { id: commentIDnum }
    }
  )

  if (!updateComment) {
    return res.status(500).send({ message: "Error updating comment " })
  }

  const updatedComment = await commentModel.findOne({
    where: { id: commentIDnum },
    attributes: ["id", "id_photo", "id_user", "comment"]
  })

  return res.status(200).send({
    message: "Comment updated",
    data: updatedComment
  })
}


module.exports = { getCommentsByPhoto, addCommentsToPhoto, removeCommentByID, editCommentByID }
