const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Season = sequelize.define('anime_season', {
    season: {type: DataTypes.INTEGER, allowNull: true},
    year:   {type: DataTypes.INTEGER,allowNull: false}
},
{ 
    tableName: 'anime_season',
    timestamps: false, 
}
);

Season.associate = function(models) {
    Season.hasMany(models.Anime, { as: 'animes', foreignKey: 'season_id'});
}

module.exports = Season;