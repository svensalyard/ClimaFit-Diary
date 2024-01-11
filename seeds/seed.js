const sequelize = require('../config/connection');
const { User } = require('../models');

const newUserData = require('./user.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
  });
  process.exit(0);
};

seedDatabase();
