const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('question', {
  id:       {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  question: {type: DataTypes.STRING, allowNull: false}
}, 
{
  tableName: 'question',
  timestamps: false,
});

Question.associate = function(models) {
    Question.hasMany(models.Answer, {foreignKey: 'question_id', as: 'answers'});
}

module.exports = Question;