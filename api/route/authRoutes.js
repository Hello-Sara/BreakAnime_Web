const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/admin/login', authController.adminLogin);
router.get('/verifyToken', authController.verifyToken);

module.exports = router;