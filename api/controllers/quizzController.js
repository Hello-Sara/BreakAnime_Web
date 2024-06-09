// quizzController.js
const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const quizzService = require('../services/quizzService');

exports.getAllQuestionsWithAnswers = async (req, res) => {
  try {
    const questionsWithAnswers = await quizzService.getAllQuestionsWithAnswers();
    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questions et des réponses', error: error.message });
  }
};

exports.getQuestionWithAnswers = async (req, res) => {
  try {
    const questionWithAnswers = await quizzService.getQuestionWithAnswers(req.params.id);
    if (!questionWithAnswers) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.status(200).json(questionWithAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la question et des réponses', error: error.message });
  }
};

exports.getGenresForAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answerWithGenres = await quizzService.getGenresForAnswer(answerId);
    if (!answerWithGenres) {
      return res.status(404).json({ message: 'Réponse non trouvée' });
    }
    res.status(200).json(answerWithGenres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des genres', error: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = await quizzService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la question', error: error.message });
  }
};

exports.createAnswerForQuestion = async (req, res) => {
  try {
    const newAnswer = await quizzService.createAnswerForQuestion(req.params.id, req.body);
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réponse', error: error.message });
  }
};

exports.addGenresToAnswer = async (req, res) => {
  try {
    const { answerId, genreNames, is_reversed } = req.body;
    await quizzService.addGenresToAnswer(answerId, genreNames, is_reversed);
    res.status(200).json({ message: 'Genres ajoutés avec succès à la question' });
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout des genres à la réponse', error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await quizzService.updateQuestion(req.params.id, req.body);
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la question', error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const updatedAnswer = await quizzService.updateAnswer(req.params.id, req.body);
    if (!updatedAnswer) {
      return res.status(404).json({ message: 'Réponse non trouvée' });
    }
    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la réponse', error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    await question.destroy();
    res.status(200).json({ message: 'Question supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la question', error: error.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Réponse non trouvée' });
    }
    await answer.destroy();
    res.status(200).json({ message: 'Réponse supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réponse', error: error.message });
  }
};