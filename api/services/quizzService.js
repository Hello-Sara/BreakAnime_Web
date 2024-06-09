const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const Genre = require('../models/genreModel');
const AnswerGenre = require('../models/answerGenreModel');
const sequelize = require('../config/database');

exports.getAllQuestionsWithAnswers = async () => {
  return await Question.findAll({
    include: [{ model: Answer, as: 'answers'}]
  });
};

exports.getQuestionWithAnswers = async (id) => {
  return await Question.findByPk(id, {
    include: [{model: Answer, as: 'answers'}]
  });
};

exports.getGenresForAnswer = async (answerId) => {
  const answer = await Answer.findByPk(answerId, {
    include: [{
      model: Genre,
      as: 'genres',
      through: { attributes: ['is_reversed'] },
    }],
  });

  return answer;
};

exports.createQuestion = async (quizzData) => {
    const result = await sequelize.transaction(async (t) => {
        const question = await Question.create({ question: quizzData.question }, { transaction: t });
  
        const answers = quizzData.answers.map(answer => ({ ...answer, question_id: question.id }));
      await Answer.bulkCreate(answers, { transaction: t });
  
      return {"question": question, "answers": answers};
    });
  
    return result;
};

exports.createAnswerForQuestion = async (questionId, answerData) => {
  const question = await Question.findByPk(questionId);
  if (!question) {
    throw new Error('Question non trouvée');
  }
  return await Answer.create({ ...answerData, question_id: questionId });
};

exports.addGenresToAnswer = async (answerId, genreNames, is_reversed ) => {
  const answer = await Answer.findByPk(answerId);
  if (!answer) {
    const error = new Error('Réponse non trouvé');
    error.name = 'NOT_FOUND';
    throw error;
  }

  const genres = await Genre.findAll({
    where: { name: genreNames }
  });

  if (genres.length !== genreNames.length) {
    const error = new Error('Un ou plusieurs genres non trouvés');
    error.name = 'NOT_FOUND';
    throw error;
  }

  for (let genre of genres) {
    let existingAssociation = AnswerGenre.findAll({ where: { genre_id: genre.id, answer_id: answerId } });
    if(existingAssociation == null){
      await AnswerGenre.create({ genre_id: genre.id, answer_id: answerId, is_reversed });
    } else {
      console.log("Association already exists");
    }
    
  }
  return answer;
}


exports.updateQuestion = async (id, questionData) => {
  const question = await Question.findByPk(id);
  if (!question) {
    return null;
  }
  await question.update(questionData);
  return question;
};

exports.updateAnswer = async (id, answerData) => {
  const answer = await Answer.findByPk(id);
  if (!answer) {
    return null;
  }
  await answer.update(answerData);
  return answer;
};

exports.deleteQuestion = async (id) => {
  return await Question.destroy({ where: { id: id } });
};