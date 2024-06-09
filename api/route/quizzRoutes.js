const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizzController');

// Routes pour les questions
router.get('/mcq', quizzController.getAllQuestionsWithAnswers);
router.get('/mcq/:id', quizzController.getQuestionWithAnswers);
router.post('/mcq', quizzController.createQuestion);
// router.post('/mcq/:id/answers', quizzController.createAnswerForQuestion);
router.put('/mcq/:id', quizzController.updateQuestion);
router.delete('/mcq/:id', quizzController.deleteQuestion);


module.exports = router;