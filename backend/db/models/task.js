'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Task.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 200],
      }
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
