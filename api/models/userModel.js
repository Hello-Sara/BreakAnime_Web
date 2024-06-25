const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  name:     { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role:     { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, 
{ 
  tableName: 'user',
  timestamps: false, 
}
);


User.associate = function(models) {
  User.hasMany(models.Recommendation, { foreignKey: 'user_id' });
} 

module.exports = User;
 


