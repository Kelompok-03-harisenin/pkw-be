const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storege:storage})

module.exports = upload