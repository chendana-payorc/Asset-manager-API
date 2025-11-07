const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const header = require('../utilities/header');
const token = require('../utilities/token');

router.post('/create', header.checkHeader, token.verifyToken, departmentController.create);

router.get('/list', header.checkHeader, token.verifyToken, departmentController.getAll);

router.get('/get/:id', header.checkHeader, token.verifyToken, departmentController.getById);

router.put('/update/:id', header.checkHeader, token.verifyToken, departmentController.update);

router.delete('/delete/:id', header.checkHeader, token.verifyToken, departmentController.remove);

module.exports = router;
