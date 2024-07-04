const { Photo:PhotoModel, User:UserModel, Category:CategoryModel } = require("../models")

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
            }
        ]
    })
    return res.send(photoFind)
}

module.exports = { photoPreview }