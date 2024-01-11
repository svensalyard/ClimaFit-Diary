const User = require('./User');
const CalorieData = require('./caloriedata');

User.hasMany(CalorieData, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
CalorieData.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = { User, CalorieData };

