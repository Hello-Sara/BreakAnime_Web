const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anime = sequelize.define('anime', {
  season_id:    {type: DataTypes.INTEGER, references: {model: 'anime_season', key: 'id', deferrable: true}},
  titre:        {type: DataTypes.STRING, allowNull: false},
  description:  {type: DataTypes.TEXT, allowNull: true},
  picture:      {type: DataTypes.STRING, allowNull: true},
  thumbnail:    {type: DataTypes.STRING, allowNull: true},
  status:       {type: DataTypes.INTEGER, allowNull: false},
  type:         {type: DataTypes.INTEGER, allowNull: false},
  episodes:     {type: DataTypes.INTEGER, allowNull: true}
},
{ 
  tableName: 'anime',
  timestamps: false, 
}
);

Anime.associate = function(models) {
  Anime.hasMany(models.Synonyms, {
    foreignKey: 'anime_id',
    as: 'synonyms'
  });

  
  Anime.hasMany(models.Recommendation, { foreignKey: 'anime_id' });
  Anime.belongsToMany(models.Genre, {
    through: 'anime_genre',
    foreignKey: 'anime_id',
    otherKey: 'genre_id'
  });

  Anime.belongsTo(models.Season, { as: 'animeSeason' , foreignKey: 'season_id'});
}

module.exports = Anime;