const { Photo: PhotoModel, Like: likeModel, User: userModel } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getLikesByID = async (req, res, next) => {
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

module.exports = { getLikesByID }
