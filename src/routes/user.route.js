const express = require('express');
const router = express.Router();
const { getUserById, updateUserByID, getUserByToken } = require('../controllers/user.controller');
const { verifyToken } = require("../middlewares/auth");
const { cloudinaryUpload } = require('../middlewares/cloudinaryUpload')

const upload = require('../storage/multer-config')

router.get('/token', verifyToken, getUserByToken)
router.get('/:id', getUserById);
router.patch('/:id', verifyToken, upload.single("image"), cloudinaryUpload , updateUserByID)



module.exports = router;
