'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resource.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  }
  Resource.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
        len: [2, 600]
      }
    },
    keyWords: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 200],
      }
    }
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};
