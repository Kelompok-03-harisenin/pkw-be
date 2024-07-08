const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { getLikesByID } = require("../controllers/like.controller")

router.get("/photo/:photoID", getLikesByID)

module.exports = router;
