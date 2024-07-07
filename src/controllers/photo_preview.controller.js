const { Photo:PhotoModel, User:UserModel, Category:CategoryModel, Like:LikeModel, Comment:CommentModel } = require("../models")

const photoPreview = async (req, res, next) => {
    const photoID = req.params.photoID
    const photoIDNum = Number(photoID)
    
    const photoFind = await PhotoModel.findOne({
        where: {id: photoIDNum},
        attributes: ["id", "photo_url"],
        include: [
            {
                model: UserModel,
                attributes: ["id", "name"],
                as: "user"
            },
            {
                model: CategoryModel,
                attributes: ["id", "category_name"],
                as: "category"
            },
            {
                model: LikeModel,
                attributes: ["id_user"],
                as: "likes",
                include: [
                    {
                        model: UserModel,
                        attributes: ["name"],
                        as: "user"
                    }
                ]
            },
            {
                model: CommentModel,
                attributes: ["id_user", "comment"],
                as: "comments",
                include: [
                    {
                        model: UserModel,
                        attributes: ["name"],
                        as: "user"
                    }
                ]
            }
        ]
    })

    if (!photoFind) {
        return res.status(404).send({
            message: "Error Photo not found"
        })
    }

    return res.status(200).send({
        message: "Photo found",
        data: photoFind
    })
}

module.exports = { photoPreview }