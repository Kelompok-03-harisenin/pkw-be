const { Photo:PhotoModel, Comment:commentModel, Like:likeModel, User:userModel } = require("../models")

const photoComment = async (req, res, next) => {
    const photoID = req.params.photoID
    const photoIDNum = Number(photoID)

    const photoFind = await PhotoModel.findOne({
        where: {id: photoIDNum},
    })

    if (!photoFind) {
        return res.status(404).send({
            message: "Error Photo not found"
        })
    }

    const commentFind = await commentModel.findAll({
        where: { id_photo: photoIDNum },
        attributes: ["id_user", "comment"],
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

const photoLike = async (req, res, next) => {
    const photoID = req.params.photoID
    const photoIDNum = Number(photoID)

    const photoFind = await PhotoModel.findOne({
        where: {id: photoIDNum},
    })

    if (!photoFind) {
        return res.status(404).send({
            message: "Error Photo not found"
        })
    }

    const likeFind = await likeModel.findAll({
        where: { id_photo: photoIDNum },
        attributes: ["id_user"],
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

module.exports = { photoComment, photoLike }