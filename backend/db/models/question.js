'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, {
        foreignKey: "userId"
      });

    }
  }
  Question.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300],
      }
    },
    answer: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 600],
      }
    },
    keyWords: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 200],
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
