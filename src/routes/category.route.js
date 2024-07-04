const express = require('express');
const router = express.Router();
const { index, show } = require('../controllers/category.controller');

router.get('/categories', index);
router.get('/categories/:id', show);

module.exports = router;
