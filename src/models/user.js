'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      User.hasMany(models.Photo, {
        foreignKey: 'id_user',
        as: 'photos'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'id_user',
        as: 'comments'
      });
      User.hasMany(models.Like, {
        foreignKey: 'id_user',
        as: 'likes'
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
