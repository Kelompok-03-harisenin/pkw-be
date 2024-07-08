const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { getLikesByPhotoID, addLikeByPhotoID, removeLikeByPhotoID } = require("../controllers/like.controller")

router.get("/photo/:photoID", getLikesByPhotoID)
router.post("/photo/:photoID", verifyToken, addLikeByPhotoID)
router.delete("/photo/:photoID", verifyToken, removeLikeByPhotoID)

module.exports = router;
