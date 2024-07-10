const express = require('express');
const router = express.Router();
const { getUserById, updateUserByID } = require('../controllers/user.controller');
const { verifyToken } = require("../middlewares/auth");
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage });

router.get('/:id', getUserById);
router.patch('/:id', upload.single("image"), verifyToken, updateUserByID)


module.exports = router;
