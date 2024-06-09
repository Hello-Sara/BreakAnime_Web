const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answer = sequelize.define('answer', {
  id:           {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  question_id:  {type: DataTypes.INTEGER, references: {model: 'question', key: 'id'}},
  answer:       {type: DataTypes.STRING, allowNull: false}
}, 
{
  tableName: 'answer',
  timestamps: false,
});

Answer.associate = function(models) {
    Answer.belongsToMany(models.Genre, {
        through: 'answer_genre',
        foreignKey: 'answer_id',
        otherKey: 'genre_id'
    });

    Answer.belongsTo(models.Question, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE'
    });
}

module.exports = Answer;