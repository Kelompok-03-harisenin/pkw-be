const express = require("express")

const router = express.Router()

const {photoPreview} = require("../controllers/photo_preview.controller")
const { photoLike, photoComment } = require("../controllers/photo_comment_like.controller")
const {editPhoto, deletePhoto} = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");

router.get("/:photoID", photoPreview)
router.post('/:photoId', verifyToken, editPhoto);
router.delete('/:photoId', verifyToken, deletePhoto);
router.get('/:photoID/comments', photoComment );
router.get('/:photoID/likes', photoLike )

module.exports = router