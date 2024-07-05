const express = require('express');
const router = express.Router();
const { index, show, search } = require('../controllers/category.controller');

router.get('/', index);
router.get('/:id', show);
router.get('/search', search); // pencarian kategori

module.exports = router;
