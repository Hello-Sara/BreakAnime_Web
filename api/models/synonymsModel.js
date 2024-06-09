const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Synonyms = sequelize.define('synonyms', {
  anime_id:     {type: DataTypes.INTEGER, references: {model: 'anime', key: 'id', deferrable: true}},
  name:         {type: DataTypes.STRING, allowNull: false}
},
{ 
  tableName: 'synonyms',
  timestamps: false, 
}
);

Synonyms.associate = function(models) {
    Synonyms.belongsTo(models.Anime, {
      foreignKey: 'anime_id',
      as: 'anime'
    });
  };


module.exports = Synonyms;