const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/admin/login', authController.adminLogin);
router.get('/verifyToken', authController.verifyToken);

module.exports = router;