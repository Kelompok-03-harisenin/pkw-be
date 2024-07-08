const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { getCommentsByPhoto, addCommentsToPhoto, removeCommentByID, editCommentByID } = require("../controllers/comment.controller");

router.get("/photo/:photoID", getCommentsByPhoto);
router.post("/photo/:photoID", verifyToken, addCommentsToPhoto);
router.delete("/:commentID", verifyToken, removeCommentByID);
router.patch("/:commentID", verifyToken, editCommentByID);

module.exports = router;
