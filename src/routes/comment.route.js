const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { getCommentsByPhoto, addCommentsToPhoto, removeCommentByID } = require("../controllers/comment.controller");

router.get("/photo/:photoID", getCommentsByPhoto);
router.post("/photo/:photoID", verifyToken, addCommentsToPhoto);
router.delete("/:commentID", verifyToken, removeCommentByID);

module.exports = router;
