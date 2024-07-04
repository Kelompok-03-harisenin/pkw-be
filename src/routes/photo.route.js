const express = require("express")

const router = express.Router()

const {photoPreview} = require("../controllers/photo_preview.controller")

router.get("/preview/:photoID", photoPreview)

module.exports = router