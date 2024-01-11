const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class WorkoutData extends Model {}

WorkoutData.init(
    {
      date: { type: DataTypes.DATE, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      userId: { 
        type: DataTypes.INTEGER,
        references: { model: 'user', key: 'id' },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'workoutdata', 
    }
  );

module.exports = WorkoutData;
