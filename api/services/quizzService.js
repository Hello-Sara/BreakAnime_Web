const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const Genre = require('../models/genreModel');
const AnswerGenre = require('../models/answerGenreModel');
const sequelize = require('../config/database');

class QuizzService {
  async getAllQuestionsWithAnswers() {
    return await Question.findAll({
      include: [{ model: Answer, as: 'answers'}]
    });
  }

  async getQuestionWithAnswers(id) {
    return await Question.findByPk(id, {
      include: [{model: Answer, as: 'answers'}]
    });
  }

  async getGenresForAnswer(answerId) {
    const answer = await Answer.findByPk(answerId, {
      include: [{
        model: Genre,
        as: 'genres',
        through: { attributes: ['is_reversed'] },
      }],
    });
    return answer;
  }

  async createQuestion(quizzData) {
    const result = await sequelize.transaction(async (t) => {
        const question = await Question.create({ question: quizzData.question }, { transaction: t });
        const answers = quizzData.answers.map(answer => ({ ...answer, question_id: question.id }));
      await Answer.bulkCreate(answers, { transaction: t });
      return {"question": question, "answers": answers};
    });
    return result;
  }

  async createAnswerForQuestion(questionId, answerData) {
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw new Error('Question non trouvée');
    }
    return await Answer.create({ ...answerData, question_id: questionId });
  }

  async addGenresToAnswer(answerId, genreNames, is_reversed ) {
    const answer = await Answer.findByPk(answerId);
    if (!answer) {
      const error = new Error('Réponse non trouvé');
      error.name = 'NOT_FOUND';
      throw error;
    }

    let genres = [];

    for (let genreName of genreNames) {
      const genre = await Genre.findOne({
        where: { name: genreName }
      });
      if (genre == null) {
        const error = new Error('le genre ' + genreName + ' n\'existe pas');
        error.name = 'BAD_REQUEST';
        throw error;
      } else {
        genres.push(genre);
      }
    }

    for (let genre of genres) {
      let existingAssociation = await AnswerGenre.findOne({ where: { genre_id: genre.id, answer_id: answerId } });
      console.log(existingAssociation);
      if(existingAssociation == null){
        await AnswerGenre.create({ genre_id: genre.id, answer_id: answerId, is_reversed });
      } else {
        console.log("Association already exists");
      }
      
    }
    return answer;
  }


  async updateQuestion(id, questionData) {
    const question = await Question.findByPk(id);
    if (!question) {
      return null;
    }
    await question.update(questionData);
    return question;
  }

  async updateAnswer(id, answerData) {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return null;
    }
    await answer.update(answerData);
    return answer;
  }

  async deleteQuestion(id) {
    return await Question.destroy({ where: { id: id } });
  }
};

module.exports = QuizzService;