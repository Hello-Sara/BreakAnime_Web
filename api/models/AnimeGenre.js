const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnimeGenre = sequelize.define('anime_genre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  anime_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'anime', // nom de la table 'anime' dans votre base de données
      key: 'id'
    }
  },
  genre_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'genre', // nom de la table 'genre' dans votre base de données
      key: 'id'
    }
  }
}, {
  tableName: 'anime_genre',
  timestamps: false,
});

module.exports = AnimeGenre;