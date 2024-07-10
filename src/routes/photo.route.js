const express = require("express")

const router = express.Router()

const { photoPreview } = require("../controllers/photo_preview.controller")
const { uploadPhoto, editPhoto, deletePhoto } = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage });

router.get("/:photoID", photoPreview);
router.post('', upload.single("image"), verifyToken, uploadPhoto);
router.post('/:photoId', upload.single("image"), verifyToken, editPhoto);
router.delete('/:photoId', verifyToken, deletePhoto);

module.exports = router
