const User = require('./User');
const CalorieData = require('./caloriedata');
const WorkoutData = require('./workoutdata'); 

User.hasMany(CalorieData, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
CalorieData.belongsTo(User, {
    foreignKey: 'userId'
});


User.hasMany(WorkoutData, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
WorkoutData.belongsTo(User, { 
    foreignKey: 'userId'
});

module.exports = { User, CalorieData, WorkoutData }; 


