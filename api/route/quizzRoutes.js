const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizzController');

// Routes pour les questions
router.get('/mcq', quizzController.getAllQuestionsWithAnswers);
router.get('/mcq/:id', quizzController.getQuestionWithAnswers);

router.post('/mcq', quizzController.createQuestion);
router.post('/mcq/:id/answers', quizzController.createAnswerForQuestion);

router.put('/mcq/:id', quizzController.updateQuestion);
router.put('/mcq/:id/answers', quizzController.updateAnswer);

router.delete('/mcq/:id', quizzController.deleteQuestion);
router.delete('/mcq/:id/answers', quizzController.deleteAnswer);


module.exports = router;