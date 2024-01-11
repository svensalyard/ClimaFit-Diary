const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CalorieData extends Model {}

CalorieData.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'caloriedata',
    timestamps: true, 
});

module.exports = CalorieData;
