const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/recommendation/:id', recommendationController.postAnimesRecommendation);

module.exports = router;