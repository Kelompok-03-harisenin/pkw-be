const { Photo: PhotoModel, User: UserModel, Category: CategoryModel, Like: LikeModel, Comment: CommentModel } = require("../models")

const photoPreview = async (req, res, next) => {
  const photoID = req.params.photoID
  const photoIDNum = Number(photoID)
  console.log(req.user)

  const photoFind = await PhotoModel.findOne({
    where: { id: photoIDNum },
    attributes: ["id", "photo_url", "title", "description"],
    include: [
      {
        model: UserModel,
        attributes: ["id", "name", "profile_picture", "title"],
        as: "user"
      },
      {
        model: CategoryModel,
        attributes: ["id", "category_name"],
        as: "category"
      },
      {
        model: LikeModel,
        attributes: ["id", "id_user"],
        as: "likes"
      },
      {
        model: CommentModel,
        attributes: ["id", "id_user", "comment"],
        as: "comments",
        include: [
          {
            model: UserModel,
            attributes: ["name", "profile_picture", "title"],
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
    data: {
      id: photoFind.id,
      photo_url: photoFind.photo_url,
      title: photoFind.title,
      description: photoFind.description,
      userID: photoFind.user.id,
      userName: photoFind.user.name,
      userProfilePicture: photoFind.user.profile_picture,
      userTitle: photoFind.user.title,
      categoryID: photoFind.category.id,
      categoryName: photoFind.category.category_name,
      likesCount: photoFind.likes.length,
      likes: photoFind.likes,
      commentsCount: photoFind.comments.length,
      comments: photoFind.comments.map((comment) => ({
        id: comment.id,
        userID: comment.id_user,
        userName: comment.user.name,
        userProfilePicture: comment.user.profile_picture,
        userTitle: comment.user.title,
        comment: comment.comment,
      }))
    }
  })
}

module.exports = { photoPreview }
