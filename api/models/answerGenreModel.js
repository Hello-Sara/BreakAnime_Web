const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnswerGenre = sequelize.define('answer_genre', {
  id:           {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  answer_id:    {type: DataTypes.INTEGER, references: {model: 'answer', key: 'id'}},
  genre_id:     {type: DataTypes.INTEGER, references: {model: 'genre', key: 'id'}}
}, 
{
  tableName: 'answer_genre',
  timestamps: false,
});

module.exports = AnswerGenre;