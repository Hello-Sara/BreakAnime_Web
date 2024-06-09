const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recommendation = sequelize.define('recommendation', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  anime_id: {type: DataTypes.INTEGER, references: {model: 'anime', key: 'id'}},
  genre_id: {type: DataTypes.INTEGER, references: {model: 'genre', key: 'id'}}
}, 
{
  tableName: 'recommendation',
  timestamps: false,
});

module.exports = Recommendation;