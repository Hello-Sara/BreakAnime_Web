const express = require('express');
const adminStatsController = require('../controllers/adminStatsController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 

const router = express.Router();

router.get('/admin/stats', authenticateToken, isAdmin, adminStatsController.getAdminStats);

module.exports = router;