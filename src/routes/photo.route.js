const express = require("express")

const router = express.Router()

const { photoPreview } = require("../controllers/photo_preview.controller")
const { uploadPhoto, editPhoto, deletePhoto } = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");
const { cloudinaryUpload } = require('../middlewares/cloudinaryUpload')

const upload = require('../storage/multer-config')

router.get("/:photoID", photoPreview);
router.post('/', verifyToken, upload.single("image"), cloudinaryUpload, uploadPhoto);
router.patch('/:photoId', verifyToken, upload.single("image"), cloudinaryUpload, editPhoto);
router.delete('/:photoId', verifyToken, deletePhoto);

module.exports = router
