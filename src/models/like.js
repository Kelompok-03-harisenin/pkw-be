'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      Like.belongsTo(models.Photo, {
        foreignKey: 'id_photo',
        as: 'photo'
      });
    }
  }
  Like.init(
    {
      id_photo: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
