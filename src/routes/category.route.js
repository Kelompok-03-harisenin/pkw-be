const express = require('express');
const router = express.Router();
const { index, show, search } = require('../controllers/category.controller');

router.get('/categories', index);
router.get('/categories/:id', show);
router.get('/categories/search', search); // pencarian kategori

module.exports = router;
