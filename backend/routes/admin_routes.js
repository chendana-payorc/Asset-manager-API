const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const header = require('../utilities/header');
const token= require('../utilities/token');
const validator= require('../utilities/validation/validator');

router.post('/register', header.checkHeader,adminController.register);
router.post('/login',  header.checkHeader, adminController.login);

module.exports = router;