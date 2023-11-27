const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const registerValidation = require("../validations/register")
const { body, checkSchema } = require("express-validator");

router.post('/register', checkSchema(registerValidation), auth.register);
router.post('/login', auth.login);

module.exports = router;