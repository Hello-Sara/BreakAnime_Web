const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/recommendation/:id', recommendationController.postAnimesRecommendation);
router.get('/recommendation/:id', recommendationController.getRecommendationsByUserId);

module.exports = router;