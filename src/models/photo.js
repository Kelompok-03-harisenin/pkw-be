'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      Photo.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      Photo.hasMany(models.Comment, {
        foreignKey: 'id_photo',
        as: 'comments'
      });
      Photo.hasMany(models.Like, {
        foreignKey: 'id_photo',
        as: 'likes'
      });
    }
  }
  Photo.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );
  return Photo;
};
