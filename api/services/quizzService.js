const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
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

exports.createQuestion = async (quizzData) => {
    const result = await sequelize.transaction(async (t) => {
        const question = await Question.create({ question: quizzData.question }, { transaction: t });
  
        const answers = quizzData.answers.map(answer => ({ ...answer, question_id: question.id }));
      await Answer.bulkCreate(answers, { transaction: t });
  
      return {"question": question, "answers": answers};
    });
  
    return result;
};

exports.updateQuestion = async (id, questionData) => {
  return await Question.update(questionData, { where: { id: id } });
};

exports.deleteQuestion = async (id) => {
  return await Question.destroy({ where: { id: id } });
};