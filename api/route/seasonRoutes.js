const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 

router.get('/seasons', seasonController.getAllSeasons);
router.get('/seasons/:id', seasonController.getSeasonById);
router.post('/seasons', authenticateToken, isAdmin, seasonController.createSeason);
router.put('/seasons/:id', authenticateToken, isAdmin, seasonController.updateSeason);
router.delete('/seasons/:id', authenticateToken, isAdmin, seasonController.deleteSeason);

module.exports = router;