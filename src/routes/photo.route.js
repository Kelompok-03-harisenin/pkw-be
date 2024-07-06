const express = require("express")
const {editPhoto, deletePhoto} = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");
const router = express.Router()

const {photoPreview} = require("../controllers/photo_preview.controller")

router.get("/preview/:photoID", photoPreview);
router.post('/:photoId', verifyToken, editPhoto);
router.delete('/:photoId', verifyToken, deletePhoto);

module.exports = router;