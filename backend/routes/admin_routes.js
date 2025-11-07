const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const header = require('../utilities/header');
const token= require('../utilities/token');
const validator= require('../utilities/validation/validator');

router.post('/register', header.checkHeader,adminController.register);
router.post('/login',  header.checkHeader, adminController.login);

//New API for admin list
router.get('/list', header.checkHeader, adminController.getAllAdmins);

// Get admin by ID
router.get('/get/:id', header.checkHeader, adminController.getAdminById);

// Update admin
router.put('/update/:id', header.checkHeader, adminController.updateAdmin);

// Delete admin
router.delete('/delete/:id', header.checkHeader, adminController.deleteAdmin);

module.exports = router;