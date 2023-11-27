const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.index);

router.post('/', categoriesController.store);

module.exports = router;