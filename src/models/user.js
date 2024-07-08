// models/user.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
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

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    biography: DataTypes.TEXT,
    title: DataTypes.STRING,
    profile_picture: { // Added this field
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
