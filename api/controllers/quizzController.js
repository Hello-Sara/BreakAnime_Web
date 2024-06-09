// quizzController.js
const Answer = require('../models/answerModel');
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

exports.createQuestion = async (req, res) => {
  try {
    const question = await quizzService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la question', error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await quizzService.updateQuestion(req.params.id, req.body);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la question', error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await quizzService.deleteQuestion(req.params.id);
    res.status(200).json({ message: 'Question supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la question', error: error.message });
  }
};