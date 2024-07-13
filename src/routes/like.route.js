const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { getLikesByPhotoID, addLikeByPhotoID, removeLikeByPhotoID, checkLikeByPhotoIDAndToken } = require("../controllers/like.controller")

router.get("/photo/:photoID", getLikesByPhotoID)
router.get("/photo/:photoID/usercheck", verifyToken, checkLikeByPhotoIDAndToken)
router.post("/photo/:photoID", verifyToken, addLikeByPhotoID)
router.delete("/photo/:photoID", verifyToken, removeLikeByPhotoID)

module.exports = router;
