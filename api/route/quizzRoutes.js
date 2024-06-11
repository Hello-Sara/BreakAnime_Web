const express = require('express');
const router = express.Router();
const quizzController = require('../controllers/quizzController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 


router.get('/mcq', quizzController.getAllQuestionsWithAnswers);
router.get('/mcq/:id', quizzController.getQuestionWithAnswers);
router.get('/mcq/:id/genres', quizzController.getGenresForAnswer);

router.post('/mcq', authenticateToken, isAdmin, quizzController.createQuestion);
router.post('/mcq/:id/answers', authenticateToken, isAdmin, quizzController.createAnswerForQuestion);

router.post('/answer/addGenres', authenticateToken, isAdmin, quizzController.addGenresToAnswer);

router.put('/mcq/:id', authenticateToken, isAdmin, quizzController.updateQuestion);
router.put('/mcq/:id/answers', authenticateToken, isAdmin, quizzController.updateAnswer);

router.delete('/mcq/:id', authenticateToken, isAdmin, quizzController.deleteQuestion);
router.delete('/mcq/:id/answers', authenticateToken, isAdmin, quizzController.deleteAnswer);


module.exports = router;