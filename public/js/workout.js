const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init(
  {
    // Define schema
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    // ... other fields
  },
  {
    sequelize,
    // ... other options
  }
);

module.exports = Workout;
