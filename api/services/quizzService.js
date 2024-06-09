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

exports.createAnswerForQuestion = async (questionId, answerData) => {
  console.log(questionId);
  const question = await Question.findByPk(questionId);
  if (!question) {
    throw new Error('Question non trouvée');
  }
  return await Answer.create({ ...answerData, question_id: questionId });
};

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