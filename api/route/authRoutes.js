const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

// Exemple de route protégée
router.get('/protected', authMiddleware.authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;