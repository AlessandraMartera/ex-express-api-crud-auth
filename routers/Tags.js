const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');

router.get('/', tagsController.index);
router.post('/', tagsController.store);

module.exports = router;