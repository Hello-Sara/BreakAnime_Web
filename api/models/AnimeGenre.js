const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnimeGenre = sequelize.define('anime_genre', {
  id:       {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  anime_id: {type: DataTypes.INTEGER, references: {model: 'anime', key: 'id'}},
  genre_id: {type: DataTypes.INTEGER, references: {model: 'genre', key: 'id'}}
}, 
{
  tableName: 'anime_genre',
  timestamps: false,
});

module.exports = AnimeGenre;