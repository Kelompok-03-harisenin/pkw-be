const express = require('express');
const {editPhoto, deletePhoto} = require('../controllers/photo_controllers');
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

// Route to edit a photo
router.post('/photo/:photoId', verifyToken, editPhoto);
router.delete('/photo/:photoId', verifyToken, deletePhoto);

module.exports = router;
