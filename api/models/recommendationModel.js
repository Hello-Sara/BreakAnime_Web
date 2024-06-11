const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recommendation = sequelize.define('recommendation', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id:    { type: DataTypes.INTEGER, references: { model: 'user', key: 'id' } }, 
  anime_id: {type: DataTypes.INTEGER, references: {model: 'anime', key: 'id'}},
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 
}, 
{
  tableName: 'recommendation',
  timestamps: false, 
});

module.exports = Recommendation;