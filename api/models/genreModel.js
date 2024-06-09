const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('genre', {
    id:            {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:          {type: DataTypes.STRING, allowNull: false, unique: true},
    description:   {type: DataTypes.TEXT, allowNull: true}
},
{ 
    tableName: 'genre',
    timestamps: false, 
}
);

Genre.associate = function(models) {
    Genre.belongsToMany(models.Anime, {
      through: 'anime_genre',
      foreignKey: 'genre_id',
      otherKey: 'anime_id'
    });
};

module.exports = Genre;