'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Journal.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Journal.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projects: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 200],
      }
    },
    today: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 800],
      }
    },
    challenges: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 800],
      }
    },
    overcome: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 800],
      }
    },
    accomplish: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 800],
      }
    },
    goals : {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 800],
      }
    }
  }, {
    sequelize,
    modelName: 'Journal',
  });
  return Journal;
};
