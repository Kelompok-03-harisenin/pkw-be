const express = require("express")

const router = express.Router()

const { photoPreview } = require("../controllers/photo_preview.controller")
const { photoGetLikes, photoGetComments, photoAddComments } = require("../controllers/photo_comment_like.controller");
const { editPhoto, deletePhoto } = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");

router.get("/:photoID", photoPreview);
router.post('/:photoId', verifyToken, editPhoto);
router.delete('/:photoId', verifyToken, deletePhoto);
router.post('/:photoID/comments', verifyToken, photoAddComments);
router.get('/:photoID/comments', photoGetComments);
router.get('/:photoID/likes', photoGetLikes);

module.exports = router
